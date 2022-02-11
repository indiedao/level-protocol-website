const saveConfig = (req, res) => {
  console.log(req.body)
  res.statusCode = 200
  res.json({ success: true })
}

export default saveConfig
