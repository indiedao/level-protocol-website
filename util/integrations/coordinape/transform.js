import utils from 'web3-utils'

export class CoordinapeEpochTransformError extends Error {
  constructor(message) {
    super(message)
    this.name = 'CoordinapeEpochTransformError'
  }
}

const totalGive = contributions =>
  contributions.reduce((total, { sent, received }) => {
    if (sent === 0 && received === 0) {
      // this person either opted out or otherwise did not participate, so we will skip them
      return total
    }
    return total + 100
  }, 0)

export const transform = async ({ contributions, name }) => {
  const totalGivePossible = totalGive(contributions)
  if (totalGivePossible === 0) {
    throw new CoordinapeEpochTransformError(
      'No member appears to have participated in this epoch; total GIVE given is zero.',
    )
  }

  return contributions.reduce((data, contribution) => {
    const { address: downcaseAddress, received, sent } = contribution

    // Coordinape CSV addresses are downcased, we prefer Checksum
    const address = utils.toChecksumAddress(downcaseAddress)

    if (address in data) {
      throw new CoordinapeEpochTransformError(
        `Found ${address} listed more than once in Coordinape epoch file ${name}.`,
      )
    }
    return {
      ...data,
      [address]: {
        ...contribution,
        participated: received > 0 || sent > 0,
        percentageReceived: received / totalGivePossible,
        source: name,
      },
    }
  }, {})
}
