import { getAccessListFirst100 } from '../util/fauna'

const AccessListPage = ({ first100 }) => {
  return (
    <div>
      <h1>access list</h1>
      <h2>first 100</h2>
      <ul>
        {first100.map(member => (
          <li key={member._id}>{member.address}</li>
        ))}
      </ul>
    </div>
  )
}

export async function getStaticProps() {
  const first100 = await getAccessListFirst100()

  return {
    props: {
      first100,
    },
  }
}

export default AccessListPage
