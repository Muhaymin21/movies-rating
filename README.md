# movies-rating

## Getting Started
1- Clone the project
```
git clone https://github.com/Muhaymin21/movies-rating
```

2- Demo data for testing add new movies in the file demoData.txt

### Backend:
1- Install requirements:
```
pip install -r requirements.txt
```
2- Check the config data in config.py file and auth.py file.

3- Migrate the database:
```
flask db init
```
```
flask db migrate
```
```
flask db upgrade
```
4- Run the backend:
```
python app.py
```
or
```
python3 app.py
```
### Frontend:
1- Install requirements
```
npm install
```
2- You can change Auth0 data from src/index.js

3- Run the app:
```
npm start
```

## Roles
If you changed the Auth0 data, please include the following roles:
### User
#### Permissions:
```
write:rate
write:comment
```
#### What user can do?
- View Movies, Rates, Comments.
- Rate movies.
- Write comments.
### Admin
#### Permissions:
```
delete:comment
delete:movie
update:movie
write:comment
write:movie
write:rate
```
#### What Admin can do?
- All user role features.
- Add new movies.
- Delete movies.
- Delete comments.


## Error Handling
Errors are returned as JSON objects in the following format:
```
{
    "success": False, 
    "error": 400,
    "message": "bad request"
}
```
The API will return three error types when requests fail:
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Resource Not Found
- 500: Server error

## Endpoints 
### GET /api/movies
- Return a list of movies
- Take URL paramaters:
  - page: Current page number.
  - perPage: Number of movies per page.
- Example of success:
```
{
    "success": true,
    "count": 6,
    "movies": [
        {
            "date": "2021-05-28",
            "description": "Cruella is a 2021 American crime comedy film based on the character Cruella de Vil from Dodie Smith's 1956 novel The Hundred and One Dalmatians.[10] The film is directed by Craig Gillespie with a screenplay by Dana Fox and Tony McNamara, from a story by Aline Brosh McKenna, Kelly Marcel, and Steve Zissis.[11] It is the third live-action adaptation in the 101 Dalmatians franchise and serves as both a prequel and reboot. Emma Stone stars as the title character, with Emma Thompson, Joel Fry, Paul Walter Hauser, Emily Beecham, Kirby Howell-Baptiste, and Mark Strong in supporting roles. Set in London during the punk rock movement of the 1970s, the film revolves around Estella Miller, an aspiring fashion designer, as she explores the path that will lead her to become a notorious up-and-coming fashion designer known as Cruella de Vil.",
            "id": 4,
            "imgPath": "https://i.ibb.co/ypYJpNL/cruella.jpg",
            "name": "Cruella",
            "rate": 5.0,
            "rateCount": 1
        },
        {
            "date": "2021-07-14",
            "description": "The film stars Karen Gillan as a young assassin who must team up with her estranged assassin mother (Lena Headey) and her former assassin colleagues (Carla Gugino, Michelle Yeoh, and Angela Bassett) in order to save a young girl (Chloe Coleman) from other assassins.\n",
            "id": 5,
            "imgPath": "https://i.ibb.co/bmmZGrc/gunpowder.jpg",
            "name": "Gunpowder Milkshake",
            "rate": 1.0,
            "rateCount": 1
        },
        {
            "date": "1999-02-12",
            "description": "Blast from the Past is a 1999 American romantic comedy film directed by Hugh Wilson and starring Brendan Fraser, Alicia Silverstone, Christopher Walken, Sissy Spacek, and Dave Foley.\n\nThe film focuses on a naive 35-year old man, Adam Webber, who spent his entire life living in a fallout shelter with his parents watching reruns of I Love Lucy and The Honeymooners and listening to Perry Como and Dean Martin. His father is relatively content to stay, while his mother copes by trying to cobble together atomic era cocktails. When Adam has to come out of the shelter to get more supplies, his old-fashioned attitudes and manners make him a hit with everyone he meets, and attracts the attentions of Eve Rustikoff. ",
            "id": 6,
            "imgPath": "https://i.ibb.co/cJ12KWd/blast-from-past.jpg",
            "name": "Blast from the Past",
            "rate": 3.5,
            "rateCount": 1
        }
    ]
}
```
### GET /api/movies/{movie_id}
- Return the movie of the given ID.
- Take no paramaters or data:
- Example of success:
```
{
    "movie": {
        "date": "2021-05-28",
        "description": "Cruella is a 2021 American crime comedy film based on the character Cruella de Vil from Dodie Smith's 1956 novel The Hundred and One Dalmatians.[10] The film is directed by Craig Gillespie with a screenplay by Dana Fox and Tony McNamara, from a story by Aline Brosh McKenna, Kelly Marcel, and Steve Zissis.[11] It is the third live-action adaptation in the 101 Dalmatians franchise and serves as both a prequel and reboot. Emma Stone stars as the title character, with Emma Thompson, Joel Fry, Paul Walter Hauser, Emily Beecham, Kirby Howell-Baptiste, and Mark Strong in supporting roles. Set in London during the punk rock movement of the 1970s, the film revolves around Estella Miller, an aspiring fashion designer, as she explores the path that will lead her to become a notorious up-and-coming fashion designer known as Cruella de Vil.",
        "id": 4,
        "imgPath": "https://i.ibb.co/ypYJpNL/cruella.jpg",
        "name": "Cruella",
        "rate": 5.0,
        "rateCount": 1
    },
    "success": true
}
```
### GET /api/movies/{movie_id}/comments
- Return the movie comments of the given movie ID.
- Take URL paramaters:
  - more: Default is 1 and return 6*more comments, for example (more=2 will return 12 comment if exist).
- Example of success:
```
{
    "comments": [
        {
            "comment": "Great13",
            "date": "2021-08-28 13:37:38.862841",
            "id": 13,
            "name": "Muhaymin"
        },
        {
            "comment": "Great12",
            "date": "2021-08-28 13:37:37.022561",
            "id": 12,
            "name": "Muhaymin"
        },
        {
            "comment": "Great11",
            "date": "2021-08-28 13:37:35.397959",
            "id": 11,
            "name": "Muhaymin"
        },
        {
            "comment": "Great10",
            "date": "2021-08-28 13:37:33.025821",
            "id": 10,
            "name": "Muhaymin"
        },
        {
            "comment": "Great9",
            "date": "2021-08-28 13:37:30.056634",
            "id": 9,
            "name": "Muhaymin"
        },
        {
            "comment": "Great7",
            "date": "2021-08-28 13:37:26.165729",
            "id": 7,
            "name": "Muhaymin"
        }
    ],
    "hasMore": true,
    "success": true
}
```
### POST /api/users/rates
- Take list of movies ID and check the user ID, if the user rate any of this movies, return the rate.
- The user id is fetched from the jwt token.
- POST used instead of GET because array is posted in the body.
- Example of the body:
```
{
    "rates": [1, 2, 3, 7]
}
```
- Example of success:
```
{
    "rates": {
        "7": 2.5
    },
    "success": true
}
```
### POST /api/movies/create
- Insert new movie.
- Take json data:
  - name: Movie name.
  - description: Movie description.
  - date: Movie release date.
  - image: Moive poster image path.
- Return the new movie ID on success.
- Example of success:
```
{
    "id": 11,
    "success": true
}
```
### POST /api/movies/{movie_id}/comment
- Insert new comment.
- Take json data:
  - name: The User nickname.
  - comment: The user comment.
- Return the new comment on success.
- Example of success:
```
{
    "comment": {
        "comment": "Great",
        "date": "2021-08-28 19:53:00.741173",
        "id": 22,
        "name": "Muhaymin"
    },
    "success": true
}
```
### DELETE /api/movies/{movie_id}
- Delete the movie with the given id.
- Take no paramters or data.
- Return the deleted movie id in success.
- Example of success:
```
{
    "success": True,
    "id": 5
}
```
### DELETE /api/movies/{movie_id}/comments/{comment_id}
- Delete the comment for the movie with the given id.
- Take no paramters or data.
- Return the deleted comment id in success.
- Example of success:
```
{
    "success": True,
    "id": 5
}
```
### PATCH /api/movies/{movie_id}
- Update the movie with the given ID.
- Take json data:
  - name: Movie name.
  - description: Movie description.
  - date: Movie release date.
  - image: Moive poster image path.
- Return the movie id on success.
- Example of success:
```
{
    "success": True,
    "id": 5
}
```
### PATCH /api/movies/{movie_id}/rate
- Rate the movie with the given ID.
- No post required before patch since the default rate for each user is 0.
- Take json data:
  - newRate: The user new rate.
- The user ID will be retrived from the jwt token.
- Example of success:
```
{
    "success": True,
    "movieID": 5,
    "newRate": 4.5
}
```