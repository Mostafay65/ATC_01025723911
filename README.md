# Areeb Technology Task

This project consists of two main parts:

-   **Frontend**: React (Vite, TailwindCSS)
-   **Backend**: Node.js (Express, MongoDB)

---

## Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or above recommended)
-   [npm](https://www.npmjs.com/) (comes with Node.js)
-   [Git](https://git-scm.com/) (optional, for cloning)

---

## Backend (API)

The backend is already deployed and available at:

```
https://areeb-technology-task.vercel.app
```

You do **not** need to run the backend locally unless you want to develop or test backend features.

---

## Frontend (React App)

### 1. Install dependencies

```bash
cd Areeb-Technology-Task-front
npm install
```

### 2. Configure environment variables

Create a file named `.env` in the `Areeb-Technology-Task-front` directory and add the following line:

```
VITE_BASE_HOST_URL=https://areeb-technology-task.vercel.app
```

This will make the frontend connect to the deployed backend.

### 3. Run the frontend locally

```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173)

---

## Notes

-   If you want to run the backend locally, you need to set up a MongoDB database and create a `.env` file in `Areeb-Technology-Task-back` with the required variables (e.g., `CONNECTION_STRING`).
-   By default, the frontend proxies API requests to the backend URL you set in the `.env` file.
-   For any issues, please open an issue or contact the maintainer.
