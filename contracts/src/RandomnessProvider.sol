// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import {IRandomnessProvider} from "./interface/IRandomnessProvider.sol";
import {IRANDAOStorage} from "./interface/IRANDAOStorage.sol";

contract RandomnessProvider is IRandomnessProvider {

    IVDFVerifier public vdfVerifier;
    IRANDAOStorage public randaoStorage;

    uint256 nIterations;

    mapping(uint256 => uint256) public blockNumToVDFRandomness;

    error RandomnessNotAvailable(uint256);
    error RequestedRandomnessFromPast(uint256);
    error RequestedZeroRandomValues();

    constructor(IRANDAOStorage _randaoStorage, IVDFVerifier _vdfVerifier, uint256 _nIterations) {
        verifierContract = _factRegistry;
        randaoProvider = _randaoProvider;
        nIterations = _nIterations;
    }

    function submitVDFRandomness(
        uint256 blockNumber,
        uint256 randao,
        uint256[PUBLIC_INPUT_SIZE] calldata proofPublicInput
    ) external {
        // Verify this is a valid ranDAO for this block number
        require(isValidRANDAO(blockNumber, randao), "Invalid randao for this block.");

        require(
            proofPublicInput[OFFSET_LOG_TRACE_LENGTH] < MAX_LOG_TRACE_LENGTH,
            "VDF reported length exceeds the integer overflow protection limit."
        );
        require(
            nIterations == 10 * 2 ** proofPublicInput[OFFSET_LOG_TRACE_LENGTH] - 1,
            "Public input and n_iterations are not compatible."
        );
        require(
            proofPublicInput[OFFSET_VDF_OUTPUT_X] < PRIME && proofPublicInput[OFFSET_VDF_OUTPUT_Y] < PRIME,
            "Invalid vdf output."
        );

        // To calculate the input of the VDF we first hash the RANDAO with the string "veedo",
        // then we split the last 250 bits to two 125 bit field elements.
        uint256 vdfInput = uint256(keccak256(abi.encodePacked(randao, "veedo")));
        require(
            vdfInput & ((1 << 125) - 1) == proofPublicInput[OFFSET_VDF_INPUT_X],
            "randao does not match the given proofPublicInput."
        );
        require(
            ((vdfInput >> 125) & ((1 << 125) - 1)) == proofPublicInput[OFFSET_VDF_INPUT_Y],
            "randao does not match the given proofPublicInput."
        );
        require(verifierContract.isValid(keccak256(abi.encodePacked(proofPublicInput))), "No valid proof provided.");
        // The randomness is the hash of the VDF output and the string "veedo"
        uint256 randomness = uint256(
            keccak256(
                abi.encodePacked(proofPublicInput[OFFSET_VDF_OUTPUT_X], proofPublicInput[OFFSET_VDF_OUTPUT_Y], "veedo")
            )
        );

        blockNumToVDFRandomness[blockNumber] = randomness;
        emit RandomnessFulfilled(blockNumber, randomness);
    }

    /// @notice Function to be called when a user requests randomness.
    /// A user requests randomness which commits them to a future block's VDF
    /// generated value.
    /// That future block's number is returned to the user which
    /// can be used to read the randomness value when it's posted by a prover.
    function requestRandomness() external returns (uint256) {
        // Batch randomness request to a future block based
        // on ROUNDING_CONSTANT.
        uint256 targetBlock = block.number;
        if (targetBlock % ROUNDING_CONSTANT != 0) {
            targetBlock += ROUNDING_CONSTANT - (targetBlock % ROUNDING_CONSTANT);
        }

        emit RandomnessRequested(msg.sender, targetBlock);
        return targetBlock;
    }

    /// @notice Function to be called when a user requests randomness.
    /// In this function, a user can specify the exact future block they want
    /// their randomness to come from. This emits an event that provers
    /// can listen to in order to fufill randomness.
    /// @param targetBlockNum The future block number the requestor
    /// is requesting randomness for.
    function requestRandomnessFromBlock(uint256 targetBlockNum) external {
        // Ensure user is requesting a future block.
        if (targetBlockNum <= block.number) {
            revert RequestedRandomnessFromPast(targetBlockNum);
        }

        emit RandomnessRequested(msg.sender, targetBlockNum);
    }

    /// @notice Fetch the VDF generated random value tied to a specific block
    /// with option to generate more random values using the initial RANDAO value
    /// as a seed.
    /// @param blockNum Block number to fetch randomness from.
    /// @param numberRandomValues Number of random values returned.
    function fetchRandomness(uint256 blockNum, uint256 numberRandomValues) public view returns (uint256[] memory) {
        uint256 randomness = blockNumToVDFRandomness[blockNum];

        // Ensure RANDAO value is proven AND user isn't trying to fetch
        // randomness from a current or future block.
        if (randomness == 0) {
            revert RandomnessNotAvailable(blockNum);
        }

        if (numberRandomValues == 0) {
            revert RequestedZeroRandomValues();
        }

        // Uses VDF randomness as the seed to generate more values.
        return generateMoreRandomValues(randomness, numberRandomValues);
    }

    /// @notice Checks if the given randao value is valid for the given block number.
    function isValidRANDAO(uint256 blockNumber, uint256 randao) internal view returns (bool) {
        // Verify this is a valid ranDAO for this block number
        return randaoStorage.getRANDAO(blockNum)[0] == randao;
    }
}
