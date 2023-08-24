// @ts-ignore
import { groth16 } from "snarkjs";

// TODO: maybe use groth16.fullProve directly?
export async function generateProof(circuitInputs: any, filePathWASM: any, filePathZKEY: any) {
    const { proof, publicSignals } = await groth16.fullProve(
      circuitInputs,
      filePathWASM,
      filePathZKEY
    );
  
    return [proof, publicSignals];
}
