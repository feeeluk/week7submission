drop table if exists album_genres cascade;
drop table if exists artists cascade;
drop table if exists albums cascade;
drop table if exists genres cascade;



create table if not exists
  artists (
    artist_id serial primary key,
    artist_name text not null
  );

create table if not exists
  albums (
    album_id serial primary key,
    album_title text not null,
    album_artist_id int,
    album_description text not null,
    album_art text not null,
    album_released_year text not null,
    foreign key (album_artist_id) references artists (artist_id)
  );

create table if not exists
  genres (
    genre_id serial primary key,
    genre_name text not null
  );

create table if not exists
 album_genres (
    album_id int not null,
    genre_id int not null,
    primary key (album_id, genre_id),
    foreign key (album_id) references albums (album_id),
    foreign key (genre_id) references genres (genre_id)
);

insert into
  artists (artist_name)
values
  ('Black Sabbath'),
  ('Taylor Swift'),
  ('Metallica');

insert into
  albums (album_title, album_artist_id, album_description, album_art, album_released_year)
values
  (
    'Black Sabbath',
    1,
    'The album that started it all...',
    'https://i.pinimg.com/originals/e3/0d/73/e30d73f0f0dc9e170beb1ad2e6819ab5.jpg',
    '1970'
  ),
  (
    'Taylor Swift',
    2,
    'Her debut album',
    'https://th.bing.com/th/id/OIP.DdJP9fdKWyVTOCVzmI64OAHaHW?rs=1&pid=ImgDetMain',
    '2006'
  ),
  (
    'Master of Puppets',
    3,
    'One of the most influential thrash metal albums ever made',
    'https://th.bing.com/th/id/R.70a730c04f8e44c8964fd9bb717b3024?rik=GJ43n7iYaQmYQQ&pid=ImgRaw&r=0',
    '1986'
  );

insert into
  genres (genre_name)
values
  ('Metal'),
  ('Blues'),
  ('Pop'),
  ('Country'),
  ('Heavy Metal'),
  ('Thrash Metal'),
  ('Folk');

insert into
  album_genres (album_id, genre_id)
values
  (1, 1),
  (1, 2),
  (1, 5),
  (1, 7),
  (2, 3),
  (2, 4),
  (3, 1),
  (3, 5),
  (3, 6);
