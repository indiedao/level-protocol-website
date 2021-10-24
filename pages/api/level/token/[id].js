const Metadata = (req, res) => {
  const id = Number(req.query.id)

  res.statusCode = 200
  return res.json({
    success: false,
  })
}

export default Metadata
