class TransactionNonce {
  constructor() {
    this.heapArray = [];
    this.nextNonce = 0;
  }

  // Insert a new nonce into the heap
  insert() {
    this.heapArray.push(this.nextNonce);
    this.nextNonce++;
  }

  // Get the min value from heap
  extractMin() {
    // If the heap is empty, return an error
    if (this.heapArray.length == 0) return "Heap is empty";

    // Sort the array to find the minimum nonce
    const minNonce = this.heapArray.sort((a, b) => a - b)[0];

    this.heapArray.shift();
    return minNonce;
  }

  // Method to handle failed transaction
  failedTxn(nonce) {
    // nonce back to heap array if failed
    this.heapArray.push(nonce);
    console.log(nonce, "txn failed");
  }
}

const nonceHeap = new NonceHeap();
// Add nonce in pool
nonceHeap.insert();
nonceHeap.insert();
nonceHeap.insert();
nonceHeap.insert();

const nextNonce = nonceHeap.extractMin();
console.log("1 Txn - ", nextNonce);

const next2Nonce = nonceHeap.extractMin();
console.log("2 Txn - ", next2Nonce);

const next3Nonce = nonceHeap.extractMin();
console.log("3 Txn - ", next3Nonce);

nonceHeap.failedTransaction(2);
// nonceHeap.insert();

const next4Nonce = nonceHeap.extractMin();
console.log("4 Txn - ", next4Nonce);

const next5Nonce = nonceHeap.extractMin();
console.log("5 Txn - ", next5Nonce);
