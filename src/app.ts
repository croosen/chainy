import { sha256 } from "js-sha256";

// class Block
export class Block {
    public index: number;
    public nonce: number;
    public timestamp: Date;
    public data: string;
    public prevHash: string;
    public hash: string; // TODO check if this should be here + check constructor

    constructor(index: number, nonce: number, data: string, prevHash: string) {
        this.index = index;
        this.nonce = nonce;
        this.timestamp = new Date();
        this.data = data;
        this.prevHash = prevHash;
        this.hash = this.hashBlock();
    }

    // hash whole block contents: serialize then stringify to create a new hash for this block
    public hashBlock(): string {
        return SHA256(this.index + this.nonce + this.timestamp + this.data + this.prevHash).toString();
    }

    public mineBlock(difficulty): string {
      // mine
    }
}

// class BlockChain
export class BlockChain {

    // amount of zero's
    public static difficulty = 2;

    // blocks in the chain
    public blocks: Array<Block>;

    // QUESTION how do we store a blockchain in a node? Memory? Database?
    constructor() {
        this.blockchain = Array(this.createFirstBlock());
    }

    // create the first block in the chain
    createFirstBlock() {
        return new Block(0, 0, "first one!", "" );
    }

    // get latest block in the chain
    // FIXME improve this, see code assignment
    getLastBlock() {
        return this.blockchain[this.blockchain.length - 1];
    }

    addBlock(block) {
        block.prevHash = this.getLatestBlock.hash;
        block.hash = block.hashBlock();
        this.blockchain.push(block);
    }

    // mine block
    mineBlock(data: string): Block {
        const lastBlock = this.getLastBlock();
        const newBlock = new Block(this.getLastBlock.index + 1, 0, data, this.getLastBlock.hash )

        while(true) {
            // mining here
        }
    }

}

// generate blocks
