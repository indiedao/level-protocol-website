import { makeFileObjects, storeFiles } from '../../util/web3Storage'
import multer from 'multer'

// Set global directory
global.__basedir = __dirname

// Multer Upload Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + '/uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
  },
})

// Filter for CSV file
const csvFilter = (req, file, cb) => {
  if (file.mimetype.includes('csv')) {
    cb(null, true)
  } else {
    cb('Please upload only csv file.', false)
  }
}

const upload = multer({ storage: storage, fileFilter: csvFilter })

const processCSV = async req => {
  let csvData = []
  let filePath = __basedir + '/uploads/' + req.file.filename
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv.parse({ headers: true }))
      .on('error', error => {
        throw error.message
      })
      .on('data', row => {
        csvData.push(row)
      })
      .on('end', () => {
        return csvData
      })
  })
}

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      if (req.file == undefined) {
        return res.status(400).send({
          message: 'Please upload a Coordinape CSV file!',
        })
      }

      const csvData = await processCSV(req)

      res.statusCode = 200
      res.json({ csvData })
    } catch (error) {
      console.log('catch error-', error)
      res.status(500).send({
        message: 'Could not upload the file: ' + req.file.originalname,
      })
    }
  }
}
