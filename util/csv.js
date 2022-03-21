export class CoordinapeCSVParseError extends Error {
  constructor(message) {
    super(message)
    this.name = 'CoordinapeCSVParseError'
  }
}

const headerKeyMap = {
  'No.': 'memberNumber',
  name: 'name',
  address: 'address', // downcased
  received: 'received',
  sent: 'sent',
  'epoch number': 'epochNumber',
  Date: 'period',
}

const knownHeaderKeys = Object.keys(headerKeyMap)

const asPassThru = value => value

const asPositiveInteger = value => {
  const int = parseInt(value, 10)
  return Number.isNaN(int) || int < 0 ? 0 : int
}

const valueTransformMap = {
  memberNumber: asPositiveInteger,
  name: asPassThru,
  address: asPassThru,
  received: asPositiveInteger,
  sent: asPositiveInteger,
  epochNumber: asPositiveInteger,
  period: asPassThru,
}

// modified from:
// https://stackoverflow.com/questions/21105360/regex-find-comma-not-inside-quotes
const parseRow = row =>
  row
    .split(/(?!\B"[^"]*),(?![^"]*"\B)/g)
    .map(col => col.replace(/(^"|"$)/g, ''))

// some guidance from:
// https://sebhastian.com/javascript-csv-to-array/
export const parseCoordinapeCSV = csvString => {
  const rows = csvString
    .split(/(?:\r\n|\n|\r)/g)
    .filter(row => row.trim().length)
  if (rows.length < 2) {
    throw new CoordinapeCSVParseError(
      'This Coordinape CSV is empty or missing data.',
    )
  }
  const headerKeys = parseRow(rows.shift())
  if (
    headerKeys.length >
    headerKeys.filter(headerKey => knownHeaderKeys.includes(headerKey))
  ) {
    throw new CoordinapeCSVParseError(
      'This Coordinape CSV contains an unexpected column.',
    )
  }
  if (
    knownHeaderKeys.length >
    knownHeaderKeys.filter(headerKey => headerKeys.includes(headerKey))
  ) {
    throw new CoordinapeCSVParseError(
      'This Coordinape CSV is missing an unexpected column.',
    )
  }
  return rows.map(row => {
    const values = parseRow(row)
    return headerKeys.reduce((item, headerKey, index) => {
      if (knownHeaderKeys.includes(headerKey)) {
        const knownHeaderKey = headerKeyMap[headerKey]
        return {
          ...item,
          [knownHeaderKey]: valueTransformMap[knownHeaderKey](values[index]),
        }
      }
      return item
    }, {})
  })
}
