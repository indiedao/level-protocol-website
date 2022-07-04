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

const upsertMemberCounter = async () => {
  const {
    data: [existing],
  } = await client.query(
    q.Paginate(q.Match(q.Index('membersCount')), {
      size: 2,
    }),
  )

  if (existing) {
    return existing
  }

  return (
    await client.query(
      q.Create(q.Ref(q.Collection('MembersCounter'), '1'), {
        data: {
          counter: 0,
        },
      }),
    )
  ).ref
}

const upsertCommunityCounter = async () => {
  const {
    data: [existing],
  } = await client.query(
    q.Paginate(q.Match(q.Index('communitiesCount')), {
      size: 2,
    }),
  )

  if (existing) {
    return existing
  }

  return (
    await client.query(
      q.Create(q.Ref(q.Collection('CommunitiesCounter'), '1'), {
        data: {
          counter: 0,
        },
      }),
    )
  ).ref
}

const updateMemberCounter = async (id, membersCount) => {
  return client.query(
    q.Update(q.Ref(q.Collection('MembersCounter'), id), {
      data: {
        counter: membersCount,
      },
    }),
  )
}

const updateCommunityCounter = async (id, communitiesCount) => {
  return client.query(
    q.Update(q.Ref(q.Collection('CommunitiesCounter'), id), {
      data: {
        counter: communitiesCount,
      },
    }),
  )
}

async function main() {
  const membersCounterRef = await upsertMemberCounter()
  console.log('Fetching members paginated data...')
  const memberRecords = await getMemberPages()
  console.log(`Updating members counter to ${memberRecords.length}`)
  const newMembersCounter = await updateMemberCounter(
    membersCounterRef.id,
    memberRecords.length,
  )
  console.log(`New communities counter: ${newMembersCounter.data.counter}`)

  const communitiesCounterRef = await upsertCommunityCounter()
  console.log('Fetching communities paginated data...')
  const communityRecords = await getCommunityPages()
  console.log(`Updating communities counter to ${communityRecords.length}`)
  const newCommunitiesCounter = await updateCommunityCounter(
    communitiesCounterRef.id,
    communityRecords.length,
  )
  console.log(`New communities counter: ${newCommunitiesCounter.data.counter}`)
}

main()
