create database if not exists burgersDB;

use burgersDB;

create table if not exists burgers(
    id int(255) not null auto_increment,
    burger_name varchar(255) not null,
    devoured boolean default false,
    date timestamp,
    primary key (id)

);

select*from burgers;