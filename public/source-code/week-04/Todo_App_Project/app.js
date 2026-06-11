/* ===================================================
   TaskFlow — App Logic
   Full-featured To-Do with localStorage persistence,
   priority system, filters, and micro-interactions
   =================================================== */

(function () {
    'use strict';

    // ── DOM References ──
    const taskInput = document.getElementById('task-input');
    const addBtn = document.getElementById('add-btn');
    const taskList = document.getElementById('task-list');
    const emptyState = document.getElementById('empty-state');
    const footerActions = document.getElementById('footer-actions');
    const clearCompletedBtn = document.getElementById('clear-completed');
    const itemsLeft = document.getElementById('items-left');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const filterIndicator = document.getElementById('filter-indicator');
    const priorityBtns = document.querySelectorAll('.priority-btn');
    const toastContainer = document.getElementById('toast-container');
    const particlesContainer = document.getElementById('particles');

    // Stats
    const statTotal = document.querySelector('#stat-total .stat-number');
    const statActive = document.querySelector('#stat-active .stat-number');
    const statDone = document.querySelector('#stat-done .stat-number');
    const progressFill = document.getElementById('progress-fill');
    const progressGlow = document.getElementById('progress-glow');
    const progressPercent = document.getElementById('progress-percent');

    // ── State ──
    let tasks = [];
    let currentFilter = 'all';
    let selectedPriority = 'low';

    // ── LocalStorage ──
    const STORAGE_KEY = 'taskflow_tasks';

    function saveTasks() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }

    function loadTasks() {
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            tasks = data ? JSON.parse(data) : [];
        } catch {
            tasks = [];
        }
    }

    // ── Task CRUD ──
    function createTask(text, priority) {
        return {
            id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
            text: text.trim(),
            completed: false,
            priority: priority || 'low',
            createdAt: new Date().toISOString(),
        };
    }

    function addTask() {
        const text = taskInput.value.trim();
        if (!text) {
            taskInput.focus();
            shakeElement(taskInput.closest('.input-wrapper'));
            return;
        }

        const task = createTask(text, selectedPriority);
        tasks.unshift(task);
        saveTasks();
        taskInput.value = '';
        taskInput.focus();
        renderTasks();
        showToast('Task added!', 'success');
    }

    function deleteTask(id) {
        const el = document.querySelector(`[data-task-id="${id}"]`);
        if (el) {
            el.classList.add('removing');
            el.addEventListener('animationend', () => {
                tasks = tasks.filter(t => t.id !== id);
                saveTasks();
                renderTasks();
            }, { once: true });
        } else {
            tasks = tasks.filter(t => t.id !== id);
            saveTasks();
            renderTasks();
        }
        showToast('Task removed', 'info');
    }

    function toggleTask(id) {
        const task = tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
            if (task.completed) {
                showToast('Nice work! ✨', 'success');
            }
        }
    }

    function clearCompleted() {
        const count = tasks.filter(t => t.completed).length;
        if (count === 0) {
            showToast('No completed tasks to clear', 'warning');
            return;
        }
        tasks = tasks.filter(t => !t.completed);
        saveTasks();
        renderTasks();
        showToast(`Cleared ${count} task${count > 1 ? 's' : ''}`, 'info');
    }

    // ── Rendering ──
    function getFilteredTasks() {
        switch (currentFilter) {
            case 'active': return tasks.filter(t => !t.completed);
            case 'completed': return tasks.filter(t => t.completed);
            default: return tasks;
        }
    }

    function formatTime(isoString) {
        const date = new Date(isoString);
        const now = new Date();
        const diff = now - date;
        const mins = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (mins < 1) return 'Just now';
        if (mins < 60) return `${mins}m ago`;
        if (hours < 24) return `${hours}h ago`;
        if (days < 7) return `${days}d ago`;
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }

    function renderTasks() {
        const filtered = getFilteredTasks();
        taskList.innerHTML = '';

        if (filtered.length === 0) {
            emptyState.style.display = 'flex';
            taskList.style.display = 'none';
        } else {
            emptyState.style.display = 'none';
            taskList.style.display = 'flex';

            filtered.forEach((task, index) => {
                const li = document.createElement('li');
                li.className = `task-item priority-${task.priority}${task.completed ? ' completed' : ''}`;
                li.dataset.taskId = task.id;
                li.style.animationDelay = `${index * 0.04}s`;

                li.innerHTML = `
                    <label class="task-checkbox">
                        <input type="checkbox" ${task.completed ? 'checked' : ''} aria-label="Toggle task completion">
                        <span class="checkbox-visual">
                            <svg viewBox="0 0 12 12" fill="none">
                                <path d="M2.5 6l2.5 2.5 4.5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </span>
                    </label>
                    <div class="task-content">
                        <span class="task-text">${escapeHTML(task.text)}</span>
                        <div class="task-meta">
                            <span class="task-time">${formatTime(task.createdAt)}</span>
                            <span class="task-priority-label ${task.priority}">${task.priority}</span>
                        </div>
                    </div>
                    <button class="task-delete" title="Delete task" aria-label="Delete task">
                        <svg viewBox="0 0 16 16" fill="none">
                            <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                        </svg>
                    </button>
                `;

                // Events
                const checkbox = li.querySelector('input[type="checkbox"]');
                checkbox.addEventListener('change', () => toggleTask(task.id));

                const deleteBtn = li.querySelector('.task-delete');
                deleteBtn.addEventListener('click', () => deleteTask(task.id));

                taskList.appendChild(li);
            });
        }

        updateStats();
    }

    function updateStats() {
        const total = tasks.length;
        const completed = tasks.filter(t => t.completed).length;
        const active = total - completed;
        const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

        // Animate numbers
        animateNumber(statTotal, total);
        animateNumber(statActive, active);
        animateNumber(statDone, completed);

        // Progress bar
        progressFill.style.width = `${percent}%`;
        progressGlow.style.width = `${percent}%`;
        progressPercent.textContent = `${percent}%`;

        // Items left
        itemsLeft.textContent = `${active} item${active !== 1 ? 's' : ''} left`;

        // Show/hide footer
        footerActions.style.display = total > 0 ? 'flex' : 'none';
    }

    function animateNumber(element, target) {
        const current = parseInt(element.textContent) || 0;
        if (current === target) return;

        const duration = 300;
        const start = performance.now();

        function step(timestamp) {
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            element.textContent = Math.round(current + (target - current) * eased);
            if (progress < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
    }

    // ── Filters ──
    function setFilter(filter) {
        currentFilter = filter;

        filterBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });

        // Move indicator
        const activeBtn = document.querySelector(`.filter-btn[data-filter="${filter}"]`);
        if (activeBtn && filterIndicator) {
            const tabsRect = activeBtn.parentElement.getBoundingClientRect();
            const btnRect = activeBtn.getBoundingClientRect();
            filterIndicator.style.left = `${btnRect.left - tabsRect.left}px`;
            filterIndicator.style.width = `${btnRect.width}px`;
        }

        renderTasks();
    }

    // ── Priority ──
    function setPriority(priority) {
        selectedPriority = priority;
        priorityBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.priority === priority);
        });
    }

    // ── Toast Notifications ──
    function showToast(message, type = 'info') {
        const icons = {
            success: '<svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M7 10l2 2 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
            info: '<svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M10 9v4M10 7v.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
            warning: '<svg viewBox="0 0 20 20" fill="none"><path d="M10 3L2 17h16L10 3z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M10 11V8M10 14v.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
        };

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <span class="toast-icon">${icons[type] || icons.info}</span>
            <span>${message}</span>
        `;

        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('toast-out');
            toast.addEventListener('animationend', () => toast.remove(), { once: true });
        }, 2500);
    }

    // ── Helpers ──
    function escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function shakeElement(el) {
        el.style.animation = 'none';
        el.offsetHeight; // force reflow
        el.style.animation = 'shake 0.4s ease';
        el.addEventListener('animationend', () => {
            el.style.animation = '';
        }, { once: true });
    }

    // Add shake keyframes dynamically
    const shakeStyle = document.createElement('style');
    shakeStyle.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20% { transform: translateX(-6px); }
            40% { transform: translateX(6px); }
            60% { transform: translateX(-4px); }
            80% { transform: translateX(4px); }
        }
    `;
    document.head.appendChild(shakeStyle);

    // ── Particles ──
    function createParticles() {
        const count = 25;
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDuration = `${8 + Math.random() * 12}s`;
            particle.style.animationDelay = `${Math.random() * 10}s`;
            particle.style.width = `${2 + Math.random() * 3}px`;
            particle.style.height = particle.style.width;
            particle.style.opacity = `${0.1 + Math.random() * 0.3}`;
            particlesContainer.appendChild(particle);
        }
    }

    // ── Keyboard Shortcuts ──
    function handleKeyboard(e) {
        if (e.key === 'Enter' && document.activeElement === taskInput) {
            e.preventDefault();
            addTask();
        }
    }

    // ── Event Listeners ──
    function init() {
        loadTasks();
        createParticles();

        // Render
        renderTasks();
        setFilter('all');

        // Add task
        addBtn.addEventListener('click', addTask);
        document.addEventListener('keydown', handleKeyboard);

        // Filters
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => setFilter(btn.dataset.filter));
        });

        // Priority
        priorityBtns.forEach(btn => {
            btn.addEventListener('click', () => setPriority(btn.dataset.priority));
        });

        // Clear completed
        clearCompletedBtn.addEventListener('click', clearCompleted);

        // Initial filter indicator position
        requestAnimationFrame(() => setFilter('all'));

        console.log('%c🚀 TaskFlow loaded!', 'color: #7c3aed; font-size: 14px; font-weight: bold;');
    }

    // ── Boot ──
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
