const anchor = require('@project-serum/anchor');
const {SystemProgram} = anchor.web3;
const {Program} = require('@project-serum/anchor');
const {PublicKey} = require('@solana/web3.js');
const idl=require("../target/idl/gm_chat.json");
// describe('gmchat', () => {
const main = async () => {
  // Configure the client to use the local cluster.
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);
 // const network = clusterApiUrl('devnet');

  // it('Is initialized!', async () => {
    // Add your test here.
    console.log(anchor.workspace);
    const programID = new PublicKey(idl.metadata.address);

    const program = new Program(idl, programID, provider);
    const baseAccount = anchor.web3.Keypair.generate();
    console.log("ping")
    console.log(program,programID,provider,baseAccount);
    const tx = await program.rpc.initialize("My first message", {
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [baseAccount]
    });
    console.log("📝 Your transaction signature", tx);
    let account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('Data: ', account.data);

    const tx2 = await program.rpc.update("gm2", {
      accounts: {
        baseAccount: baseAccount.publicKey,
      },
    });
    account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log("Updated data: ", account.data);
    console.log("All account data: ", account);
    console.log("All data: ", account.dataList);

//   });
// });
  }

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();