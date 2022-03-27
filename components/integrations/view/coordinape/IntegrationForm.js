import { useEffect, useState } from 'react'

import useWeb3 from '../../../hooks/useWeb3'
import useCommunity from '../../../hooks/useCommunity'
import { parseCoordinapeCSV } from '../../../../util/csv'
import Button from '../../../ui/Button'

const CoordinapeIntegrationForm = () => {
  const [files, setFiles] = useState([])
  const [isProcessing, setIsProcessing] = useState(false)
  const { bearerToken } = useWeb3()
  const { community } = useCommunity()

  useEffect(() => {
    const processFile = async file => {
      try {
        const text = await file.text()
        const coordinapeData = parseCoordinapeCSV(text)
        const response = await fetch('/api/triggers/coordinape', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${bearerToken}`,
          },
          body: JSON.stringify({
            name: file.name,
            contributions: coordinapeData,
          }),
        })
        if (response.status !== 200) {
          const json = await response.json()
          throw new Error(
            'error' in json ? json.error : 'An unexpected error has occured.',
          )
        }
        setFiles(files.slice(1))
      } catch (error) {
        // TODO: error handling
        console.log('error', error) // eslint-disable-line no-console
        setIsProcessing(false)
      }
    }

    if (isProcessing) {
      if (files.length > 0) {
        processFile(files[0])
      } else {
        setIsProcessing(false)
      }
    }
  }, [bearerToken, files, isProcessing])

  if (!community) return <h2>Loading community...</h2>

  const handleFileChange = ({ currentTarget: { files: inputFiles } }) => {
    const csvFiles = []
    Array.from(inputFiles).forEach(file => {
      const { type } = file
      if (type === 'text/csv') {
        csvFiles.push(file)
      }
    })
    setFiles(csvFiles)
  }

  return (
    <div>
      <label htmlFor="coordinape-epoch-csv-file">
        <input
          accept=".csv"
          disabled={isProcessing}
          id="coordinape-epoch-csv-file"
          multiple
          name="coordinape-epoch-csv-file"
          onChange={handleFileChange}
          type="file"
        />
        <span>Select Your Coordinape Epoch CSV Files</span>
      </label>
      {files.length ? (
        <>
          <h3>Files to process...</h3>
          <ul>
            {files.map(({ name }) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </>
      ) : undefined}
      <Button
        disabled={isProcessing}
        type="button"
        onClick={() => setIsProcessing(true)}
      >
        {isProcessing ? 'Processing...' : 'Process Coordinape Data'}
      </Button>
    </div>
  )
}

export default CoordinapeIntegrationForm
