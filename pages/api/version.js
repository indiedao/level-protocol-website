export default (req, res) => {
  res.statusCode = 200
  res.json({ COMMIT_HASH: process.env.VERCEL_GITHUB_COMMIT_SHA || "LOCAL" })
}
