const crypto = require("crypto");

const chain = [];
const difficulty = 5;

const calculateHash = (data) => {
  const stringifyData = JSON.stringify(data);
  const hashHex = crypto.createHash("sha1").update(stringifyData).digest("hex");
  hashHex.slice(0, 10);
  return hashHex;
};

const getLatestBlock = () => {
  return chain[chain.length - 1];
};

const mineBlock = (newBlock) => {
  let nonce = 0;
  newBlock.nonce = nonce;
  while (
    newBlock.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
  ) {
    nonce++;
    newBlock.nonce = nonce;
    newBlock.hash = calculateHash(newBlock);
  }
  return newBlock;
};

const addBlock = (newBlock) => {
  newBlock.index = chain.length;
  newBlock.previousHash = getLatestBlock()?.hash || null;
  newBlock.hash = calculateHash(newBlock);
  const minedBlocked = mineBlock(newBlock);
  chain.push(minedBlocked);
  return chain;
};

addBlock({ timestamp: new Date(), data: { name: "palak" } });
addBlock({ timestamp: new Date(), data: { name: "shukla" } });
console.log("New Chain =>", chain);
