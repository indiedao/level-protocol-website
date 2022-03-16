// import { getAccessListFirst100, getAccessListMostRecent2 } from '../util/fauna'

const AccessListPage = ({ first100, mostRecent }) => {
  return (
    <div>
      <h1>access list</h1>
      <h2>first 100</h2>
      <ul>
        {first100.map(member => (
          <li key={member._id}>{member.address}</li>
        ))}
      </ul>
      <h2>most recent 2</h2>
      <ul>
        {mostRecent.map(member => (
          <li key={member._id}>{member.address}</li>
        ))}
      </ul>
    </div>
  )
}

export async function getStaticProps() {
  /*
  const first100 = await getAccessListFirst100()
  const mostRecent = await getAccessListMostRecent2()

  return {
    props: {
      first100,
      mostRecent,
    },
  }
  */
  return {
    props: {
      first100: [],
      mostRecent: [],
    },
  }
}

export default AccessListPage
