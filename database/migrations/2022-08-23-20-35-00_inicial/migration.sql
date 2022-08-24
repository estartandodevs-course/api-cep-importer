
CREATE TABLE IF NOT EXISTS states (
  id serial PRIMARY KEY,
  name varchar(2) NOT NULL
);

CREATE TABLE IF NOT EXISTS cities (
  id serial PRIMARY KEY,
  name varchar(100) NOT NULL,
  state_id integer NOT NULL,
  CONSTRAINT FK_cities_states  FOREIGN KEY (state_id) REFERENCES states (id)
);

CREATE TABLE IF NOT EXISTS neighborhoods (
  id serial PRIMARY KEY,
  name varchar(100) NOT NULL,
  city_id integer NOT NULL,
  CONSTRAINT FK_neighborhoods_cities FOREIGN KEY (city_id) REFERENCES cities (id)
);

CREATE TABLE IF NOT EXISTS streets (
    id serial PRIMARY KEY,
    name varchar(150) NOT NULL,
    zip_code varchar(10) NOT NULL,
    neighborhood_id integer NOT NULL,
    CONSTRAINT FK_streets_neighborhoods FOREIGN KEY (neighborhood_id) REFERENCES neighborhoods (id)
);

 