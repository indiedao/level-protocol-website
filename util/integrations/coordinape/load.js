import { mergeMembersData } from '../../api/member'

const mergeMethod = (existingData, newData) => {
  const {
    epochNumber,
    participated,
    percentageReceived,
    period,
    received,
    sent,
    source,
  } = newData

  return {
    ...existingData,
    [source]: {
      epochNumber,
      participated,
      percentageReceived,
      period,
      received,
      sent,
    },
  }
}

export const load = async (membersDataHashes, data) =>
  mergeMembersData('coordinape', membersDataHashes, data, mergeMethod)
