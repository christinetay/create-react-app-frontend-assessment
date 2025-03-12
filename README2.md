# HOW TO CREATE REACT APP BY CREATE-REACT-APP WITH STEPS BELOW

CREATE REACT APP IS AN OFFICIALLY SUPPORTED WAY TO CREATE SINGLE-PAGE APP REACT APPLICATIONS. HOWEVER, IT IS NOT LONGER SUPPORTED ON THE YEAR 14 FEBRUARY, 2025. <br/>
WE CAN STILL ABLE TO USE IT, BUT JUST NOT MORE SUPPORTED BY REACT TEAM. <br/>
THE BELOW ARE THE STEPS.

## 1. INSTALL PACKAGE BY CREATE-REACT-APP WITH THE TYPESCRIPT TEMPLATE AND NAMED IT AS FRONTEND-APP

Open CMD and execute the command as below.<br/>
`npx create-react-app frontend-app --template typescript`

## 2. NAVIGATE TO THE SELECTED FOLDER AND INSTALL DEPENDENCIES, THEN RUN THE APP.

Navigate to the frontend-app folder by the CMD command <br/>
`cd frontend-app`<br/>
Install all dependencies from package.json by the CMD command<br/>
`npm install`<br/>
Run the app by the CMD command<br/>
`npm start`

## 3. INSTALL TYPESCRIPT AND OTHER REACT RELATED PACKAGES

Open CMD and execute the command as below.<br/>
`npm install --save typescript @types/node @types/react @types/react-dom @types/jest`

## 4. INSTALL MORE NPM PACKAGES INTO THE APP

Add react-select for select dropdown element<br/>
`npm i --save react-select` <br/>
Add html-react-parser for parse HTML to React parser that works on both the server (Node.js) and the client (browser)<br/>
`npm i --save html-react-parser`<br/>
Add the font of source-sans-pro<br/>
`npm install @fontsource/source-sans-pro`<br/>
Add the font of opens-sans<br/>
`npm install @fontsource/opens-sans`

## 5. ADJUST THE FILES AFTER NPM PACKAGES INSTALLATION

a) Import font-awesome packages into index.tsx<br/>

```
import "@fontsource/source-sans-pro"; // Defaults to weight 400
import "@fontsource/source-sans-pro/400.css"; // Specify weight
import "@fontsource/source-sans-pro/400-italic.css"; // Specify weight and style
import "@fontsource/source-sans-pro/600.css"; // Specify weight
import "@fontsource/source-sans-pro/600-italic.css"; // Specify weight and style
import "@fontsource/open-sans"; // Defaults to weight 400
import "@fontsource/open-sans/400.css"; // Specify weight
import "@fontsource/open-sans/400-italic.css"; // Specify weight and style
import "@fontsource/open-sans/600.css"; // Specify weight
import "@fontsource/open-sans/600-italic.css"; // Specify weight and style
```

## 6. ADD ENVIRONMENT VARIABLES

The environment variables can be created in the steps below.<br/>
a) Create .env file<br/>
All environment variables must be prefixed with "REACT_APP\_" <br/>

```
REACT_APP_QUERY_RESULT_URL=https://gist.githubusercontent.com/.../queryResult.json
REACT_APP_SUGGESTION_URL=https://gist.githubusercontent.com/.../suggestion.json
```

b) Add files and related line of codes as below.
In react-app-env.d.ts file,
`/// <reference types="react-scripts" />`
In env.d.ts,

```
declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_QUERY_RESULT_URL: string
    REACT_APP_SUGGESTION_URL: string;
  }
}
```

c) Call environment variables in tsx files <br/>

```
const variableA = process.env.REACT_APP_QUERY_RESULT_URL;
```

## 7. RUN TESTING FEATURE INTO THE APP

CREATE-REACT-APP has built-in support for testing. The steps to execute testing as below.<br/>

a) Create a file end with example.test.tsx <br/>
`App.test.tsx`

b) Run test by CMD command<br/>
`npm run test` <br/>
