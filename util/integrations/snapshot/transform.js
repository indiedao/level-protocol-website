export const transform = data =>
  data.reduce(
    (memberData, { ens, id: proposalId, votes }) =>
      votes.reduce((voterMemberData, { id, voter: address, ...vote }) => {
        const participation =
          (Object.keys(voterMemberData[address]?.votes || {}).length + 1) /
          data.length

        return {
          ...voterMemberData,
          [address]: {
            votes: {
              ...(voterMemberData[address]?.votes || {}),
              [id]: {
                ...vote,
                ens,
                proposalId,
              },
            },
            participation,
          },
        }
      }, memberData),
    {},
  )
