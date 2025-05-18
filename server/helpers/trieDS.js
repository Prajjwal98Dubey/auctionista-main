class TrieNode {
  constructor() {
    this.children = {};
    this.isEnd = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }
  insertWord(word) {
    let curr = this.root;
    for (let w of word) {
      if (curr.children[w] === undefined) {
        curr.children[w] = new TrieNode();
      }
      curr = curr.children[w];
    }
    curr.isEnd = true;
  }
  findWord(word) {
    let curr = this.root;
    for (let w of word) {
      if (curr.children[w] === undefined) {
        return false;
      }
      curr = curr.children[w];
    }
    return curr.isEnd;
  }
}
