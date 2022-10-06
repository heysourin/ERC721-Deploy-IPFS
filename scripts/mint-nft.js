require("dotenv").config({ path: ".env" });
const NODE_HTTP_URL = process.env.NODE_HTTP_URL;

const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(NODE_HTTP_URL);

// import MyNFT from './MyNFT.json'
const contract = require("./MyNFT.json");

console.log(JSON.stringify(contract.abi));

const contractAddress = "0xfED18D32F3b437469Ca0bC2C543611e1C13587Cd";

//? Creating an instance using abi and deployed address
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

//? Creating transaction
async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest");

  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 5000000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  };
  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            );
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            );
          }
        }
      );
    })
    .catch((err) => {
      console.log(" Promise failed:", err);
    });
}

mintNFT(
    "https://gateway.pinata.cloud/ipfs/QmQCCCfgg2aXgTpAUYoTnoeR5fR2oM4HMXMWu1JDamD92b"
  );

  //0xc5ab9a1ffb520dde4d7e3574c7e791591af88fbd5079912d93d52a778b93bed4