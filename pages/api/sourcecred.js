import * as sc from 'sourcecred'

export default async (req, res) => {
  if (req.method === 'GET') {
    const instance = sc.sourcecred.instance.readInstance.getNetworkReadInstance(
      'https://raw.githubusercontent.com/twos-complement/sourcecred/gh-pages/',
    )

    const CredGrainView = await instance.readCredGrainView()
    res.statusCode = 200
    console.log('credGraph', CredGrainView)
    res.json({ CredGrainView })
  }
}
