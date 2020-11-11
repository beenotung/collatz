import { insert, select_by_from, select_by_to } from './sql'

export function nextSeq(n: number): {
  to: number,
  stop_time: number
} {
  if (n === 1) {
    return {
      to: 1,
      stop_time: 0,
    }
  }
  let next = select_by_from(n)
  if (next) {
    return next
  }
  let to = calcNext(n)
  let stop_time: number
  let prev = select_by_to(to)
  if (prev) {
    stop_time = prev.stop_time + 1
  } else {
    let next = nextSeq(to)
    stop_time = next.stop_time + 1
  }
  if (n % 2 === 1) {
    insert({ from: n, to, stop_time })
  }
  return { to, stop_time }
}

export function calcNext(n: number) {
  return n % 2 === 0 ? n / 2 : n * 3 + 1
}
