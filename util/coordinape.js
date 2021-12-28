export const mapCoordinapeData = csvData =>
  csvData
    ? csvData
        .map(item => ({
          name: item.data[1],
          address: item.data[2],
          points: item.data[3],
          epoch: item.data[5],
        }))
        .slice(1)
    : []
