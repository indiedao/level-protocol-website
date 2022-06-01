import styled from 'styled-components'
import { usePoapEvents } from './poapApi'

const StyledTable = styled.table`
  &,
  a {
    color: white;
  }

  &,
  th,
  td {
    border: 1px solid white;
  }
`

const PoapEventList = ({ events, onDelete }) => {
  return (
    <StyledTable>
      <thead>
        <tr>
          <th>Image</th>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {events.map(e => (
          <tr key={e._id}>
            <td>
              <a href={e.url} target="_blank" noreferrer="true" noopener="true">
                <img src={e.imageUrl} width={100} />
              </a>
            </td>
            <td>{e.eventId}</td>
            <td>{e.name}</td>
            <td>{e.description}</td>
            <td>{e.startDate}</td>
            <td>{e.endDate}</td>
            <td>
              <button type="button" onClick={() => onDelete(e._id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  )
}

export default PoapEventList
