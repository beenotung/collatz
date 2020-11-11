import { db } from './db'

export type Row = {
  from: number
  to: number
  stop_time: number
}

let select_by_to_sql = db.prepare(`select "from", stop_time from seq where "to" = ? limit 1`)
let select_by_from_sql = db.prepare(`select "to", stop_time from seq where "from" = ? limit 1`)

export function select_by_to(to: number): undefined | {
  from: number
  stop_time: number
} {
  return select_by_to_sql.get(to)
}

export function select_by_from(from: number): undefined | {
  to: number
  stop_time: number
} {
  return select_by_from_sql.get(from)
}

let insert_sql = db.prepare(`insert into "seq" ("from","to","stop_time") values(?,?,?)`)

export type Seq = {
  from: number
  to: number
  stop_time: number
}

export function insert(
  row: Seq,
) {
  return insert_sql.run(row.from, row.to, row.stop_time)
}
