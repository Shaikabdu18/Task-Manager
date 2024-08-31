const API_URL = 'http://localhost:3000/api/tasks';

document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskList = document.getElementById('taskList');
    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');
    const taskIdInput = document.getElementById('taskId');

    // Fetch and display tasks
    async function fetchTasks() {
        try {
            const response = await axios.get(API_URL);
            const tasks = response.data;
            taskList.innerHTML = tasks.map(task => `
                <li>
                    <span>${task.title} - ${task.description}</span>
                    <button onclick="editTask('${task._id}', '${task.title}', '${task.description}')">Edit</button>
                    <button class="delete" onclick="deleteTask('${task._id}')">Delete</button>
                </li>
            `).join('');
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    }

    // Add or update task
    taskForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const title = titleInput.value;
        const description = descriptionInput.value;
        const taskId = taskIdInput.value;

        try {
            if (taskId) {
                // Update task
                await axios.patch(`${API_URL}/${taskId}`, { title, description });
                taskIdInput.value = ''; // Clear task ID
            } else {
                // Create new task
                await axios.post(API_URL, { title, description });
            }
            titleInput.value = '';
            descriptionInput.value = '';
            fetchTasks(); // Refresh task list
        } catch (error) {
            console.error('Error saving task:', error);
        }
    });

    // Delete task
    window.deleteTask = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            fetchTasks(); // Refresh task list
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    // Edit task
    window.editTask = (id, title, description) => {
        titleInput.value = title;
        descriptionInput.value = description;
        taskIdInput.value = id;
    };

    fetchTasks(); // Initial fetch
});
