import { BigNumber } from "ethers";
import { ethers } from "hardhat";
const { MerkleTree } = require('merkletreejs')
const keccak256 = require('keccak256')


type DistribuitionMetadata_Id = number
type DistribuitionMetadata_Address = string
type DistribuitionMetadata_EthAmount = BigNumber


type DistribuitionData =
  Array<[DistribuitionMetadata_Id, DistribuitionMetadata_Address, DistribuitionMetadata_EthAmount]>


const hashToken = (index: DistribuitionMetadata_Id, account: DistribuitionMetadata_Address, amount: DistribuitionMetadata_EthAmount) => {
  console.log('amount: ', amount)
  return Buffer.from(
    ethers.utils.solidityKeccak256(["uint256", "address", "uint256"], [index, account, amount]).slice(2),
    "hex",
  );
}

const createMerkleTree = (recipientsAndAmounts: DistribuitionData) => {
  return new MerkleTree(
    recipientsAndAmounts.map(entry => hashToken(...entry)),
    keccak256,
    { sortPairs: true },
  );
}

describe("Check if Merkler is working", function () {
  it("Should be able to verify if a given address is in whitelist or not", async function () {

    // Get a bunch of test addresses
    const [owner, addr1] =
      await ethers.getSigners();

    const mockRecipientsAndAmounts: DistribuitionData =
      [
        [
          0,
          owner.address,
          ethers.utils.parseUnits(String(0.001), 18)
        ],
        [
          1,
          addr1.address,
          ethers.utils.parseUnits(String(0.002), 18)
        ],
      ]

    const merkleTree = createMerkleTree(mockRecipientsAndAmounts)

    const merkleRoot = merkleTree.getHexRoot()

    console.log('merkleRoot: ', merkleRoot)


    // Compute the Merkle Root
    // const root = merkleTree.getHexRoot();

    // // Deploy the Whitelist contract
    // const whitelist = await ethers.getContractFactory("Whitelist");
    // const Whitelist = await whitelist.deploy(root);
    // await Whitelist.deployed();

    // // Compute the Merkle Proof of the owner address (0'th item in list)
    // // off-chain. The leaf node is the hash of that value.
    // const leaf = keccak256(list[0]);
    // const proof = merkleTree.getHexProof(leaf);

    // // Provide the Merkle Proof to the contract, and ensure that it can verify
    // // that this leaf node was indeed part of the Merkle Tree
    // let verified = await Whitelist.checkInWhitelist(proof, 2);
    // expect(verified).to.equal(true);

    // // Provide an invalid Merkle Proof to the contract, and ensure that
    // // it can verify that this leaf node was NOT part of the Merkle Tree
    // verified = await Whitelist.checkInWhitelist([], 2);
    // expect(verified).to.equal(false);

  })
})