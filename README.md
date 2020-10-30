# Around the U.S. (Back End)

## Routes

* `GET /users` — returns all users
* `GET /users/:userId` - returns a user by _id
* `POST /users` — creates a new user

* `GET /cards` — returns all cards
* `POST /cards` — creates a new card
* `DELETE /cards/:cardId` — deletes a card by _id

* `PATCH /users/me` — update profile
* `PATCH /users/me/avatar` — update avatar

* `POST /signup` — create a user account
* `POST /signin` — login user


#(Extra routes: need to be implemented)
* `PUT /cards/:cardId/likes` — like a card
* `DELETE /cards/:cardId/likes` — unlike a card


## Authorization and authentication
* only /signin and /signup routes can be used for unauthorized users. The rest of routes require authorization token.

## Other
* Centralized Error Handling
* Validating Requests
* Logging of Requests and Errors (request.log, error.log)


## Running the Project

`npm run start` — to launch the server.

`npm run dev` — to launch the server with the hot reload feature.
