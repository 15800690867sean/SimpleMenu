# Simple Menu

A simple menu with several buttons in the homepage.

Clicking one of the buttons will display a login form. The form contains username input, password input, submit button and cancel button.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

The Dev Node.js version is 18.18.0

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the welcome page.

Visit (http://localhost:3000/homepage) or click the link in the welcome page to see the homepage.

When the login button in the homepage is clicked, you will see the login page.

You can input your username and password in the input box, by clicking the submit button the data will be sent to the api which is a fake endpoint.

If the password and username are both valid, then the login process will be finished successfully and your status will be changed. Otherwise, you will see an alert showing you what's the problem.

## Different Modes

### Default Mode

The valid username-password pairs are stored in a file named mockData.ts which is in the directory /api/login.

This process simulates the process of reading user information from the database.

### JSON Mode

The data used for constructing the menu is obtained from a specific api. And that api is gonna fetch data from a JSON file. This process simulates the process of obtaining JSON data from other servers.

The structure of the menu is generated based on the data in JSON, and after clicking each button, the menu will also change based on the data in JSON.

You can reset the menu by clicking the 'Reset the menu' text in the page.

However, the login/logout button will always be the first button in the menu. Because the login function is the main function of this project, so it ought to be in the menu anyway.

At the same time, you can also upload your JSON file, and the data inside will replace the origin JSON data obtained from the api.

## Unit Test

## FYI

The menu named buttonList is encapsulated into a component to make it more reuseable. In the future, if another page need that function module, it can directly import that component and use it.
