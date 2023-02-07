import { pinJSONToIPFS } from "../../api_helpers/ipfs";

export default async function handler(req, res) {

  let merkle = []

  if (!req.body) {
    return res.status(404).json({ message: 'Invalid request' })
  } else {
    merkle = JSON.parse(req.body)
    console.log('merkle: ', merkle)
  }

  switch (req.method) {
    case 'POST':
      const result = await pinJSONToIPFS(merkle)
      return res.status(200).json({ success: true, data: result })
      break
    // handle other HTTP methods
    default:
      res.status(404).json({ message: 'Invalid request' })
  }
}
