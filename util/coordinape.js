export const mapCoordinapeData = csvData =>
  csvData
    ? csvData.map(item => ({
        name: item.data[1],
        address: item.data[2],
        cred: item.data[3],
        epoch: item.data[5],
      }))
    : []
