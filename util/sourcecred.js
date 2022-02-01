import * as sc from 'sourcecred'

export const getSourcecredContributions = async () => {
  const instance = sc.sourcecred.instance.readInstance.getNetworkReadInstance(
    process.env.SOURCECRED_URL,
  )
  const credGrainView = await instance.readCredGrainView()
  const credGraph = await instance.readCredGraph()

  return credGrainView
    .participants()
    .map(participant => participant.identity)
    .map(identity => {
      const intervalStartTime = credGrainView
        .intervals()
        .find(
          interval => interval.endTimeMs > new Date('8/15/2021'),
        ).startTimeMs
      const userWeekNode = Array.from(credGraph.nodes()).find(
        node =>
          node.address.includes(identity.id) &&
          node.address.includes(intervalStartTime),
      )
      const contribution = Array.from(
        credGraph.inNeighbors(userWeekNode.address),
      ).map(edge => credGraph.node(edge.src))

      return { name: identity.name, contribution }
    })
}
