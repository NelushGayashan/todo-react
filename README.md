# Todo App

This is a simple todo list app created with MySQL for the database and React for the frontend.

## Installation

- Clone the repository: `git clone https://github.com/NGFXavier/todo-app.git`
- Install dependencies: `yarn install`
- Set up the database:
  - Create the `todo_app` database.
  - Run the SQL script `todo_app.sql` to create the `tasks` table.
- Start the server: `yarn start`

## Usage

- Add a new task: Enter the task description in the input field and click the "Add Task" button.
- Mark a task as completed: Click the checkbox next to the task.
- Delete a task: Click the "Delete" button next to the task.

## Server API

The server is built using Express.js and connects to MySQL for storing and retrieving tasks. Below are the API endpoints:

- `GET /tasks`: Retrieves all tasks from the database.
- `POST /tasks`: Creates a new task with the provided description.
- `PUT /tasks/:id`: Updates the task with the specified ID.
- `DELETE /tasks/:id`: Deletes the task with the specified ID.

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/new-feature`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add new feature'`)
5. Push to the branch (`git push origin feature/new-feature`)
6. Create a new Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

![App Screenshot](https://github.com/NGFXavier/todo-react/assets/44164300/9ff55bc5-cce2-4ee5-9f5f-010a447fb55a)
