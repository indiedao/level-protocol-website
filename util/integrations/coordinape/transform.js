export class CoordinapeEpochTransformError extends Error {
  constructor(message) {
    super(message)
    this.name = 'CoordinapeEpochTransformError'
  }
}

export const transform = async ({ contributions, name }) =>
  contributions.reduce((data, contribution) => {
    const { address } = contribution
    if (address in data) {
      throw new CoordinapeEpochTransformError(
        `Found ${address} listed more than once in Coordinape epoch file ${name}.`,
      )
    }
    return {
      ...data,
      [address]: {
        ...contribution,
        source: name,
      },
    }
  }, {})
