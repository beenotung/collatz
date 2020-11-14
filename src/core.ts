import { insert_seq, select_by_from } from './sql'

export function processSeq(n: number): {
  to: number,
  stop_time: number
} {
  if (n === 1) {
    return {
      to: 1,
      stop_time: 0,
    }
  }
  let seq = select_by_from(n)
  if (seq) {
    return seq
  }
  let next = calcNext(n)
  let nextSeq = processSeq(next)
  seq = {
    to: next,
    stop_time: 1 + nextSeq.stop_time,
  }
  insert_seq({
    from: n,
    to: seq.to,
    stop_time: seq.stop_time,
  })
  return seq
}

export function calcNext(n: number) {
  return n % 2 === 0 ? n / 2 : n * 3 + 1
}
