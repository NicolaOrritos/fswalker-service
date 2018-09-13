'use strict'

const pkg = require('../package.json')

module.exports = (req, res, next) =>
{
    // Get info about this process memory usage:
    const usage = process.memoryUsage()

    const memory = {}

    // Use human-readable memory sizes:
    memory.rss        = '~' + parseInt(usage.rss       / 1024 / 1024) + 'MB'
    memory.heap_total = '~' + parseInt(usage.heapTotal / 1024 / 1024) + 'MB'
    memory.heap_used  = '~' + parseInt(usage.heapUsed  / 1024 / 1024) + 'MB'

    // Get up-time of this process (in hours):
    const uptime = (process.uptime() / 60 / 60).toFixed(3) + 'h'

    // Get info about NodeJS version:
    const node_version = process.version

    // Then return 200 if everything is OK:
    res.send(
    {
        status: 'OK',
        memory,
        uptime: uptime,

        version:
        {
            [pkg.name]: pkg.version,  // If version is not initialized before, this may be undefined
            node:       node_version
        }
    })

    next()
}
