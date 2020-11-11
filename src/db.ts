import DB from 'better-sqlite3-helper'
import path from 'path'

export let db = DB({
  path: path.resolve('data/sqlite3.db'),
  migrate: {
    migrationsPath: path.resolve('migrations'),
  },
})
