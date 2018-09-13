#!/usr/bin/env node

'use strict'

require('dotenv').config()

const restify = require('restify')
// const errors  = require('restify-errors')
const getenv  = require('getenv')

const status  = require('./lib/status')
const after   = require('./lib/after')


const HOST  = getenv('HOST')       || '0.0.0.0'
const PORT  = getenv.int('PORT')   || 8080


const pkg = require('./package.json')


const server = restify.createServer({name: pkg.name})

server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser())


server.get('/status', status)


server.get('/hello/:name', (req, res, next) =>
{
    res.send('Hello ' + req.params.name)

    next()
})


server.on('after', after)


server.listen(PORT, HOST, () =>
{
    console.log(`"${server.name}" version ${pkg.version} listening at ${server.url}`)
})