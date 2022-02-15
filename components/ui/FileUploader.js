import styled from 'styled-components'
import { CSVReader } from 'react-papaparse'
import { H4, Body1 } from './Typography'
import Button from './Button'

const ProcessFileControlsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const FileUploader = ({
  title,
  buttonRef,
  handleOnFileLoad,
  handleOnError,
  handleOnRemoveFile,
  handleRemoveFile,
  handleOpenDialog,
}) => (
  <>
    <H4 color="white">{title}</H4>
    <CSVReader
      ref={buttonRef}
      onFileLoad={handleOnFileLoad}
      onError={handleOnError}
      noClick
      noDrag
      onRemoveFile={handleOnRemoveFile}
    >
      {({ file }) => (
        <div>
          {file && file.name ? (
            <>
              <ProcessFileControlsContainer>
                <Button onClick={handleRemoveFile}>Remove</Button>
              </ProcessFileControlsContainer>
              <Body1 color="white">You are uploading {file && file.name}</Body1>
            </>
          ) : (
            <Button onClick={handleOpenDialog}>Browse file</Button>
          )}
        </div>
      )}
    </CSVReader>
  </>
)

export default FileUploader
