import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import TransactionFactory from "@project-serum/anchor/dist/cjs/program/namespace/transaction";
import { ShopManager } from "../target/types/shop_manager";

import * as web3 from '@solana/web3.js'
import { BN } from "bn.js";
import { idlAddress } from "@project-serum/anchor/dist/cjs/idl";
import { assert } from "chai";

describe("shop-manager", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.ShopManager as Program<ShopManager>;
  const goodsAccountKeyPair = web3.Keypair.generate()

  it("Initialize Goods!", async () => {
    console.log('goodsAccountKeyPair:', goodsAccountKeyPair.publicKey)
    console.log('wallet:', program.provider.publicKey)
   console.log("programid :",program.programId.encode()) 

    await program.provider.connection.requestAirdrop(program.provider.publicKey, 3e9)


    console.log('creating account...')
    const tx = await program.methods.initialize().accounts({
      goodsAccount: goodsAccountKeyPair.publicKey,
      user: program.provider.publicKey,
      systemProgram: web3.SystemProgram.programId,
    }).signers([goodsAccountKeyPair]).rpc();
    console.log("Your transaction signature", tx);






  });

  it("Add Goods!", async () => {
    console.log('goodsAccountKeyPair:', goodsAccountKeyPair.publicKey)
    console.log('wallet:', program.provider.publicKey)

    await program.provider.connection.requestAirdrop(program.provider.publicKey, 3e9)

    type Good = {
      id: anchor.BN, name: String, price: Number, image: String
    }

    const goodsArray = (await program.account.goodsAccount.fetch(goodsAccountKeyPair.publicKey)).goods as Array<Good>;
    assert.isEmpty(goodsArray)

    await program.methods.insertGoods({
      id: new BN(0),
      name: "blue band",
      price: 2323,
      image: "image2"
    }).accounts({
      goodsAccount: goodsAccountKeyPair.publicKey,
    }).rpc();



    await program.methods.insertGoods({
      id: new BN(1),
      name: "soko ugali",
      price: 23,
      image: "image1"
    }).accounts({
      goodsAccount: goodsAccountKeyPair.publicKey,
    }).rpc();

    const goodsArray1 = (await program.account.goodsAccount.fetch(goodsAccountKeyPair.publicKey)).goods as Array<Good>;

    assert.equal(goodsArray1.length, 2);


    await program.methods.insertGoods({
      id: new BN(2),
      name: "Indomie noodles",
      price: 7865,
      image: "image1"
    }).accounts({
      goodsAccount: goodsAccountKeyPair.publicKey,
    }).rpc();

    await program.methods.insertGoods({
      id: new BN(3),
      name: "white wash bar soap",
      price: 6787,
      image: "image1"
    }).accounts({
      goodsAccount: goodsAccountKeyPair.publicKey,
    }).rpc();

    await program.methods.updateGoods({
      id: new BN(3),
      name: "white wash powder soap",
      price: 6787,
      image: "image1"
    }).accounts({
      goodsAccount: goodsAccountKeyPair.publicKey,
    }).rpc();

    const goodsArray2 = (await program.account.goodsAccount.fetch(goodsAccountKeyPair.publicKey)).goods as Array<Good>;
    console.log('goodsArray2:',goodsArray2)
    const updatedGood = goodsArray2.find(good => good.id.toNumber()=== 3);
    assert.equal(updatedGood.name, 'white wash powder soap');

    await program.methods.deleteGoods(
       new BN(2),
       ).accounts({
      goodsAccount: goodsAccountKeyPair.publicKey,
    }).rpc();

    const goodsArray4 = (await program.account.goodsAccount.fetch(goodsAccountKeyPair.publicKey)).goods as Array<Good>;
    const updatedGood4 = goodsArray4.find(good => {

      console.log("number:",good.id.toNumber())
    return   good.id.toNumber() === 2
    
    });
    assert.isUndefined(updatedGood4)
  

    await program.methods.insertGoods({
      id: new BN(4),
      name: "Colgate",
      price: 987,
      image: "image1"
    }).accounts({
      goodsAccount: goodsAccountKeyPair.publicKey,
    }).rpc();



    const tx = await program.methods.insertGoods({
      id: new BN(5),
      name: "ndovu ugali",
      price: 32,
      image: "image1"
    }).accounts({
      goodsAccount: goodsAccountKeyPair.publicKey,
    }).rpc();
    console.log("Your transaction signature", tx);


    await program.methods.deleteAllGoods().accounts({
      goodsAccount: goodsAccountKeyPair.publicKey,
    }).rpc();

    const goodsArray5 = (await program.account.goodsAccount.fetch(goodsAccountKeyPair.publicKey)).goods as Array<Good>;
    assert.isEmpty(goodsArray5)

    const goods = await program.account.goodsAccount.fetch(goodsAccountKeyPair.publicKey);
    console.log('goods:', goods)




  });
});
