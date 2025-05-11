import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";

export default function SolanaWallet({ mnemonic }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [publicKeys, setPublicKeys] = useState([]);

  const addWallet = async () => {
    if (!mnemonic) {
      alert("Please provide a valid mnemonic.");
      return;
    }

    try {
      const seed = await mnemonicToSeed(mnemonic); // must await
      const path = `m/44'/501'/${currentIndex}'/0'`;
      const derivedSeed = derivePath(path, seed.toString("hex")).key;
      const secretKey = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
      const keypair = Keypair.fromSecretKey(secretKey);

      setPublicKeys((prev) => [...prev, keypair.publicKey.toBase58()]);
      setCurrentIndex((prev) => prev + 1);
    } catch (error) {
      console.error("Error generating wallet:", error);
    }
  };

  return (
    <div>
      <button onClick={addWallet}>Add Wallet</button>
      {publicKeys.map((pubKey, index) => (
        <div key={index}>{pubKey}</div>
      ))}
    </div>
  );
}
