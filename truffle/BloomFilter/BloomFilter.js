class BloomFilter {
  constructor(size, numOfHashes) {
    this.size = size;
    this.numOfHashes = numOfHashes;
    this.bits = new Array(size).fill(0);
  }

  add(element) {
    for (let i = 0; i < this.numOfHashes; i++) {
      const hash = this.hash(element, i);
      this.bits[hash % this.size] = 1;
    }
  }

  isAvailable(element) {
    for (let i = 0; i < this.numOfHashes; i++) {
      const hash = this.hash(element, i);
      if (this.bits[hash % this.size] === 0) {
        return false;
      }
    }
    return true;
  }

  hash(element, seed) {
    let hash = 0;
    for (let i = 0; i < element.length; i++) {
      hash += element.charCodeAt(i);
    }
    return Math.abs(hash + seed) % this.size;
  }
}

const bloomFilter = new BloomFilter(10, 3);
bloomFilter.add("test");
bloomFilter.add("PALAK");

console.log("palak", bloomFilter.isAvailable("palak"));
console.log("shukla", bloomFilter.isAvailable("shukla"));
console.log("Test", bloomFilter.isAvailable("Test"));
console.log("PALAK", bloomFilter.isAvailable("PALAK"));
