import styled from 'styled-components'
import { CSVReader } from 'react-papaparse'
import { H2, Body1 } from './Typography'
import { Button } from './Buttons'

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
  handleSubmit,
  handleOnRemoveFile,
  handleRemoveFile,
  handleOpenDialog,
}) => (
  <>
    <H2>{title}</H2>
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
                <Button onClick={handleSubmit}>Submit</Button>
              </ProcessFileControlsContainer>
              <Body1>You are uploading {file && file.name}</Body1>
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
