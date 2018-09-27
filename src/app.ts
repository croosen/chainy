import { sha256 } from "js-sha256";
import axios, { AxiosResponse } from 'axios';

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

export class Node {
    public id: number;
    public address: string;

    constructor(id: number, address: string) {
        this.id = id;
        this.address = address;
    }
}

// class BlockChain
export class BlockChain {
    private chain: Array<Block>;
    public nodes: Set<Node> = new Set();
    public difficulty: number;

    // QUESTION how do we store a blockchain in a node? Memory? Database?
    constructor(md: number) {
        this.chain = new Array<Block>(new Block(0,0,"First!",""));
        this.nodes = new Array<Node>();
        this.difficulty = md;
    }

    public registerNode(node: Node): void {
        console.log("Registering node");
        this.nodes.add(node);
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

    // Sending block to other nodes
    public async broadCastBlock(block: Block) {
        for (const node of this.nodes) {
          console.log(`Sending transaction to ${ node.address }`);
          await axios.post(`http://${ node.address }/blocks`, block);
        }
        console.log('Broadcast done')
    }
}

// create new blockchain with difficulty of 2
// TODO difficulty is hardcoded to 00
const chainy = new BlockChain(2);

// create nodes
const node1 = new Node(1, '127.0.0.1:8090');
const node2 = new Node(2, '127.0.0.1:8091');
const node3 = new Node(3, '127.0.0.1:8092');

// register nodes to the blockchain
chainy.registerNode(node1)
chainy.registerNode(node2)
chainy.registerNode(node3)

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
