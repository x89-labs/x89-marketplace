/* eslint @typescript-eslint/no-var-requires: "off" */
import { Contract, mintNFT } from 'client/callSmContract'
const projectId = '5e4235dd371d43f0bbc8d252f58ac94c'
const projectSecret = '9d9b22eac02e4576a1ba727b3682fd16'
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64')
const IPFS = require('ipfs-http-client')

const ipfs = IPFS.create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  auth: auth,
})

const IpfsClient = class {
  async add(file) {
    const res = await ipfs.add(file, (err, ipfshash) => {
      console.log(ipfshash)
    })
    console.log(res)
    await mintNFT('https://infura.ipfs.io/ipfs/' + res.path)
  }

  getHash = async (file) => {
    const res = await aipfs.add(file)
    return res.path
  }

  async saveToIpfs(file) {
    try {
      console.log(file)
      const added = await ipfs.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      })
      const a = added.cid.toString()
      console.log(a)
    } catch (err) {
      console.error(err)
    }
  }
}
const Ipfs = new IpfsClient()

export { Ipfs }
