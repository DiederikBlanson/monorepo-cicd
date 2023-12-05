# Fullstack Application with GitHub Actions

## Node.js CI

This GitHub Actions workflow automates the Continuous Integration (CI) process for a fullstack application consisting of a frontend and backend, including database initialization and testing with Cypress, Jest, and Postman. The workflow is triggered on pull requests to the `main` branch.

### Workflow Structure:

#### **1. Database Initialization (initialize-db)**

- **Runs on:** `ubuntu-latest`
- **Outputs:** SQL_DB (Database name)
  
This job initializes the MySQL database based on the pull request branch name. It drops and recreates the database, executing necessary SQL scripts for structure and data initialization.

#### **2. Frontend Build (frontend-build)**

- **Runs on:** `ubuntu-latest`
- **Cache:** Node modules caching
- **Outputs:** 'build' folder artifact
  
This job checks out the frontend code, restores and caches node modules, installs dependencies, builds the frontend application, and saves the 'build' folder as an artifact.

#### **3. Backend Build (backend-build)**

- **Runs on:** `ubuntu-latest`
- **Cache:** Node modules caching
- **Outputs:** 'build' folder artifact
  
Similar to the frontend job, this one checks out the backend code, restores and caches node modules, installs dependencies, builds the backend application, and saves the 'build' folder as an artifact.

#### **4. Job Checker (job_checker)**

- **Runs on:** `ubuntu-latest`
- **Outputs:** frontend_changed, backend_changed, ci_index
  
This job determines whether changes have occurred in the frontend or backend directories. It also calculates the `ci_index` array for Cypress E2E testing.

#### **5. Cypress E2E Testing (cypress-e2e)**

- **Runs on:** `ubuntu-latest`
- **Needs:** backend-build, frontend-build, job_checker, initialize-db
- **Matrix:** E2E testing matrix for Cypress
  
This job downloads the frontend and backend build artifacts, restores node modules, starts the backend server, and runs Cypress E2E tests on the frontend, using a matrix for parallel testing.

#### **6. Frontend Unit Testing (frontend-unit-testing)**

- **Runs on:** `ubuntu-latest`
- **Needs:** frontend-build, job_checker
- **Condition:** Run only if frontend files have changed
  
This job restores node modules and performs unit testing using React-Testing Library if there are changes in the frontend code.

#### **7. Backend Postman Testing (backend-postman-testing)**

- **Runs on:** `ubuntu-latest`
- **Needs:** backend-build, initialize-db, job_checker
- **Condition:** Run only if backend files have changed
  
This job downloads the backend build artifact, restores node modules, starts the backend server, waits for the health check, and runs Postman API tests using the Newman action.

### Environment Variables:

- `SQL_HOST`, `SQL_PORT`, `SQL_USER`, `SQL_PASS`: MySQL database connection details.

### Secrets:

- `SQL_HOST`, `SQL_PORT`, `SQL_USER`, `SQL_PASS`: Secret values for database connection.
- (Note: Secrets should be set in the GitHub repository settings.)

### Important Notes:

- This workflow is designed to run on a Linux environment.
- Ensure that necessary secrets are set in the GitHub repository settings for proper database connection and testing.

Feel free to customize this workflow according to your application's specific requirements.
