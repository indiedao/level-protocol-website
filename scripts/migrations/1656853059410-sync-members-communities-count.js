/* eslint-disable no-console */
const faunadb = require('faunadb')

const q = faunadb.query

const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET,
  domain: 'db.fauna.com',
  port: 443,
  scheme: 'https',
})

const getMemberPages = async _after => {
  let resp
  if (!_after) {
    // first query
    resp = await client.query(
      q.Paginate(q.Match(q.Index('all_members_sorted_by_created_at')), {
        size: 10,
      }),
    )
  } else {
    // subsequent queries
    resp = await client.query(
      q.Paginate(q.Match(q.Index('all_members_sorted_by_created_at')), {
        size: 10,
        after: _after,
      }),
    )
  }

  const { after, data } = resp

  if (after) {
    return data.concat(await getMemberPages(after))
  }
  return data
}

const getCommunityPages = async _after => {
  let resp
  if (!_after) {
    // first query
    resp = await client.query(
      q.Paginate(q.Match(q.Index('allCommunities')), {
        size: 10,
      }),
    )
  } else {
    // subsequent queries
    resp = await client.query(
      q.Paginate(q.Match(q.Index('allCommunities')), {
        size: 10,
        after: _after,
      }),
    )
  }

  const { after, data } = resp

  if (after) {
    return data.concat(await getCommunityPages(after))
  }
  return data
}

const updateMemberCounter = async membersCount => {
  return client.query(
    q.Update(q.Collection('MembersCounter'), {
      data: {
        counter: membersCount,
      },
    }),
  )
}

const updateCommunityCounter = async communitiesCount => {
  return client.query(
    q.Update(q.Collection('CommunitiesCounter'), {
      data: {
        counter: communitiesCount,
      },
    }),
  )
}

async function main() {
  console.log('Fetching members paginated data...')
  const memberRecords = await getMemberPages()
  console.log(`Updating members counter to ${memberRecords.length}`)
  const newMembersCounter = await updateMemberCounter(memberRecords.length)
  console.log(`New communities counter: ${newMembersCounter.data.counter}`)

  console.log('Fetching communities paginated data...')
  const communityRecords = await getCommunityPages()
  console.log(`Updating communities counter to ${communityRecords.length}`)
  const newCommunitiesCounter = await updateCommunityCounter(
    communityRecords.length,
  )
  console.log(`New communities counter: ${newCommunitiesCounter.data.counter}`)
}

main()
