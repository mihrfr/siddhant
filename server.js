// Pure Node.js dev server — zero dependencies, zero native addons
// just: node server.js

const http = require('http')
const fs   = require('fs')
const path = require('path')

const PORT = 3000
const ROOT = __dirname

const MIME = {
  '.html': 'text/html',
  '.js':   'application/javascript',
  '.css':  'text/css',
  '.jpeg': 'image/jpeg',
  '.jpg':  'image/jpeg',
  '.png':  'image/png',
  '.gif':  'image/gif',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
}

const server = http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0]
  if (urlPath === '/' || urlPath === '') urlPath = '/index.html'

  const filePath = path.join(ROOT, urlPath)

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' })
      res.end('404 Not Found: ' + urlPath)
      return
    }
    const ext  = path.extname(filePath).toLowerCase()
    const mime = MIME[ext] || 'application/octet-stream'
    res.writeHead(200, {
      'Content-Type': mime,
      'Cache-Control': 'no-cache',
    })
    res.end(data)
  })
})

server.listen(PORT, () => {
  console.log('\n🔥 SIDDHANT CHAOS SERVER RUNNING 🔥')
  console.log(`👉 Open: http://localhost:${PORT}`)
  console.log('💀 Press Ctrl+C to stop\n')
})
