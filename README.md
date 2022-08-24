# Todo App API
Todo App API using NodeJS, Express, and MySQL

## Features
1. Authentication API using JWT Token
2. CRUD Todo using REST API

## Installation Guide
1. Clone the project
    ```sh
    git clone https://github.com/ervin-sungkono/Todo-App-BE.git
    ```
2. Install dependencies
    ```sh
    npm install
    ```
3. Generate .env file and remove .env.example
   ```sh
    cp .env.example .env
   ``` 
4. Set up environment variables
5. Run the project
   ```sh
    npm start
   ```

## Endpoints
This API uses Authentication from JWT Token to accesss certain endpoints, check guides below for getting authenticated.

### Authentication
Request:
```http
    GET /user
```
Returns the information of the currently authenticated user.

Request:
```http
    POST /user/register
```
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `username` | `string` | **Required**. Your Username |
| :--- | :--- | :--- |
| `password` | `string` | **Required**. Your Password |
| :--- | :--- | :--- |
| `confirmPassword` | `string` | **Required**. Your Confirm Password |
| :--- | :--- | :--- |
| `email` | `string` | **Required**. Your Email Address |
Registers the user into database.

Request:
```http
    POST /user/login
```
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `username` | `string` | **Required**. Your Username |
| :--- | :--- | :--- |
| `password` | `string` | **Required**. Your Password |
Authenticate the user, will return a token in response.

### CRUD Todo
Request:
```http
    GET /todo
```
Returns all the todo list that is created by the user.

Request:
```http
    GET /todo/?id=id
```
Returns a todo with the given id if it is created by the user.

Request:
```http
    POST /todo
```
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `title` | `string` | **Required**. Your Todo Title |
| :--- | :--- | :--- |
| `due_date` | `date` | **Required**. Due Date for the Todo |
Adds a todo into the database.

Request:
```http
    PATCH /todo/?id=id
```
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `title` | `string` | **Required**. Your Todo Title |
| :--- | :--- | :--- |
| `due_date` | `date` | **Required**. Due Date for the Todo |
| :--- | :--- | :--- |
| `completed` | `tinyint` | **Required**. Determines whether Todo is completed or not |
Updates a todo with given id.

Request:
```http
    DELETE/todo/?id=id
```
Deletes a todo with given id.

## Status Codes
| Status Code | Description |
| :--- | :--- |
| 200 | `OK` |
| 201 | `CREATED` |
| 400 | `BAD REQUEST` |
| 409 | `CONFLICT` |
| 422 | `UNPROCESSABLE ENTITY` |