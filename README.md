# Bulletin Board
Bulletin board app created with **React**, **Redux** and **Material UI** framework.\
Application consists of posts list and detailed item view. It allows to add, edit and delete posts to logged in users.\
Backend in **Node.js** and **MongoDB** with Mongoose.\
Authentication and authorization with **Auth0** React SDK. \
Application compiles with **PWA** standard.

## Deployed on Heroku
https://still-stream-70087.herokuapp.com/ (**takes some time to load** because I use a free account) \
Uses Heroku ephemeral filesystem for uploads - that means that any changes to the filesystem whilst the dyno is running only last until that dyno is shut down or restarted. \
On every server restart database is populated with example posts.

## Run project locally
1. `yarn install`
2. run local mongo db with `mongod`
3. `yarn start-server` => you'll get built app at http://localhost:8000
4. `yarn start` => you'll get app in development mode at http://localhost:3000

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

