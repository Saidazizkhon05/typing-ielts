import { state } from './state.js';
import { DOM } from './dom.js';
import { setupEventListeners } from './events.js';
import { handleRoute } from './router.js';
import { TASK1_CHARTS } from './task1-chart-data.js';

async function init() {
    try {
        const [essaysRes, task1Res] = await Promise.all([
            fetch('./data/ielts_essays.json'),
            fetch('./data/ielts_task1_reports.json'),
        ]);
        const essaysData = await essaysRes.json();
        const task1Data = await task1Res.json();
        state.essays = essaysData.essays;
        state.task1Reports = task1Data.reports.map(report => ({
            ...report,
            chart: TASK1_CHARTS[report.id] || null,
        }));
        DOM.loadingOverlay.classList.add('hidden');
    } catch (error) {
        console.error("Failed to load IELTS data:", error);
        DOM.loadingOverlay.classList.add('hidden');
    }
    
    setupEventListeners();
    handleRoute();
}

// Global router listener
window.addEventListener('hashchange', handleRoute);

// Start
window.addEventListener('load', init);
