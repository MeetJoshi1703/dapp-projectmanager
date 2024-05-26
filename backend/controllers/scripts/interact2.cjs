require('dotenv').config();
const { ethers } = require('ethers');

// Load environment variables
const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS ='0x6aDEEcFBf408e31210b725EA8Cd8B730e143686c';

// Load the contract ABI
const contract = require("../artifacts/contracts/Log.sol/DataStorage.json");

// Create a provider connected to the specified network
const provider = new ethers.providers.JsonRpcProvider(API_URL);

// Create a signer instance using the private key and the provider
const signer = new ethers.Wallet(PRIVATE_KEY, provider);

// Create a contract instance
const dataStorageContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);

async function main(str) {
  try {
    // Set the string value in the smart contract
    console.log("Setting the string value...");
    const setTx = await dataStorageContract.setString(str);

    // Wait for the transaction to be mined and get the transaction receipt
    const txReceipt = await setTx.wait();

    console.log("Transaction details:");
    console.log("Transaction hash:", txReceipt.transactionHash);
    console.log("Block number:", txReceipt.blockNumber);
    console.log("from:", txReceipt.from);
    console.log("to:", txReceipt.to);
    console.log("Gas used:", txReceipt.gasUsed.toString());

    // Get the transaction details using the transaction hash
    const tx = await provider.getTransaction(txReceipt.transactionHash);

    // Decode the input data using the contract ABI
    const decodedInput = dataStorageContract.interface.decodeFunctionData("setString", tx.data);

    console.log("Input value:", decodedInput);
    console.log("String value set successfully.");

    // Retrieve the stored string value
    console.log("Retrieving the stored string value...");
    const storedString = await dataStorageContract.getString();
    console.log("The stored string is: " + storedString);

  } catch (error) {
    console.error("An error occurred:", error);
  }
}

module.exports = main;