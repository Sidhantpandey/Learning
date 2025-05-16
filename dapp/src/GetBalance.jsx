import React from 'react'
import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

// To get balance 
function GetBalance() {
    // Request for get Balance
    const wallet = useWallet();
    const { connection } = useConnection();


    async function getBalances() {
        if (wallet.publicKey) {
            const balance = await connection.getBalance(wallet.publicKey);
            document.getElementById("balance").innerHTML = balance / LAMPORTS_PER_SOL;

        }

    }
    getBalances()
    return (
        <div>
            <p>SOL Balance:</p> <div id="balance"></div>
        </div>)
}

export default GetBalance