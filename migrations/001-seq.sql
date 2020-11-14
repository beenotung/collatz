-- Up
create table if not exists seq (
  -- don't mark this column as primary key to avoid auto increment when forget to supply when insert
  "from" integer not null unique,
  "to" integer not null,
  "stop_time" integer not null
);
insert into seq ("from","to","stop_time") values (1,1,0), (2,1,1), (4,1,1);

-- Down
drop table if exists seq;
