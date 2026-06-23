import { state } from './state.js';
import { DOM } from './dom.js';
import { stopTimer, startTest } from './typing-engine.js';

const TASK1_TYPES = ['introduction', 'overview', 'body1', 'body2'];
const TASK2_TYPES = ['introduction', 'body1', 'body2', 'conclusion'];

export function showSetup() {
    stopTimer();
    DOM.setupContainer.style.display = 'flex';
    DOM.typingContainer.classList.remove('active');
    DOM.resultsContainer.classList.remove('active');
    state.isActive = false;
}

function startIeltsTest(task, type) {
    state.mode = 'ielts';
    state.ieltsTask = task;
    state.ieltsType = type;
    startTest();
}

export function handleRoute() {
    const hash = window.location.hash.replace('#', '');

    if (hash === '/general') {
        state.mode = 'general';
        state.ieltsType = null;
        startTest();
    } else if (hash.startsWith('/ielts/')) {
        const parts = hash.split('/').filter(Boolean);

        // /ielts/random
        if (parts.length === 2 && parts[1] === 'random') {
            startIeltsTest('random', null);
            return;
        }

        // /ielts/task1/overview or /ielts/task2/introduction
        if (parts.length === 3 && (parts[1] === 'task1' || parts[1] === 'task2')) {
            const task = parts[1];
            const type = parts[2];
            const validTypes = task === 'task1' ? TASK1_TYPES : TASK2_TYPES;
            if (validTypes.includes(type)) {
                startIeltsTest(task, type);
                return;
            }
        }

        // Legacy: /ielts/introduction (defaults to Task 2)
        if (parts.length === 2 && TASK2_TYPES.includes(parts[1])) {
            startIeltsTest('task2', parts[1]);
            return;
        }

        showSetup();
    } else {
        showSetup();
    }
}

export function navigate(path) {
    window.location.hash = path;
}
