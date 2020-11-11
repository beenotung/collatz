-- Up
create table if not exists seq (
  "from" integer not null,
  "to" integer not null,
  "stop_time" integer not null
);
insert into seq ("from","to","stop_time") values (1,1,0), (2,1,1), (4,1,1);

-- Down
drop table if exists seq;
