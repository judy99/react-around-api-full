# Around the U.S. (Back End)

## Routes

GET /users — returns all users
GET /users/:userId - returns a user by _id
POST /users — creates a new user

GET /cards — returns all cards
POST /cards — creates a new card
DELETE /cards/:cardId — deletes a card by _id

(Extra routes: need to be implemented)
PATCH /users/me — update profile
PATCH /users/me/avatar — update avatar
PUT /cards/:cardId/likes — like a card
DELETE /cards/:cardId/likes — unlike a card


## Workarounds
-- Temporary Authorization Solution


## Running the Project

`npm run start` — to launch the server.

`npm run dev` — to launch the server with the hot reload feature.
