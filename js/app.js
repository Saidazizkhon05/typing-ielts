import { state } from './state.js';
import { DOM } from './dom.js';
import { setupEventListeners } from './events.js';
import { handleRoute } from './router.js';

async function init() {
    try {
        const response = await fetch('./data/ielts_essays.json');
        const data = await response.json();
        state.essays = data.essays;
        DOM.loadingOverlay.classList.add('hidden');
    } catch (error) {
        console.error("Failed to load IELTS essays:", error);
        DOM.loadingOverlay.classList.add('hidden');
    }
    
    setupEventListeners();
    handleRoute();
}

// Global router listener
window.addEventListener('hashchange', handleRoute);

// Start
window.addEventListener('load', init);
