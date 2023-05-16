
# Team-Sostene-E-commerce-fe :shopping_cart:
[![CircleCI](https://dl.circleci.com/status-badge/img/gh/atlp-rwanda/Team-Sostene-E-commerce-fe/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/atlp-rwanda/Team-Sostene-E-commerce-fe/tree/main) [![Maintainability](https://api.codeclimate.com/v1/badges/f0a52dd547c57cd95108/maintainability)](https://codeclimate.com/github/atlp-rwanda/Team-Sostene-E-commerce-fe/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/f0a52dd547c57cd95108/test_coverage)](https://codeclimate.com/github/atlp-rwanda/Team-Sostene-E-commerce-fe/test_coverage)  

This frontend component of an e-commerce application, developed with the PERN stack (PostgreSQL, Express.js, React, Node.js) :four_leaf_clover: , provides a user interface to interact with the e-commerce platform.

## Description :memo:

The e-commerce frontend is developed using React with TypeScript and utilizes Vite as the build tool. It provides a responsive user interface and user experience. Through API integration, the frontend communicates seamlessly with the backend, facilitating efficient data retrieval and enabling essential functionalities.

The project follows a well-structured and modular architecture, with separate components for different parts of the application. This promotes code reusability and maintainability, allowing for easy extension and enhancement of features.

#### The key features of the frontend include:

- Displaying a catalog of products with details such as name, price, and image.
- Allowing users to search for products based on keywords and price ranges.
- Adding products to the shopping cart and updating quantities.
- Updating the cart total dynamically.
- Allowing buyers to remove items from the cart.
- Adding and removing products from the buyer's wishlist.
- Allow buyer to review products.
- User authentication and registration.
- Update and reset their password.
- User can edit their profile.
- Two factor authentication for sellers.
- Placing orders and handling the checkout process.
- Allow sellers to create and delete collections.
- Allow sellers to add, update, and delete product from a collection.
- Chat app for users.
- User can receive notifications and mark them as read.
- Admin dashboard for administration.

## Setup :point_down:

### Getting started 

To get started with the frontend, follow the steps below:

1. Clone the repository: `git clone https://github.com/atlp-rwanda/Team-Sostene-E-commerce-fe.git`
2. Navigate to the project directory: `cd Team-Sostene-E-commerce-fe`
3. Install dependencies: `yarn install`
5. Start the development server: `yarn run dev`

The application will be accessible at `http://localhost:5173` in your browser.

### Building for Production

- Run the build script: `yarn run build`

   This will create a dist folder. This is where the production build will be. 

- To preview the production build run `yarn run preview`.

    The production build preview will be accessible at `http://localhost:4173` by default.

- To lint the source code with ESLint run `yarn run lint`.

### Testing :test_tube:

The e-commerce frontend includes a comprehensive test suite to ensure the reliability and correctness of the code. The tests are written using the Jest testing framework and React Testing Library for testing React components.

To run the tests, execute the following command:

```bash
yarn run test
```

This will run all the tests and provide a summary of the test results.


### Dependencies :package:

The frontend has the following key dependencies:

- React :atom_symbol: : JavaScript library for building user interfaces.
- TypeScript :sauropod: : Superset of JavaScript that adds type safety.
- Vite :zap: : Build tool that provides a fast and optimized development experience.

The project's package.json file contains a complete list of all dependencies and their respective versions.

#### Dependencies

- **React DOM**: A package that provides DOM-specific methods for React.
- **React Router**: A routing library for handling navigation within the application.
- **Redux**: A predictable state container for managing global application state.
- **Redux Thunk**: A middleware for handling asynchronous actions in Redux.

#### Dev dependencies

The following dev dependencies are used for the development environment:

- **@types/react**: TypeScript type definitions for React.
- **@types/react-dom**: TypeScript type definitions for React DOM.
- **@typescript-eslint/eslint-plugin**: ESLint plugin for TypeScript.
- **@typescript-eslint/parser**: ESLint parser for TypeScript.
- **@vitejs/plugin-react**: Vite plugin for React integration.
- **eslint**: A pluggable JavaScript linter.
- **eslint-plugin-react-hooks**: ESLint plugin for enforcing React Hooks rules.
- **eslint-plugin-react-refresh**: ESLint plugin for React Refresh integration.

### Configuration

- ESLint configuration: `.eslintrc.cjs`
- Prettier configuration: `.prettierrc`
- TypeScript configuration: `tsconfig.json`
- Vite configuration: `vite.config.ts`

## Deployment :ship:

[Deployed Link](https://team-sostene-e-commerce-fe.vercel.app/)

To deploy the frontend using Vercel, the following these steps were taken and progress:

1. Visited [Vercel](https://vercel.com/).

2. **Connect the frontend repository to Vercel:**
- Chose a name for the project.
- On the Vercel dashboard, added a New Project imported from GitHub.
- Selected GitHub and authenticated.
- Chose the repository that contains the frontend code.

3. **Configure the project settings:**

- Selected the branch to deploy which the repo's default branch .
- Specified the build command as yarn run build.

4. **Configure environment variables:**

- Added environment variables (e.g., API endpoints or secrets) in the Vercel project settings. 

5. **Initial deployment:**

- Once the project is connected and configured, Vercel automatically triggers an initial build and deploy the frontend based on the specified settings.
- Wait for the deployment to complete, and Vercel provided a unique URL for the deployed application.

6. **Automatic deployments:**

- Vercel continuously monitors the connected repository for changes.
- Whenever new codes are pushed to the repository's branch selected for deployment, Vercel will automatically detect the changes and trigger a new deployment.
- The new deployment will incorporate the updated code and build a new version of the frontend application.

7. **Code updates take effect:**

- Wait for the new deployment to complete.
- Once the deployment is finished, Vercel will update the URL of the deployed frontend application.
- Visit the provided URL to see the changes reflected in the deployed application.

## Contribute :art:

Contributions are welcome from team members! 

    To contribute, create a pull request to the develop branch.


## License :card_index:

This project is licensed under the [MIT License](https://opensource.org/license/mit/).
