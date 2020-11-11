import { nextSeq } from './core'
import fs from 'fs'

let N = 10000000000
let file = 'collatz.csv'
fs.writeFileSync(file, 'n,step\n')

for (let n = 1; n < N; n++) {
  if (n % (N / 100) === 0) {
    process.stdout.write(`\r ${n}/${N}`)
  }
  let next = nextSeq(n)
  let step = next.stop_time
  fs.appendFileSync(file, `${n},${step}\n`)
}
console.log('\n saved to', file)

