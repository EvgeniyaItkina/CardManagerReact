# Introduction

This project is a comprehensive Card Management System designed for business use, providing various functionalities based on user roles (visitor, regular user, business user, admin). The application allows users to manage business cards, view detailed card information, and perform CRUD operations. Admins have additional capabilities, such as managing users and changing user statuses.

### Features
User authentication and role-based access control
Create, view, edit, and delete business cards
All pages support search function (Home, MyCards, FavCards, CRM)
Like and favorite cards
Admin management of users
Errors depend on dynamic API responses.

### Installation

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
### Clone the repository:
[https://github.com/your-username/crm-card-management.git](https://github.com/your-username/crm-card-management.git) 
### Navigate to the project directory:
cd crm-card-management
### Install dependencies:
npm install
### Start the development server:
npm start

# Components
### NavbarMaterialUI
- **Not Logged In**: Home, About, Search, Dark Mode, Login, Registration
- **Logged In (Regular User)**: Home, About, Favorites Cards, Search, Dark Mode, Profile Icon
- **Logged In (Business User)**: About, Favorites Cards, My Cards, Search, Dark Mode, Profile Icon
- **Logged In (Admin)**: About, Favorites Cards, My Cards, CRM, Search, Dark Mode, Profile Icon

### Home
Displays all cards from API based on search criteria.

Card actions:

- **Not logged in**: View phone.
- **Logged in (Regular User)**: View phone, like card.
- **Logged in (Business User)**: View phone, like card.
- **Logged in (Admin)**: View phone, like card, delete card.

### CardView
Displays detailed information about a card.

### CardNew
Form to create a new card.

Validation and submission handling.

### CardEdit
Form to edit an existing card.

Pre-fills form with card details fetched from API.

Validation and submission handling.

### About
Static information about the application.

### FavCards
Displays a list of favorite cards.

Card actions: **like** (remove from favorites), **view phone**, **delete** (only own cards).

### MyCards
Displays a list of user-created cards.

Card actions: **like** (remove from favorites), **view phone**, **edit card**, **delete card**.

Button to create a new card.

### Login
Form to log in.

Validation and submission handling.

Stores token in localStorage.

### Registration
Form to register a new account.

Validation and submission handling.

### Footer
- **Not Logged In**: About
- **Logged In (Regular User)**: About, Favorites Cards
- **Logged In (Business User)**: About, Favorites Cards, My Cards
- **Logged In (Admin)**: About, Favorites Cards, My Cards

### CRM
Admin functionality to manage users.

Displays a table of users with columns for ID, name, status (business/regular), and actions (change status, delete user).

Confirm deletion with a modal popup.

### Dark Mode
Toggle switch to enable dark mode using useTheme custom hook

Search

Search bar that filters cards displayed on the Home page

## Technologies Used
* Bootstrap
* Material-UI (MUI)
* HTML & CSS
* React (useState, useEffect, useMemo, useCallback, useParams)
* React Router
* Redux (store, provider, slice, useSelector, useDispatch)
* Axios
* JWT
* Custom hooks (useAPI, useTheme)
* React Hook Form (useForm, Controller)


Email for admin: admin@gmail.com 
Password for admin: Abc!123Abc