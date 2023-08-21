pragma circom 2.1.4;

include "./mimc.circom";
// include "https://github.com/0xPARC/circom-secp256k1/blob/master/circuits/bigint.circom";

template MiMCVDF (nrounds) {
    signal input a;
    signal input b;
    signal output c;

    component mimc[nrounds];

    for(var i = 0; i < nrounds; i++){
        mimc[i] = MiMC7(91);
    }

    mimc[0].x_in <== a;
    mimc[0].k <== b;

    for(var i = 1; i < nrounds; i++){
        mimc[i].x_in <== mimc[i-1].out;
        mimc[i].k <== b;
    }

    c <== mimc[nrounds-1].out;
}

component main { public [ a ] } = MiMCVDF(5000);