import { db } from './db'

// "from" is a keyword, so need to wrap the column name with double-colon
// "stop_time" is not a keyword, so doesn't need to be wrapped with double-colon
let select_by_from_sql = db.prepare(`select "to", stop_time from seq where "from" = ? limit 1`)

export function select_by_from(from: number): undefined | {
  to: number
  stop_time: number
} {
  return select_by_from_sql.get(from)
}

let insert_seq_sql = db.prepare(`insert into "seq" ("from","to","stop_time") values(?,?,?)`)

export type Seq = {
  from: number
  to: number
  stop_time: number
}

export function insert_seq(
  row: Seq,
) {
  return insert_seq_sql.run(row.from, row.to, row.stop_time)
}
