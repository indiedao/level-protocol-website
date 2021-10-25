const Metadata = (req, res) => {
  const id = Number(req.query.id)

  res.statusCode = 200
  return res.json({
    id,
    animation_url: `https://level.2c.io/token/${id}`,
  })
}

export default Metadata
