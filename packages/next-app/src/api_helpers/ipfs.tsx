const pinataSDK = require("@pinata/sdk");


export async function pinJSONToIPFS(merkle) {
    const pinata = new pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_API_SECRET);
    const result = await pinata.pinJSONToIPFS(merkle)
    return { ifpsHash: result.IpfsHash }
}