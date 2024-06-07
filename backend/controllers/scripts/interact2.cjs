require('dotenv').config();
const { ethers } = require('ethers');


const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS ='0x6aDEEcFBf408e31210b725EA8Cd8B730e143686c';


const contract = require("../artifacts/contracts/Log.sol/DataStorage.json");


const provider = new ethers.providers.JsonRpcProvider(API_URL);


const signer = new ethers.Wallet(PRIVATE_KEY, provider);


const dataStorageContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);

async function main(str) {
  const result = {
    transactionDetails: {},
    decodedInput: null,
    storedString: null,
    error: null
  };
  try {

    console.log("Setting the string value...");
    const setTx = await dataStorageContract.setString(str);


    const txReceipt = await setTx.wait();

    result.transactionDetails = {
      transactionHash: txReceipt.transactionHash,
      blockNumber: txReceipt.blockNumber,
      from: txReceipt.from,
      to: txReceipt.to,
      gasUsed: txReceipt.gasUsed.toString()
    };

    console.log("Transaction details:");
    console.log("Transaction hash:", txReceipt.transactionHash);
    console.log("Block number:", txReceipt.blockNumber);
    console.log("from:", txReceipt.from);
    console.log("to:", txReceipt.to);
    console.log("Gas used:", txReceipt.gasUsed.toString());


    const tx = await provider.getTransaction(txReceipt.transactionHash);


    const decodedInput = dataStorageContract.interface.decodeFunctionData("setString", tx.data);

    console.log("Input value:", decodedInput);
    console.log("String value set successfully.");


    console.log("Retrieving the stored string value...");
    result.storedString = await dataStorageContract.getString();
    console.log("The stored string is: " + result.storedString);

  } catch (error) {
    console.error("An error occurred:", error);
  }
  return result;
}

module.exports = main;