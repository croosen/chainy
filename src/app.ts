import { sha256 } from "js-sha256";
import { serialize } from "serializer.ts/Serializer";

// class Block
export class Block {
    public index: number;
    public nonce: number;
    public timestamp: number;
    public data: string;
    public prevHash: string;
    public hash: string;

    constructor(index: number, nonce: number, timestamp: number, data: string, prevHash: string) {
        this.index = index;
        this.nonce = nonce;
        this.timestamp = timestamp;
        this.data = data;
        this.prevHash = prevHash;
        this.hash = this.hashBlock();
    }

    // hash whole block contents: serialize then stringify to create a new hash for this block
    public hashBlock(): string {
        // return sha256(JSON.stringify(serialize<Block>(this))); // nice but includes own hash
        return SHA256(this.index + this.nonce + this.timestamp + this.data + this.prevHash).toString();
    }
}

// class BlockChain
export class BlockChain {

    // first block
    public static readonly firstBlock = new Block(index: 0, nonce: 0, timestamp: 0, data: "first one!", prevHash: "" );

    // amount of zero's
    public static difficulty = 2;

    // blocks in the chain
    public blocks: Array<Block>;



}

// generate blocks
