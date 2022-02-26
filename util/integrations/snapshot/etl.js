import { extract } from './extract'
import { transform } from './transform'
import { load } from './load'

const etl = async dao => {
  // Get DAO config:
  // TODO: stub into fauna
  const config = {
    integrations: {
      snapshot: {
        // TODO: resolve ens from dao address above:
        ens: 'indiedao.eth',
      },
    },
  }

  if (!config.integrations.snapshot)
    throw new Error('No configuration for Snapshot integration!')

  // Extract data:
  const { memberVoteCounts } = await extract({
    ens: config.integrations.snapshot.ens,
  })

  // Transform data:
  const data = await transform({ memberVoteCounts })

  // Load data:
  const updatedMembers = await load({ dao, data })

  // TODO: update dao members index:
}

export default etl
