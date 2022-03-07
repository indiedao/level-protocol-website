import { graphQLClient } from '../../util/fauna'
import { FaunaError } from './errors'

export const getItems = async (query, variables) => {
  try {
    return await graphQLClient.request(query, variables)
  } catch (error) {
    throw new FaunaError(error)
  }
}
