
# Express Book Library 📚

A simple yet powerful backend API for managing a book library. Built with **Express** and **TypeScript**.

---

## 🚀 Features

- **User Authentication**: Secure authentication using JWT and password hashing with bcrypt.
- **Book Management**: Add, update, delete, and view books in the library.
- **File Uploads**: Supports file handling (e.g., book covers) via `multer`.
- **Environment Variables**: Configurable via `dotenv` for flexible deployments.
- **Database Integration**: MySQL as the database, powered by `mysql2`.
- **Cross-Origin Resource Sharing (CORS)**: Enabled for safe API access.
- **Testing Suite**: Comprehensive tests with **Jest** and **Supertest**.

---

## 🛠️ Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v16+)
- **npm** or **yarn**
- **MySQL**

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/rizkidwik/express-book-library.git
   cd express-book-library
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file and define the following:
   ```plaintext
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=book_library
   JWT_SECRET=your_jwt_secret
   ```

4. Run the database migration script (if available) or set up your database schema.

---

## 🔧 Usage

### Development
Start the development server with live reload:
```bash
npm run dev
```

### Production
Build and start the project:
```bash
npm run build
npm start
```

### Testing
Run unit and integration tests:
```bash
npm run test -> On Development
```

---

## 🛡️ Technologies Used

- **Framework**: [Express](https://expressjs.com/)
- **Language**: TypeScript
- **Authentication**: JSON Web Tokens (JWT)
- **Database**: MySQL with `mysql2`
- **Testing**: Jest and Supertest
- **Environment Management**: dotenv
- **File Uploads**: Multer
