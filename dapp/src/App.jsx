import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import React, { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";
import Airdrop from "./Airdrop.jsx"
import GetBalance from './GetBalance.jsx';
import { SendTokens } from './SendSol.jsx';
import { SignMessage } from './SignMessage.jsx';

function App() {
  const network = WalletAdapterNetwork.Devnet;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    
  return (
    <>
  <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <WalletMultiButton />
            <WalletDisconnectButton />
            <Airdrop/>
          </div>
            <GetBalance/>
            <SendTokens/>
            <SignMessage/>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>    </>
  )
}

export default App
