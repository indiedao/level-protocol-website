/*
  [
    {"owner": { "id": "0x1..." } },
    {"owner": { "id": "0x2..." } },
  ]

  =>

  {
    "0x1...": 2,
    "0x2...": 1,
  }
*/
export const transform = data =>
  data.reduce((prev, curr) => {
    const prevCount = prev[curr.owner.id]?.tokenCount ?? 0
    return {
      ...prev,
      [curr.owner.id]: { tokenCount: prevCount + 1 },
    }
  }, {})
