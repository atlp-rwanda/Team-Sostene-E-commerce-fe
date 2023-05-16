# Team-Sostene-E-commerce-fe

[![CircleCI](https://dl.circleci.com/status-badge/img/gh/atlp-rwanda/Team-Sostene-E-commerce-fe/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/atlp-rwanda/Team-Sostene-E-commerce-fe/tree/main) [![Maintainability](https://api.codeclimate.com/v1/badges/f0a52dd547c57cd95108/maintainability)](https://codeclimate.com/github/atlp-rwanda/Team-Sostene-E-commerce-fe/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/f0a52dd547c57cd95108/test_coverage)](https://codeclimate.com/github/atlp-rwanda/Team-Sostene-E-commerce-fe/test_coverage)

This is a basic template for building a React application using Webpack and Babel. It provides a simple setup for bundling and transpiling your React code.

## Features

- React for building user interfaces
- Webpack for bundling the application
- Babel for transpiling modern JavaScript syntax
- Hot module replacement for live reloading during development
- ESLint and Prettier for code linting and formatting

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Getting Started

1. Clone the repository:
bash:
   ```
   git clone https://github.com/your-username/webpack-react-babel-app.git

   ```
2. cd webpack-react-babel-app
3. npm install
4. npm start
- Then the app will be auto-Launched to [http://localhost:8080/](http://localhost:8080/)

## Folder structure

The project structure is organized as follows:

- src: Contains the source code for your React application.
    - components: all components of the app and each is inside its folder with the name of component functionality.
    - index.js: to holder all the app components and render them inside root id in html file found in /public folder
- public: Contains the static assets such as images, fonts, and svgs icons that would be downloaded from Figma design and the HTML template file.
- dist: Contains the bundled and optimized files generated during the production build.
- styles: this folder only contains globals.css that will be change to .scss, and some sass mixins, and variables that will be used in the project, plus fonts.css to configure the font-family we will use in the project.
- ![image](https://github.com/atlp-rwanda/Team-Sostene-E-commerce-fe/assets/91186046/310e5220-d386-4613-af63-64546d8a2909)


## Configuration
- Webpack configuration: webpack.config.js
- Babel configuration: .babelrc
- ESLint configuration: .eslintrc.js
- Prettier configuration: .prettierrc

## Contributing
Contributions are welcome! If you find any issues or want to enhance the template, feel free to create a pull request.

## License
This project is licensed under the [MIT License](https://opensource.org/license/mit/).
