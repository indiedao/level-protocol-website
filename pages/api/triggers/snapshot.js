import etl from '../../../util/integrations/snapshot/etl'
import withTrigger from '../../../util/api/withTrigger'

const handler = async ({ dao }) => {
  // TODO: build queue/streaming infra:
  await etl(dao)
}

export default withTrigger(handler)
