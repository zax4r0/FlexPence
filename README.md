## 🚀 React Native Expo Setup Guide

### 📋 Prerequisites

Ensure that you have the following software installed on your system:

1. **Node.js**: 🟢 JavaScript runtime.
2. **pnpm**: 🚀 Fast, disk space-efficient package manager.
3. **OpenJDK 21**: ☕ Required for Android development.
4. **Android Studio**: 🛠️ Development environment for Android apps.

---

### Step 1: Install Node.js 🟢

Node.js is essential for running JavaScript code and managing npm packages.

- **Download Node.js**: ⬇️

  Go to the [Node.js download page](https://nodejs.org/) 🌐 and download the LTS version for your operating system.

- **Install Node.js**: 💻

  Follow the installation instructions for your platform:

  - **Windows** 🪟: Run the downloaded installer and follow the instructions. 🛠️
  - **macOS** 🍏: Open the `.pkg` file and follow the installation steps. 📂
  - **Linux** 🐧: Use your package manager to install Node.js, e.g., `apt`, `dnf`, or `yum`. 📦

- **Verify Installation**: 🔍

  Open a terminal and run:

  ```bash
  node -v
  ```

  You should see the version number of Node.js. ✔️

---

### Step 2: Install pnpm 📦

pnpm is a fast and efficient package manager that uses symlinks to save disk space. 🗃️

- **Install pnpm globally**: 🌐

  ```bash
  npm install -g pnpm
  ```

- **Verify Installation**: 🔍

  Run the following command to verify the installation:

  ```bash
  pnpm -v
  ```

  You should see the version number of pnpm. ✔️

---

### Step 3: Install OpenJDK 21 ☕

The Java Development Kit (JDK) is required for Android development. We'll use OpenJDK 21.

- **Install OpenJDK 21**: 📥

  #### Windows 🪟

  - **Using a package manager like Chocolatey**: 🍫

    ```bash
    choco install openjdk --version=21
    ```

  - **Manual Installation**: 🔧

    1. Download the [OpenJDK 21 Windows installer](https://jdk.java.net/21/). 🌐
    2. Run the installer and follow the on-screen instructions. 🛠️

  #### macOS 🍏

  - **Using Homebrew**: 🍺

    ```bash
    brew install openjdk@21
    ```

  - **Manual Installation**: 🔧

    1. Download the [OpenJDK 21 macOS package](https://jdk.java.net/21/). 🌐
    2. Open the `.dmg` file and follow the installation steps. 📂

  #### Linux 🐧

  - **Using APT (Debian/Ubuntu)**: 📦

    ```bash
    sudo apt update
    sudo apt install openjdk-21-jdk
    ```

  - **Using DNF (Fedora)**: 🐜

    ```bash
    sudo dnf install java-21-openjdk
    ```

  - **Using YUM (CentOS/RHEL)**: 🍰

    ```bash
    sudo yum install java-21-openjdk
    ```

- **Set JAVA_HOME Environment Variable**: 🔧

  Ensure that the `JAVA_HOME` environment variable is set correctly.

  - **Windows** 🪟:

    ```bash
    setx JAVA_HOME "C:\Program Files\OpenJDK\jdk-21"
    ```

  - **macOS/Linux** 🍏🐧:

    Add the following line to your `~/.bashrc`, `~/.bash_profile`, or `~/.zshrc` file:

    ```bash
    export JAVA_HOME=$(/usr/libexec/java_home -v 21)
    ```

    For Linux, find the installation path using `update-alternatives --config java` and set `JAVA_HOME`:

    ```bash
    export JAVA_HOME=/usr/lib/jvm/java-21-openjdk
    ```

- **Verify Installation**: 🔍

  Open a terminal and run:

  ```bash
  java -version
  ```

  You should see the version number of OpenJDK 21. ✔️

---

### Step 4: Install Android Studio 🛠️

Android Studio is required for running your React Native app on an Android emulator or device.

- **Download and Install Android Studio**: ⬇️

  Visit the [Android Studio download page](https://developer.android.com/studio) 🌐 and download the appropriate version for your operating system. Follow the installation instructions. 📥

- **Set Up Android SDK**: 🔧

  1. **Open Android Studio** 🛠️ and follow the setup wizard. 🧙‍♂️
  2. **Install Android SDK**: 📚
     - Open **Android Studio**. 🖥️
     - Go to **Preferences** (on macOS) 🍏 or **File > Settings** (on Windows/Linux) 🪟🐧.
     - Navigate to **Appearance & Behavior > System Settings > Android SDK**. 🛠️
     - Install the recommended SDK platforms and tools. 🛠️
  3. **Add Android SDK to PATH**: 🔗
     - Find the SDK path under the **Android SDK Location**. 🗺️
     - Add the following directories to your `PATH` environment variable: 🌐
       - `<SDK_PATH>/platform-tools`
       - `<SDK_PATH>/tools`

- **Verify Installation**: 🔍

  Open a terminal and run:

  ```bash
  adb --version
  ```

  This should display the Android Debug Bridge version if set up correctly. ✔️

---

### Step 5: Clone the Repository 📂

Clone the existing React Native project repository to your local machine. 🖥️

- **Clone the repository**: 📥

  Replace `<repository-url>` with the URL of your repository. 🌐

  ```bash
  git clone <repository-url>
  ```

- **Navigate to the project directory**: 📁

  ```bash
  cd <repository-directory>
  ```

---

### Step 6: Install Project Dependencies 📦

Use pnpm to install the project dependencies. 🛠️

- **Install dependencies**: ⏬

  ```bash
  pnpm install
  ```

---

### Step 7: Run the React Native Project on Android 📱

You can use Expo CLI to run your project on an Android device or emulator. 🤖

- **Start the Expo server**: 🏁

  ```bash
  npx expo start
  ```

- **Run the app on Android**: 📱

  Ensure your Android emulator is running from Android Studio or connect your Android device via USB (enable USB debugging on your device). Then, use the following command: 🔌

  ```bash
  npx expo run:android
  ```

---

### 🛠️ Troubleshooting

- **Metro Bundler Issues**: 🚧
  - If Metro Bundler fails to start, try clearing the cache: 🧹

    ```bash
    npx expo start -c
    ```

- **Android Emulator Issues**: 📱
  - Ensure the emulator is running and connected properly: 🔌

    ```bash
    adb devices
    ```

  - Restart the emulator or Android Studio if issues persist. 🔄

---

Feel free to modify this guide to suit your specific project requirements or to add additional steps as needed. If you encounter any issues, refer to the official documentation 📚 or reach out to the community for support! 🤝

---
