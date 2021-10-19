/* eslint @typescript-eslint/no-var-requires: "off" */
const INFURA_PROJECT_ID = process.env.REACT_APP_INFURA_PROJECT_ID
const INFURA_PROJECT_SECRET = process.env.INFURA_PROJECT_SECRET
const auth = 'Basic ' + Buffer.from(INFURA_PROJECT_ID + ':' + INFURA_PROJECT_SECRET).toString('base64')
const IPFS = require('ipfs-http-client')

const ipfs = IPFS.create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  auth: auth,
})

const IpfsClient = class {
  async add(file) {
    await ipfs.add(Buffer(file), (err, ipfshash) => {
      console.log(ipfshash)
    })
  }
  GetHash = async (file) => {
    const res = await ipfs.add(Buffer(file))
    return 'https://ipfs.infura.io/ipfs/' + res.path
  }
}
const Ipfs = new IpfsClient()

export { Ipfs }
