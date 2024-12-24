The project consists of two main parts:

* **Frontend:** A React Native application for Android/iOS that displays the current game time on Symbiond.
* **Backend:** A Node.js server that calculates and broadcasts the current game time on Symbiond using Socket.IO.

## Installation

1. **Clone the repository:**
  ```bash
  git clone https://github.com/dbsymbiond/symbiond.git
  ```

2. **Install dependencies:**
  ```bash
  cd symbiond/frontend
  npm install
  ```
  ```bash
  cd ../backend
  npm install
  ```
  **Important Note:**
  The `admin` folder, which contains the code for the admin application, is not included in this public repository and is managed separately. This folder is listed in the `.gitignore` file to exclude it from version control.

3. **Configure environment variables:**
  * Create a `.env` file in the `frontend` directory.
  * Add the following line, replacing `your-server-ipv4-address` with the IPv4 address of your machine where the backend server is running:
    ```
    EXPO_PUBLIC_SERVER_IP=your-server-ipv4-address
    ```

## Running the App

1.  **Start the backend server:**
  ```bash
  cd symbiond/backend
  npm start
  ```

2.  **Start the frontend app:**
  ```bash
  cd symbiond/frontend
  npx expo start
  ```
    * Scan the QR code with your iOS or Android device to run the app in the Expo Go app.
    * Make sure your device is connected to the same Wi-Fi network as your development machine.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
  * For new features or major changes, branch from the `develop` branch: `git checkout -b my-new-feature origin/develop`
  * For small bug fixes or patches, branch from the `master` branch: `git checkout -b my-bug-fix origin/master` 
3. Make your changes and commit them with clear commit messages.  Use the following prefixes to categorize your commits:
  * `feat`:  New feature or functionality.
  * `fix`: Bug fix or correction.
  * `docs`:  Documentation changes.
  * `style`: Code style or formatting changes (e.g., indentation, spacing).
  * `refactor`: Code refactoring (no new features or bug fixes).
  * `perf`: Performance improvements.
  * `test`:  Adding or modifying tests.
  * `chore`:  Maintenance tasks or build-related changes.

  Example: `git commit -m "feat: Add new feature"` or `git commit -m "fix: Fix bug"`
4. Push your branch to your forked repository: `git push origin my-new-feature` or `git push origin my-bug-fix`

**Important: Before you create a PR, do the following:**
* Update the `version` field in the relevant `package.json` file(s) according to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
* Update the `CHANGELOG.md` file with the details of your changes.
  ```markdown
  ### Added

  - New feature or functionality.

  ### Changed

  - Modifications to existing features or functionality

  ### Deprecated

  - Features or functionality that will be removed in future releases.

  ### Removed

  - Features or functionality that have been removed.

  ### Fixed

  - Bug fixes or corrections.

  ### Security

  - Security-related changes or fixes.
  ```
* Make sure to run npm install to update relevant `package-lock.json` files(s)

5. Open a pull request from your branch to the appropriate target branch (`develop` for features, `master` for patches).
6. Provide a clear description of your changes in the pull request.

**Note:** The repository admin will create and push the tag after merging the pull request.
Please follow the code style and conventions of the project.