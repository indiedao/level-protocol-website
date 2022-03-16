/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
const faunadb = require('faunadb')

const q = faunadb.query

const oldClient = new faunadb.Client({
  secret: process.env.OLD_FAUNA_SECRET,
  domain: 'db.fauna.com',
  port: 443,
  scheme: 'https',
})

const newClient = new faunadb.Client({
  secret: process.env.NEW_FAUNA_SECRET,
  domain: 'db.fauna.com',
  port: 443,
  scheme: 'https',
})

const getPages = async _after => {
  let resp
  if (!_after) {
    // first query
    resp = await oldClient.query(
      q.Paginate(q.Match(q.Index('all_member_configs')), {
        size: 10,
      }),
    )
  } else {
    // subsequent queries
    resp = await oldClient.query(
      q.Paginate(q.Match(q.Index('all_member_configs')), {
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

const migrateRecords = async records => {
  for (let i = 0; i < records.length; i += 1) {
    // Get old record by ref:
    const resp = await oldClient.query(q.Get(q.Ref(records[i])))

    // Format ts as ISO 8601:
    const createdAt = new Date(resp.ts / 1000).toISOString()

    // Update format of data:
    const data = {
      createdAt,
      colorLightness: resp.data.colorLightness,
      colorHue: resp.data.colorHue,
      address: resp.data.address,
      nftAddress: resp.data.nftAddress,
      nftId: resp.data.nftId,
    }

    // Save new record:
    await newClient.query(
      q.Create(q.Collection('Member'), {
        data,
      }),
    )

    console.log(`Migrated ${resp.data.address}`)
  }
}

async function main() {
  console.log('Fetching paginated data...')
  const records = await getPages()
  console.log(`Found ${records.length} records!`)
  console.log('Migrating records...')
  await migrateRecords(records)
  console.log(`Migrated ${records.length} records!`)
}

main()
