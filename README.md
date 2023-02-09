# About the Merkler

If you want to send value to a large number of addresses, gas costs & limits make sending to the addresses one-by-one or in batches not a viable option. A common solution is to use a Merkle tree to create an airdrop to a list of tokens that is stored off-chain, but which can be validated on-chain.

From the Merkle Tree [Wikipedia entry](https://en.wikipedia.org/wiki/Merkle_tree):

> In cryptography and computer science, a hash tree or Merkle tree is a tree in which every leaf node is labelled with the cryptographic hash of a data block, and every non-leaf node is labelled with the cryptographic hash of the labels of its child nodes. Hash trees allow efficient and secure verification of the contents of large data structures

If you store the root of a Merkle tree in a smart contract, that contract can then verify that a claim is part of that tree, based on the claim and a corresponding Merkle proof.

The Merkler is an end-to-end demonstration that lets you define, deploy and then claim Merkle drops.
