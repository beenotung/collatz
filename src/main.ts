import { processSeq } from './core'
import { toExportMode, toSafeMode } from 'better-sqlite3-schema'
import { db } from './db'

let N = 664000

// speed up database writes
let cacheSize = 8 * 1024 ** 2
toExportMode(db, cacheSize)

for (let n = 1; n <= N; n++) {
  if (n % (N / 100) === 0) {
    process.stdout.write(`\r ${n}/${N}`)
  }
  processSeq(n)
}

// flush pending updates to disk
toSafeMode(db)

console.log('\n done')

