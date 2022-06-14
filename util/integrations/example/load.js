import { mergeMembersData } from '../../api/member'

// You may specify a custom merge method that will be provided the existing
// and new data in order to create a custom merge under the given integration key.
//
// When not specified, `mergeMembersData` uses a simple merge akin to the following:
const simpleMergeMethod = (existingData, newData) => ({
  ...existingData,
  ...newData,
})

export const load = async (membersDataHashes, data) =>
  mergeMembersData('coordinape', membersDataHashes, data, simpleMergeMethod)
