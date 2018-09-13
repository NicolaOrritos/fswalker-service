'use strict'

const getenv = require('getenv')
const DEBUG  = getenv.bool('DEBUG') || false

module.exports = (req, res, route, error) =>
{
    if (error)
    {
        console.error(error.stack)
    }

    if (DEBUG)
    {
        console.log(`Request headers:  ${req.rawHeaders}`)
        console.log(`Response headers: ${JSON.stringify(res.getHeaders())}`)
        console.log(`${req.method} ${req.url} HTTP/${req.httpVersion}  ${res.statusCode} ${res.statusMessage}`)
    }
    else
    {
        console.log(`${req.method} ${req.url} HTTP/${req.httpVersion}  ${res.statusCode} ${error ? error.message : res.statusMessage}`)
    }
}
