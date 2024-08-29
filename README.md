# Task Manager

A simple Node.js backend for managing tasks. This project provides a RESTful API to create, read, update, and delete tasks.

## Features

- **Create Tasks**: Add new tasks with details like title, description, and status.
- **Read Tasks**: Retrieve a list of tasks or a specific task by ID.
- **Update Tasks**: Modify the details of an existing task.
- **Delete Tasks**: Remove tasks from the system.

## Requirements

- Node.js (version 14 or later)
- MongoDB (version 4 or later)

## Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-URL>
   ```

2. **Navigate to the project directory**:
   ```bash
   cd task-manager
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Create a `.env` file**:
   - Create a `.env` file in the root directory and add your environment variables:
     ```
     MONGO_URI=<your-mongodb-connection-string>
     PORT=3000
     ```

5. **Start the server**:
   ```bash
   npm start
   ```
   - The server will start on `http://localhost:3000` by default.

## API Endpoints

- **POST /tasks**: Create a new task.
- **GET /tasks**: Retrieve all tasks.
- **GET /tasks/:id**: Retrieve a specific task by ID.
- **PUT /tasks/:id**: Update a task by ID.
- **DELETE /tasks/:id**: Delete a task by ID.

## Contributing

1. **Fork the repository**.
2. **Create a new branch**:
   ```bash
   git checkout -b feature/your-feature
   ```
3. **Commit your changes**:
   ```bash
   git add .
   git commit -m "Add your feature description"
   ```
4. **Push to the branch**:
   ```bash
   git push origin feature/your-feature
   ```
5. **Create a pull request**.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Express](https://expressjs.com/) - The web framework used.
- [Mongoose](https://mongoosejs.com/) - MongoDB object modeling tool.

---
