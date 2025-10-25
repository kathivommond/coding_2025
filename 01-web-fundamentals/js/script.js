// Minimal to-do app logic: state, form handling, rendering

(() => {
	/** In-memory state for tasks */
	const tasks = [];
	let editingTaskId = null;

	/** Cached DOM elements */
	const form = document.getElementById('task-form');
	const titleInput = document.getElementById('task-title');
	const detailsInput = document.getElementById('task-details');
	const taskList = document.getElementById('task-list');
	const submitButton = document.getElementById('add-task-button');

	/** Generate a semi-unique id for tasks */
	function generateTaskId() {
		return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
	}

	/** Format a readable timestamp */
	function formatTimestamp(date) {
		try {
			return new Intl.DateTimeFormat(undefined, {
				year: 'numeric',
				month: 'short',
				day: '2-digit',
				hour: '2-digit',
				minute: '2-digit'
			}).format(date);
		} catch (_) {
			return date.toLocaleString();
		}
	}

	/** Create a task object */
	function createTask(title, details) {
		return {
			id: generateTaskId(),
			title,
			details,
			completed: false,
			createdAt: new Date()
		};
	}

	/** Render all tasks */
	function renderTasks() {
		// Clear list
		while (taskList.firstChild) taskList.removeChild(taskList.firstChild);

		tasks.forEach(task => {
			const li = renderTaskItem(task);
			taskList.appendChild(li);
		});
	}

	/** Build a single task list item */
	function renderTaskItem(task) {
		const li = document.createElement('li');
		li.className = 'task-item';
		li.setAttribute('data-task-id', task.id);

		const wrapper = document.createElement('div');
		wrapper.className = 'task-row';
		wrapper.style.display = 'grid';
		wrapper.style.gridTemplateColumns = 'auto 1fr auto';
		wrapper.style.gap = '12px';
		li.appendChild(wrapper);

		// Checkbox
		const checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.className = 'task-checkbox';
		checkbox.checked = task.completed;
		checkbox.setAttribute('aria-label', 'Mark task complete');
		wrapper.appendChild(checkbox);

		// Content
		const content = document.createElement('div');
		content.className = 'task-content';
		wrapper.appendChild(content);

		const titleEl = document.createElement('h3');
		titleEl.className = 'task-title';
		titleEl.textContent = task.title;
		if (task.completed) titleEl.style.textDecoration = 'line-through';
		content.appendChild(titleEl);

		if (task.details && task.details.trim().length > 0) {
			const detailsEl = document.createElement('p');
			detailsEl.className = 'task-details';
			detailsEl.textContent = task.details;
			if (task.completed) detailsEl.style.opacity = '0.75';
			content.appendChild(detailsEl);
		}

		const meta = document.createElement('small');
		meta.className = 'task-meta';
		meta.textContent = `Added ${formatTimestamp(task.createdAt)}`;
		meta.style.color = 'var(--color-text-muted)';
		content.appendChild(meta);

		// Actions (Edit, Delete)
		const actions = document.createElement('div');
		actions.style.display = 'flex';
		actions.style.gap = '8px';
		wrapper.appendChild(actions);

		const editBtn = document.createElement('button');
		editBtn.className = 'btn task-edit';
		editBtn.type = 'button';
		editBtn.textContent = 'Edit';
		editBtn.setAttribute('aria-label', 'Edit task');
		actions.appendChild(editBtn);

		// Delete button
		const deleteBtn = document.createElement('button');
		deleteBtn.className = 'btn btn-danger task-delete';
		deleteBtn.type = 'button';
		deleteBtn.textContent = 'Delete';
		deleteBtn.setAttribute('aria-label', 'Delete task');
		actions.appendChild(deleteBtn);

		// Handlers
		checkbox.addEventListener('change', () => {
			task.completed = checkbox.checked;
			renderTasks();
		});

		editBtn.addEventListener('click', () => {
			// Populate form for editing
			titleInput.value = task.title;
			detailsInput.value = task.details || '';
			titleInput.focus();
			editingTaskId = task.id;
			submitButton.textContent = 'Update Task';
			submitButton.classList.add('is-editing');
		});

		deleteBtn.addEventListener('click', () => {
			const index = tasks.findIndex(t => t.id === task.id);
			if (index !== -1) {
				tasks.splice(index, 1);
				renderTasks();
			}
		});

		return li;
	}

	/** Form submission */
	form.addEventListener('submit', (event) => {
		event.preventDefault();

		const title = String(titleInput.value || '').trim();
		const details = String(detailsInput.value || '').trim();

		if (title.length === 0) {
			titleInput.focus();
			return;
		}

		if (editingTaskId) {
			const idx = tasks.findIndex(t => t.id === editingTaskId);
			if (idx !== -1) {
				tasks[idx].title = title;
				tasks[idx].details = details;
			}
			editingTaskId = null;
			submitButton.textContent = 'Add Task';
			submitButton.classList.remove('is-editing');
		} else {
			const newTask = createTask(title, details);
			tasks.unshift(newTask);
		}
		renderTasks();

		form.reset();
		titleInput.focus();
	});

	// Initial render (empty state)
	renderTasks();
})();
