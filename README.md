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
