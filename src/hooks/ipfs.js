/* eslint @typescript-eslint/no-var-requires: "off" */
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
    const res = await ipfs.add(Buffer(file), (err, ipfshash) => {
      console.log(ipfshash)
    })
  }
  GetHash = async (file) => {
    const res = await ipfs.add(Buffer(file))
    console.log(Buffer(file))
    console.log(res)
    return 'https://ipfs.infura.io/ipfs/' + res.path
  }
}
const Ipfs = new IpfsClient()

export { Ipfs }
