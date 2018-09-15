#!/usr/bin/env node

'use strict'

const path        = require('path')
const {promisify} = require('util')

const {readdir, stat} = require('fs')


const rdir  = promisify(readdir)
const fstat = promisify(stat)


const self = module.exports =
{
    walk: async function(folder, filter = '')
    {
        if (filter && !(filter instanceof RegExp))
        {
            filter = RegExp(filter)
        }

        console.log(`Walking folder "${folder}" (filtered by "${filter}")...`)

        const files = await rdir(folder)

        return Promise.all( files.map( async file =>
        {
            if (filter && filter.test(file))
            {
                // Exclude this
                return Promise.resolve()
            }
            else
            {
                const file_path = path.join(folder, file)

                const stats = await fstat(file_path)

                if (stats.isDirectory())
                {
                    return self.walk(file_path, filter)
                }
                else
                {
                    return Promise.resolve(file_path)
                }
            }
        }) )
    }
}
