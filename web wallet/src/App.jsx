import { useState } from "react";
import { generateMnemonic } from "bip39";
import SolanaWallet from "./components/SolanaWallet.jsx";

function App() {
  const [mnemonics, setMnemonics] = useState("");

  async function generateMnemonicPhrase() {
    const mnemonic = await generateMnemonic();
    setMnemonics(mnemonic);
  }

  return (
    <>
      <div>
        <h1>Welcome to my Web Based Wallet</h1>
        <button onClick={generateMnemonicPhrase}>Create a Seed Phrase</button>
        <input type="text" value={mnemonics} readOnly />
        <SolanaWallet mnemonic={mnemonics} />
      </div>
    </>
  );
}

export default App;
