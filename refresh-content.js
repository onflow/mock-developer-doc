const [commitSha, repo, contentPaths] = process.argv.split(2)

const postData = JSON.stringify({
  auth: "auth",
  repo, 
  commitSha, 
  contentPaths: contentPaths.split(' ')
})

postRefreshCache(postData).then((result) => console.log())

function postRefreshCache({
  http = require('https'),
  postData,
  options: {headers: headersOverrides, ...optionsOverrides} = {},
}) {
  return new Promise((resolve, reject) => {
    try {
      const searchParams = new URLSearchParams()
      searchParams.set('_data', 'routes/action/refresh')
      const options = {
        hostname: 'kentcdodds.com',
        port: 443,
        path: `/action/refresh?${searchParams.toString()}`,
        method: 'POST',
        headers: {
          auth: process.env.REFRESH_CACHE_SECRET || postData.auth,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postDataString),
          ...headersOverrides,
        },
        ...optionsOverrides,
      }

      const req = http
        .request(options, res => {
          let data = ''
          res.on('data', d => {
            data += d
          })

          res.on('end', () => {
            try {
              resolve(JSON.parse(data))
            } catch (error) {
              reject(data)
            }
          })
        })
        .on('error', reject)
      req.write(postDataString)
      req.end()
    } catch (error) {
      console.log('oh no', error)
      reject(error)
    }
  })
}

