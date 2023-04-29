const SHA256 = require('crypto-js/sha256');

class Block 
{
    constructor(index, timestamp, data, previousHash = '')
    {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        // on va creer un methode hash qui va contenir le hash de notre block 
        this.hash =this.calculateHash();
    }

    // on va creer une nouvelle methode pour calculer le hash 
    calculateHash()
    {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain
{
    constructor()
    {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock()
    {
        return new Block(0, "29/04/2023", "Genesis block", "0");
    }
    
    // pour avoir le denier element de la blockchain 
    getLatestBlock()
    {
        return this.chain[this.chain.length -1];
    }

    // cette methode est creer pour ajouter des nouveau Block 
    addBlock(newBlock)
    {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    // cette methode est la pour verifier lintegrité de votre Blockchain
    isChainValid()
    {
        for(let i =1; i < this.chain.length; i++)
        {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i -1];

            if (currentBlock.hash !== currentBlock.calculateHash())
            {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash)
            {
                return false
            }
        }

        return true;
    }
    
}

let mussCoin = new Blockchain();
mussCoin.addBlock(new Block(1/ "19/04/2023", { amount: 4 }));
mussCoin.addBlock(new Block(2/ "31/04/2023", { amount: 10 }));

// pour voir la blockchain aller dans terminal( crtl + ù) et tapper node main.js
console.log(JSON.stringify(mussCoin, null, 4))

//pour voir ci notre blockchain est valide ou pas
console.log('Is Blockchain valid ?' + mussCoin.isChainValid())


// test du programme verifiction de litegrite de la blochcahin en changent la data et en essaant de modifier le hash pour voir ci le programme va detecter le default 

mussCoin.chain[1].data = { amount: 100};
mussCoin.chain[1].hash = mussCoin.chain[1].calculateHash();
console.log(JSON.stringify(mussCoin, null, 4))
console.log('Is Blockchain valid ?' + mussCoin.isChainValid())


//  comme on peut le constater la validite de la blockchain est efficace 
// ce project a pour but de vetifier comment un blockchain fonctionne  