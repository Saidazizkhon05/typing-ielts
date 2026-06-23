import { state } from './state.js';
import { DOM } from './dom.js';
import { stopTimer, startTest } from './typing-engine.js';

export function showSetup() {
    stopTimer();
    DOM.setupContainer.style.display = 'flex';
    DOM.typingContainer.classList.remove('active');
    DOM.resultsContainer.classList.remove('active');
    state.isActive = false;
}

export function handleRoute() {
    const hash = window.location.hash.replace('#', '');
    
    if (hash === '/general') {
        state.mode = 'general';
        state.ieltsType = null;
        startTest();
    } else if (hash.startsWith('/ielts/')) {
        const type = hash.split('/')[2];
        const validTypes = ['random', 'introduction', 'body1', 'body2', 'conclusion'];
        if (validTypes.includes(type)) {
            state.mode = 'ielts';
            state.ieltsType = type;
            startTest();
        } else {
            showSetup();
        }
    } else {
        showSetup();
    }
}

export function navigate(path) {
    window.location.hash = path;
}

