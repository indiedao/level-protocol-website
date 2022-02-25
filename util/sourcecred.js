import * as sc from 'sourcecred'

// TODO: allow each community to configure their own instance:
const SOURCECRED_URL =
  'https://raw.githubusercontent.com/twos-complement/sourcecred/gh-pages/'

// TODO: get start date from database
const START_DATE = new Date('8/15/2021')

export const getSourcecredContributions = async () => {
  const instance =
    sc.sourcecred.instance.readInstance.getNetworkReadInstance(SOURCECRED_URL)
  const credGrainView = await instance.readCredGrainView()
  const credGraph = await instance.readCredGraph()

  return credGrainView
    .participants()
    .map(participant => participant.identity)
    .map(identity => {
      const intervalStartTime = credGrainView
        .intervals()
        .find(interval => interval.endTimeMs > START_DATE).startTimeMs
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
