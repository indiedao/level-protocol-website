import * as sc from 'sourcecred'

export default async (req, res) => {
  if (req.method === 'GET') {
    const instance = sc.sourcecred.instance.readInstance.getNetworkReadInstance(
      process.env.SOURCECRED_URL,
    )

    const credGrainView = await instance.readCredGrainView()

    const credGraph = await instance.readCredGraph()

    const contributions = credGrainView
      .participants()
      .map(x => x.identity)
      .map(identity => {
        const userWeekNode = Array.from(credGraph.nodes()).find(node =>
          node.address.includes(identity.id),
        )
        const data = Array.from(
          credGraph.inNeighbors(userWeekNode.address),
        ).map(edge => credGraph.node(edge.src))

        return { name: identity.name, contribution: data }
      })

    res.statusCode = 200

    res.json({
      data: contributions,
    })
  }
}
