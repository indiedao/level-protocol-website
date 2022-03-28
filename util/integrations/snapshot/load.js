import { mergeMembersData } from '../../member'

const mergeMethod = (existingData, newData) => {
  const { ens } = Object.values(newData.votes)[0] || {}

  if (!ens) {
    throw new Error('Missing ens in snapshot merge data.')
  }

  // we can overwrite if we have an ens to scope under
  return {
    ...existingData,
    [ens]: newData,
  }
}

export const load = async (membersDataHashes, data) =>
  mergeMembersData('snapshot', membersDataHashes, data, mergeMethod)
