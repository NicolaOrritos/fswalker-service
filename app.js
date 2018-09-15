#!/usr/bin/env node

'use strict'

require('dotenv').config()

const restify = require('restify')
const errors  = require('restify-errors')
const getenv  = require('getenv')
const path    = require('path')
const url     = require('url')

const status  = require('./lib/status')
const after   = require('./lib/after')

const {walk}  = require('./lib/walk')


const HOST  = getenv('HOST')       || '0.0.0.0'
const PORT  = getenv.int('PORT')   || 8080

const BASE_PATH = getenv('BASE_PATH') || '.'


const pkg = require('./package.json')


const server = restify.createServer({name: pkg.name})

server.use(restify.plugins.bodyParser())


server.get('/status', status)


server.get('/fs/*', async (req, res, next) =>
{
    try
    {
        const request_url = url.parse(req.url, true)

        let folder = request_url.pathname.slice('/fs/'.length)
        const {filterout} = request_url.query

        console.log(`Asked for path "${folder}" with filter "${filterout}"`)

        folder = folder.replace(/\./g,   '')
        folder = folder.replace(/\.\./g, '')
        folder = folder.replace(/\/\//g, '/')

        folder = path.join(BASE_PATH, folder)

        console.log(`Resolved to "${folder}"`)

        const paths = await walk(folder, filterout)

        res.send(paths)

        next()
    }
    catch (err)
    {
        next(new errors.InternalServerError(err))
    }
})


server.on('after', after)


server.listen(PORT, HOST, () =>
{
    console.log(`"${server.name}" version ${pkg.version} listening at ${server.url}`)
})
