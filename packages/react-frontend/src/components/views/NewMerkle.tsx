import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Heading, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react'
import React from 'react'

type Props = {}

export default function NewMerkle({ }: Props) {
    const [value, setValue] = React.useState('1')
    
    return (
        <Card>
            <CardHeader>
                <Heading textAlign='left' size='sm'> New Merkle</Heading>
            </CardHeader>
            <Divider />
            <CardBody textAlign='left'>
                <Text mb='12px'>Type of Merkle Drop</Text>
                <RadioGroup onChange={setValue} value={value}>
                    <Stack direction='row'>
                        <Radio value='1'>ETH</Radio>
                        <Radio value='2'>ERC20</Radio>
                    </Stack>
                </RadioGroup>
            </CardBody>
            <CardFooter>
                <Button>Deploy ETH Merkle</Button>
            </CardFooter>
        </Card>
    )
}