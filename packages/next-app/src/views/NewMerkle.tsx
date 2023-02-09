import { Box, Button, Card, CardBody, CardFooter, CardHeader, Divider, FormControl, FormErrorMessage, FormLabel, Heading, Radio, RadioGroup, Stack, Text, Textarea } from '@chakra-ui/react'
import { ParseWorkerConfig } from 'papaparse'
import React, { useState } from 'react'
import { readString } from 'react-papaparse'
import { BigNumber, ethers } from "ethers"

const { MerkleTree } = require('merkletreejs')
const keccak256 = require('keccak256')


type Props = {}

type ReadStringResult = {
  data: [
    [string, string]
  ],
  errors: Array<any>,
}

type DistribuitionMetadata_Id = number
type DistribuitionMetadata_Address = string
type DistribuitionMetadata_EthAmount = BigNumber


type DistribuitionData =
  Array<[DistribuitionMetadata_Id, DistribuitionMetadata_Address, DistribuitionMetadata_EthAmount]>


export default function NewMerkle({ }: Props) {
  const [value, setValue] = useState('ETH')
  const [isRecipientsInvalid, setIsRecipientsInvalid] = useState(false)
  const [ethRequired, setEthRequired] = useState(0)
  const [decimals, setDecimals] = useState(18);
  const [distribuitionData, setDistribuitionData] = useState<DistribuitionData>();
  const [merkleTree, setMerkleTree] = useState()



  const onRecipientsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIsRecipientsInvalid(false)

    const results = readString(e.target.value, { dynamicTyping: true } as ParseWorkerConfig) as unknown as ReadStringResult

    console.log('results: ', results)

    if (results && results.data[0]) {

      let ethAmountRequired = 0
      let isDataInvalid = false

      for (const line of results.data) {

        // Here we're checking for invalid inputs.
        if (!(line.length === 2) ||  // Checks the line contains 2 entries
          !ethers.utils.isAddress(line[0]) ||  // Checks if the first entry in the line is an adress
          !(typeof line[1] === "number")) {

          setIsRecipientsInvalid(true)
          setDistribuitionData(undefined)
          isDataInvalid = true
          break

        } else {
          ethAmountRequired = Math.round((ethAmountRequired + line[1]) * 1e12) / 1e12
        }
      }

      if (!isDataInvalid) {
        console.log({ ethAmountRequired })
        setEthRequired(ethAmountRequired)

        let transformedData: DistribuitionData = results.data.map((element, index) => {
          return [index, element[0], ethers.utils.parseUnits(String(element[1]), decimals)]
        })

        console.log({ transformedData })

        setDistribuitionData(transformedData)
      }
    }
  }

  const pinDistribuitionData = async () => {
    const payload = JSON.stringify(distribuitionData, (key, value) =>
      typeof value === 'bigint'
        ? value.toString()
        : value // return everything else unchanged
    )

    const response = await fetch('/api/pindistributiondata', {
      method: 'POST', body: payload
    })

    const responseData = await response.json()

    console.log('responseData: ', responseData)
  }

  const hashToken = (index, account, amount) => {
    return Buffer.from(
      ethers.utils.solidityKeccak256(["uint256", "address", "uint256"], [index, account, amount]).slice(2),
      "hex",
    );
  }

  const createMerkleTree = () => {
    if (distribuitionData.length > 0) {
      console.log(distribuitionData);
      const newMerkleTree = new MerkleTree(
        distribuitionData.map(entry => hashToken(...entry)),
        keccak256,
        { sortPairs: true },
      );
      console.log('newMerkleTree: ', newMerkleTree);
      console.log('newMerkleTree.getHexRoot(): ', newMerkleTree.getHexRoot());
      setMerkleTree(newMerkleTree);  // set state or return in this fn?
      
    }
  }

  const onClickDeployMerkle = async () => {

    await pinDistribuitionData()

    createMerkleTree()

    // if (merkleJson.length > 0) {
    //   console.log(merkleJson);
    //   let newMerkleTree = new MerkleTree(
    //     merkleJson.map(entry => hashToken(...entry)),
    //     keccak256,
    //     { sortPairs: true },
    //   );
    //   console.log(newMerkleTree.getHexRoot());
    //   setMerkleTree(newMerkleTree);
    // }


    //     pinata
    //       .pinJSONToIPFS(merkleJson)
    //       .then(result => {
    //         console.log(result);
    //         setMerkleJsonHash(result.IpfsHash);

    //         let merkleRoot = merkleTree.getHexRoot();

    //          tx(
    //           writeContracts.MerkleDeployer.deployEthMerkler(merkleRoot, dropper, deadline, result.IpfsHash, {
    //             value: ethers.utils.parseEther(amountRequired.toString()),
    //           }),
    //         )
    //           .then(result => {
    //             console.log(result);
    //             result.wait().then(receipt => {
    //               console.log(receipt.events[0].args._address);
    //               setDeploying(false);
    //               history.push(`/view/${receipt.events[0].args._address}`);
    //             });
    //           })
    //           .catch(err => {
    //             //handle error here
    //             console.log(err);
    //             setDeploying(false);
    //           });
    //       })
    //       .catch(err => {
    //         //handle error here
    //         console.log(err);
    //         setDeploying(false);
    //       });
  }

  return (
    <Card>
      <CardHeader>
        <Heading textAlign='left' size='sm'> New Merkle</Heading>
      </CardHeader>
      <Divider />
      <CardBody textAlign='left'>
        <Box>
          <Text mb='14px'>Type of Merkle Drop</Text>
          <RadioGroup onChange={setValue} value={value}>
            <Stack direction='row'>
              <Radio value='ETH'>ETH</Radio>
              <Radio disabled value='ERC20'>ERC20</Radio>
            </Stack>
          </RadioGroup>
        </Box>
        <FormControl isInvalid={isRecipientsInvalid}>
          <Box my='24px'>
            <FormLabel mb='14px'>Recipients and amounts</FormLabel>
            <Textarea
              placeholder={`0xaddress,amount\n0xaddress,amount`}
              onChange={e => onRecipientsChange(e)}
            />
            <FormErrorMessage>Please insert lines in the format: 0xValidAddress,NumberAmount.</FormErrorMessage>
          </Box>
        </FormControl>

      </CardBody>
      <CardFooter>
        <Button onClick={onClickDeployMerkle}>Deploy ETH Merkle</Button>
      </CardFooter>
    </Card>
  )
}