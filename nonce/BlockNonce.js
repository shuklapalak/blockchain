const crypto = require("crypto");

class Block {
  constructor(index, timestamp, data, previousHash) {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.nonce = 0;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    const data =
      this.index +
      this.timestamp +
      JSON.stringify(this.data) +
      this.previousHash +
      this.nonce;

    const hashHex = crypto.createHash("sha1").update(data).digest("hex");
    return hashHex;
  }

  mineBlock(difficulty) {
    while (
      this.hash?.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
  }
}

class Blockchain {
  constructor() {
    this.chain = [];
    this.difficulty = 2;
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.index = this.chain.length;
    newBlock.previousHash = this.getLatestBlock()?.hash || null;
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
  }
}

let myBlockchain = new Blockchain();
console.log("Mining block 1...");
myBlockchain.addBlock(new Block(1, new Date(), { name: "palak" }));
console.log("Mining block 2...");
myBlockchain.addBlock(new Block(2, new Date(), { name: "shukla" }));

console.log("Chain =>", myBlockchain.chain);
