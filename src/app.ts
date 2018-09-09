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
        this.nonce = nonce;
        this.timestamp = new Date();
        this.data = data;
        this.prevHash = prevHash;
        this.hash = this.hashBlock();
    }

    public hashBlock(): string {

        console.log("Hashing block");

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

        console.log("Adding block");

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

        console.log("Mining block");

        // take content of block
        // check if hash complies to difficulty number
        // if not, nonce++ and generate new hash, check again
        // else, generate the new hash
        // TODO "00" is now hardcoded
        // TODO this needs to be a nicer recursive function
        while (block.hash.substring(0, this.difficulty) !== "00") {

            console.log(`Mining block ${block.index}: nonce: ${block.nonce} hash: ${block.hash}`);

            block.nonce++;
            block.hash = block.hashBlock();
        }

        console.log(`Block ${block.index} mined with nonce ${block.nonce} and hash ${block.hash}`);

        return block;
    }
}

// create new blockchain with difficulty of 2
// TODO difficulty is hardcoded to 00
const chainy = new BlockChain(2);

// create new block
const block1 = new Block(0,0,"First new block with some data","");
const block2 = new Block(0,0,"This is another block","");
const block3 = new Block(0,0,"Yet another new block!","");

// add to chain
chainy.addBlock(block1);
chainy.addBlock(block2);
chainy.addBlock(block3);

// show output of chain
console.log(JSON.stringify(chainy, null, 4));
