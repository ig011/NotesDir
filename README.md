# NotesDir Web-App

This application is simple ToDo notes app that allows users to storage/create/modify their own tasks on their account.

# How to use App

**FRONTEND**
After cloning this application you need to install every necessary packages by running single command in terminal

```sh
npm install
```

When the installation finishes you can run web application by putting command

```sh
npm run dev
```

After that open your web browser and go to https://localhost:3000. This should open **HomeAutomation** Web App.

**BACKEND**

In order to run python Django backend server you need to install needed packages

```sh
pip install -r requirements.txt
```

After that in order to run server you need to go to the main folder of Django backend (where file manage.py is located) and paste code to command shell

```sh
python manage.py runserver
```

# Used technologies

All the application has been written with **Typescript** in React library using Next.js framework. To manage account's ToDos backend server with Python Django has been installed. Communication between frontend and backend has been realised by means of GraphQL.

Secure user authentication was used by JWT with HttpOnly cookie.

Other technologies: **React.js**, **Next.js**, **GraphQL**, **graphene-django**, **Django**, **graphene-auth**.

# Screenshots

After starting application user gets pushed to the login page content (**ONLY IS USER IS NOT LOGGED IN**).

In that page user can use _LOG-IN_ form in order to login to his account.

![main-login](screenshots/screen1.png?raw=true "LOG-IN PAGE")

If user doesn't have one he may create it by for example clicking on **SIGN UP** button at the right-top of the application.

![main-signup](screenshots/screen2.png?raw=true "SIGN-UP PAGE")

When user has been successfully logged in he'll be pushed to the main **HOMEPAGE** that contains all todo's created on user's account. From this page it's allowed to edit/create/delete single selected ToDo.

![main-todo-list](screenshots/screen3.png?raw=true "HOMEPAGE - TODO LIST")

Left clicking on the user's avatar that is located at the right-top (right navbar side) opens dropdown menu showed below.

![main-dropdown-account-menu](screenshots/screen4.png?raw=true "USER DROPDOWN MENU")
