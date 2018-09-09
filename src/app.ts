import { sha256 } from "js-sha256";

// class Block
export class Block {
    public index: number;
    public nonce: number;
    public timestamp: Date;
    public data: string;
    public prevHash: string;
    public hash: string;

    constructor(index: number, nonce: number, data: string, prevHash: string) {
        this.index = index;
        this.nonce = 0;
        this.timestamp = new Date();
        this.data = data;
        this.prevHash = prevHash;
        this.hash = this.hashBlock();
    }

    public hashBlock(): string {
        console.log("hash block");
        const index = this.index.toString();
        const nonce = this.nonce.toString();
        const timestamp = this.timestamp.toString();

        return sha256(index + nonce + timestamp + this.data + this.prevHash);
    }

    public getHashBlock(): string {
        return this.hash;
    }
}

// class BlockChain
export class BlockChain {
    private chain: Array<Block>;
    public difficulty: number;

    // QUESTION how do we store a blockchain in a node? Memory? Database?
    constructor(md: number) {
        this.chain = new Array<Block>(new Block(0,0,"First!",""));
        this.difficulty = md;
    }

    public addBlock(block: Block): Block {
        console.log("add block");
        // gets block with Data
        // add index and prevHash to the Block
        const lastBlock = this.chain[this.chain.length - 1];
        block.index = lastBlock.index + 1;
        block.prevHash = lastBlock.hash;

        // mine block; generate hash with nonce
        // QUESTION mined == Pow?
        // TODO put in Promise?
        this.mineBlock(block);

        // push mined block to chain
        this.chain.push(block);

        // ???
        return block;
    }

    // QUESTION how to improve performance?
    public mineBlock(block: Block): Block {
        console.log("mine block");
        // take content of block
        // check if hash complies to difficulty
        // if not, nonce++ and generate new hash, check again
        // else, generate the new hash
        // TODO "00" is now hardcoded
        while (block.hash.substring(0, this.difficulty) !== "00") {

            console.log(`mining block ${block.index}: nonce: ${block.nonce}`);

            block.nonce++;
            block.hashBlock();
        }

        return block;
    }
}

// create new blockchain with difficulty of 2
const chainy = new BlockChain(2);

// create new block
const block01 = new Block(0,0,"New Block!","");

// add to chain
chainy.addBlock(block01);

// show output of chain
// console.log(JSON.stringify(chainy, null, 4));
