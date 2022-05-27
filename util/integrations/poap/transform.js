export const transform = data =>
  data
    .filter(({ count }) => count != null)
    .map(({ address, count }) => ({
      [address]: { poapTokenCount: Number(count) },
    }))
