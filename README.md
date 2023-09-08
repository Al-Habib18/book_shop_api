<!-- @format -->

# Book-shop-api

Book-shop-api is a sample API that create a backend for customers to shop fictitious books and sellers can sell their books.

# Overview

Book-shop-api aims to provide a seamless user experience while ensuring the security and entegrity of user data.

It allows to browse and search for books and can see reviews of books without authentication.

Authenticate user (customers and sellers) can create cart, manage their cart , view their own order list and more.

Sellers can add books, update their own books and delete their own books.They can also see all books , They have created.

Administarations have access to an admin dashboard for managing users a, books , carts, orders and reviews.

# Backend

The API implemented using JavaScript and Express.js framework.It userd JWT (jsonwebtoken) for user authentication, and Mongodb to store all of the data for users, books,reviews, orders, and cart.

# Mongodb

The API create six tables in Mongodb.These are User, Book, Review, Cart,Order and Refresh_token.

### Entities :

-   User:
    -   id
    -   name - string
    -   email - string
    -   password - string
    -   role - enum[customer,seller, admin]
    -   account - string
    -   timestamp - date-time
-   Book :
    -   id
    -   userId - string
    -   title - string
    -   authors - array of string
    -   publisher - string
    -   category - string
    -   summary - string
    -   price - number
    -   available - enum[yes , no]
    -   timestamp - date-time
-   Cart :
    -   id
    -   userId - string
    -   bookId - array of string
    -   timestamp - date-time
-   Order :
    -   id
    -   userId - string
    -   cartId - string
    -   amount - number
    -   shippingMethod - enum [standard , prioprity]
    -   orderStatus - enum [pending, approved, shipped, delivered, cancelled]
    -   timestamp - date-time
-   Review :
    -   id
    -   userId - string
    -   bookId - string
    -   ratting - number
    -   summary - string
    -   timestamp - date-time
-   Refresh_token :
    -   id
    -   email - string
    -   token - string

## Funtionality

### a. Authencation

-   Users can register an account by providing their name, email address and password.

-   Users can login securely usering their email and password.
-   Users can logout from their account
-   Users can generate new access_token providing their refresh access_token

### b. User Management

-   Admin can create new User account
-   Admin can see list of Users inforamtion and users can see own account information
-   Admin can update or delete of all users account and Users can update or delete own account
-   Admin can change password all users password and users can change own password.
-   Admin can see all reviews of a specific user
-   Admin can sell all orders of a specific user and users can also own all orders .
-   Admin can manage all cart of a specific user
-   Admin can manage all books of a specific seller and sellers can see own all books

### c. Book Management

-   Both Authencation and unauthenticate users can browse and search books.They can also see reviews of a specific book.
-   Sellers and Admin can add books
-   Sellers can edit and delete their own books,,Admin have access all of books

### d. Cart Management

-   Admin, sellers and customers can create a cart
-   Only admin can manage all carts
-   customers and sellers can see, edit and delete their own cart.

### e. Oder Management

-   Customers and sellers can create an order.
-   They can cancel a order before order shipped
-   They can also see a own order inforamtion
-   Admin can delete order
-   Admin can retrive a user and a cart from a specific order id.

### f. Review Management

-   Authencation users can create reviews
-   They can update and delete own review.
-   Admin can update and delete all reviews
-   Admin can see all reviews
-   Admin can also retrive a book and user for given a review id

## Non-Funtionality

-   User password securely stored using appropriate hashing ans salting.
-   Authencation tokens generated securely and validated to prevent unauthenticate access.
-   Error handling implemented properly

## Endpoints

### - Public endpoints

#### Auth

-   POST /auth/register
    This endpoint takes user's name, email and password by request body and responses a access_token.

-   POST /auth/login
    This endpoint takes user's email and password , responses a access_token and refresh.

-   POST /auth/refresh

User's can input a refresh token by request body in this endpoint.It responses a access_token and refresh token.

#### Book

-   GET /books
    This endpoint retrives all books from databate with pagination accordingly user's given page, limit , sortType ,sortBy and search parameters

-   GET /books/:id
    This endpoint retrive a single book for given the book's id.

-   GET /books/:id/reviews
    This endpoint give all reviews of a specific book's id with pagination.

### - Authenticate User's endpoints

#### Auth

-   POST /auth/logout
    This endpoint takes a refresh token and logout a user.

#### User

-   GET /users/:id
    It retrives a user's inforamtion for given the user's id.

-   PATCH /users/:id
    It updates a user's inforamtion for given the user's id.

-   DELETE /users/:id
    It deletes a user for given the user's id.

-   PATCH /user/:id/password.
    It updates a user password for given a user's id

-   GET /users/:id/orders
    It retrives a user's own orders with pagination.

-   GET /users/:id/books
    It retrives all books for given a seller id with pagination.

#### Book

-   POST /books
    This endpoint creates a book. Only seller and admin can create a book.

-   PATCH /books/:id
    This endpoint update a book for given a book id. Only seller and admin can update a book.

-   DELETE /books/:id
    This endpoint delete a book for given a book id . Only seller and admin can update.

#### Cart

-   POST /cart
    This endpoint creates a new cart

-   PATCH /carts/:id
    This endpoint update a cart

-   DELETE /carts/:id
    This endpoint delete a cart

#### Order

-   POST /orders
    This endpoint creates new order

-   PATCH /orders/:id
    This routes cancel a order . If not order is shipped or delivered.

-   GET /orders/:id/cart
    This endpoint responses a cart by whice the order is created.

#### Review

-   POST /reviews
    creates a new review

-   PATCH /reviews/:id
    updates a review for given a review's id

-   DELETE /reviews/:id
    deletes a review for given a review's id

### - Admin

These endpoints retrives data

#### User

-   GET /users
    retrives all users

-   GET /users/:id/reviews
    retrives all reviews for given a user's id

-   GET /users/:id/carts
    retrives all carts for given a user's id rs

#### Review

-   GET /reviews/:id/book
    retrive a book for given a review id
-   GET /reviews/:id/user
    retrives a user for for given a review id

#### Cart

-   GET /reviews
    retrives all carts

#### Order

-   GET /orders
    retrives all orders
-   DELETE /orders/:id
    deletes a order for given a order's id
-   PATCH /orders/:id/order-status
    update a order for given order id and status
-   GET /orders/:id/user
    retrives a user for given a user's id
