import {createMint,getMinimumBalanceForRentExemptMint} from "@solana/spl-token"
import {Transaction,SystemProgram,} from  "@solana/web3.js" 
import {useWallet} from "@solana/wallet-adapter-react";

export function TokenLaunchpad() {
  async function TokenLaunchPad() {
    const lamports = await getMinimumBalanceForRentExemptMint(connection);
    const wallet = useWallet();
    const keypair = Keypair.generate();
    // You create a new mint account
    // First, create a keypair for this new mint account
    // Owners
    const transaction = new Transaction().add(
      SystemProgram.createAccount({
        fromPubkey: payer.publicKey,
        newAccountPubkey: keypair.publicKey,
        space: MINT_SIZE,
        lamports,
        programId, // who owns this account
      }),
      createInitializeMint2Instruction(
        keypair.publicKey, // mint account public key
        decimals, // number of decimal places
        mintAuthority, // authority allowed to mint tokens
        freezeAuthority, // optional: authority that can freeze token accounts
        programId // token program ID (usually TOKEN_PROGRAM_ID)
      )
    );
    transaction.partialSign(keypair);
    await wallet.signTransaction(transaction);
  }

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>Solana Token Launchpad</h1>
      <input className="inputText" type="text" placeholder="Name"></input>{" "}
      <br />
      <input
        className="inputText"
        type="text"
        placeholder="Symbol"
      ></input>{" "}
      <br />
      <input
        className="inputText"
        type="text"
        placeholder="Image URL"
      ></input>{" "}
      <br />
      <input
        className="inputText"
        type="text"
        placeholder="Initial Supply"
      ></input>{" "}
      <br />
      <button onClick={TokenLaunchPad} className="btn">
        Create a token
      </button>
    </div>
  );
}
