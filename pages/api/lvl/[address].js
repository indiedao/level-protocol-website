const Address = (req, res) => {
  const address = req.query.address

  //TODO: get actual lvl address
  res.statusCode = 200
  return res.json({
    address,
  })
}

export default Address
