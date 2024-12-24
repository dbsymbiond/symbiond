The project consists of two main parts:

* **Frontend:** A React Native application for Android/iOS that displays the current game time on Symbiond.
* **Backend:** A Node.js server that calculates and broadcasts the current game time on Symbiond using Socket.IO.

## Installation

1. **Clone the repository:**
  ```bash
  git clone
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