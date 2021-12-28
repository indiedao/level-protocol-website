import * as sc from 'sourcecred'

export const getSourcecredContributions = async () => {
  const instance = sc.sourcecred.instance.readInstance.getNetworkReadInstance(
    process.env.SOURCECRED_URL,
  )
  const credGrainView = await instance.readCredGrainView()
  const credGraph = await instance.readCredGraph()

  return credGrainView
    .participants()
    .map(x => x.identity)
    .map(identity => {
      const userWeekNode = Array.from(credGraph.nodes()).find(node =>
        node.address.includes(identity.id),
      )
      const data = Array.from(credGraph.inNeighbors(userWeekNode.address)).map(
        edge => credGraph.node(edge.src),
      )

      return { name: identity.name, contribution: data }
    })
}
