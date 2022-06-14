/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
const faunadb = require('faunadb')
const fetch = require('node-fetch')

const q = faunadb.query

const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET,
  domain: 'db.fauna.com',
  port: 443,
  scheme: 'https',
})

const getPages = async _after => {
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
    return data.concat(await getPages(after))
  }
  return data
}

const updateMemberCaches = async records => {
  for (let i = 0; i < records.length; i += 1) {
    // Get old record by ref:
    const resp = await client.query(q.Get(q.Ref(records[i][1])))

    await fetch(`${process.env.API_PATH}/update-member-cache`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        address: resp.data.address,
      }),
    })

    console.log(`Updated member cache: ${resp.data.address}`)
  }
}

async function main() {
  console.log('Fetching paginated data...')
  const records = await getPages()
  console.log(`Found ${records.length} members!`)
  console.log('Updating member caches...')
  await updateMemberCaches(records)
  console.log(`Updated ${records.length} member caches!`)
}

main()
