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
        if (!(filter instanceof RegExp))
        {
            filter = RegExp(filter)
        }

        const files = await rdir(folder)

        return Promise.all( files.map( async file =>
        {
            if (filter.test(file))
            {
                // Exclude this
                return
            }
            else
            {
                const file_path = path.join(folder, file)

                const stats = await fstat(file_path)

                if (stats.isDirectory())
                {
                    return self.walk(file_path)
                }
                else
                {
                    return file_path
                }
            }
        }) )
    }
}
