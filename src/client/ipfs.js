/* eslint @typescript-eslint/no-var-requires: "off" */
const projectId = '1uNvKihbXH3z3eOIsDenqoARQCd'
const projectSecret = '258447d982ae4ad74238e4bc0450ecd'
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64')
const IPFS = require('ipfs-http-client')

const ipfs = IPFS.create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
})

const IpfsClient = class {
  async add(file) {
    const res = await ipfs.add(file)
    console.log(res)
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
