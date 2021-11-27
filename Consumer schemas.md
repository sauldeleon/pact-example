# Pact example consumer schemas

## hachebo-consumer

---

### **Hachebo movie**

A movie from Movies catalog

#### _Hachebo movie properties_

- id: (number, required) - The unique identifier for a movie
- name: (string, required) - Name of the movie
- genre: (string, required) - Genre of the movie
- director: (string, required) - Director of the movie
- year: (number, required) - Year of the movie
- duration: (number, required) - Duration of the movie

#### _Hachebo movie example_

```json
{
  "id": 42,
  "name": "The Silence of the Lambs",
  "genre": "Jonathan Demme",
  "director": "Terror",
  "year": 1991,
  "duration": 192
}
```

### **Hachebo tv show**

A tv show from Tv shows catalog

#### _Hachebo tv show properties_

- id: (number, required) - The unique identifier for a tv show
- name: (string, required) - Name of the tv show
- genre: (string, required) - Genre of the tv show
- director: (string, required) - Director of the tv show
- seasons: (number, required) - Seasons of the tv show
- year: (number, required) - Year of the tv show

#### _Hachebo tv show example_

```json
{
  "id": 42,
  "name": "Friends",
  "genre": "Humor",
  "director": "David Crane, Marta Kauffman",
  "seasons": 10,
  "year": 1994
}
```

## netflis-consumer

---

### **Netflis movie**

A movie from Movies catalog

#### _Netflis movie properties_

- id: (number, required) - The unique identifier for a movie
- name: (string, required) - Name of the movie
- genre: (string, required) - Genre of the movie
- director: (string, required) - Director of the movie

#### _Netflis movie example_

```json
{
  "id": 42,
  "name": "The Silence of the Lambs",
  "genre": "Jonathan Demme",
  "director": "Terror"
}
```

### **Netflis tv show**

A tv show from Tv shows catalog

#### _Netflis tv show properties_

- id: (number, required) - The unique identifier for a tv show
- name: (string, required) - Name of the tv show
- genre: (string, required) - Genre of the tv show
- director: (string, required) - Director of the tv show
- seasons: (number, required) - Seasons of the tv show

#### _Netflis tv show example_

```json
{
  "id": 42,
  "name": "Friends",
  "director": "David Crane, Marta Kauffman",
  "genre": "Humor",
  "seasons": 10
}
```

## movies-api

---

### **Movies api duration**

Duration from durations microservice

#### _Movies api duration properties_

- id: (number, required) - The unique identifier for a duration item
- duration_min: (number, required) - Duration of the media item in minutes

#### _Movies api duration example_

```json
{
  "id": 42,
  "duration_min": 192
}
```

## tv-shows-api

---

### **Tv shows api duration**

Duration from durations microservice

#### _Tv shows api duration properties_

- id: (number, required) - The unique identifier for a duration item
- duration_min: (number, required) - Duration of the media item in minutes

#### _Tv shows api duration example_

```json
{
  "id": 42,
  "duration_min": 192
}
```
