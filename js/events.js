import { DOM } from './dom.js';
import { state } from './state.js';
import { navigate } from './router.js';
import { initTest, handleInput, handleKeydown } from './typing-engine.js';
import { updateCaretPosition } from './ui.js';

const TASK1_ONLY = ['overview'];
const TASK2_ONLY = ['conclusion'];

function updateParagraphOptionsUI() {
    const isRandom = state.ieltsTask === 'random';
    const isTask1 = state.ieltsTask === 'task1';

    DOM.paragraphOptions.classList.toggle('muted', isRandom);

    if (isRandom) {
        state.ieltsType = null;
        DOM.optionBtns.forEach(b => b.classList.remove('active'));
        return;
    }

    DOM.optionBtns.forEach(btn => {
        const type = btn.dataset.type;
        if (TASK1_ONLY.includes(type)) {
            btn.classList.toggle('hidden', !isTask1);
        } else if (TASK2_ONLY.includes(type)) {
            btn.classList.toggle('hidden', isTask1);
        }
    });

    if (state.ieltsType && ((isTask1 && TASK2_ONLY.includes(state.ieltsType)) || (!isTask1 && TASK1_ONLY.includes(state.ieltsType)))) {
        state.ieltsType = null;
        DOM.optionBtns.forEach(b => b.classList.remove('active'));
    }
}

function validateSetup() {
    if (state.mode === 'general') {
        DOM.startBtn.disabled = false;
    } else if (state.mode === 'ielts' && state.ieltsTask === 'random') {
        DOM.startBtn.disabled = false;
    } else if (state.mode === 'ielts' && state.ieltsType) {
        DOM.startBtn.disabled = false;
    } else {
        DOM.startBtn.disabled = true;
    }
}

export function setupEventListeners() {
    // Mode Selection
    DOM.modeCards.forEach(card => {
        card.addEventListener('click', () => {
            DOM.modeCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            state.mode = card.dataset.mode;

            if (state.mode === 'ielts') {
                DOM.ieltsOptions.classList.add('visible');
                updateParagraphOptionsUI();
                validateSetup();
            } else {
                DOM.ieltsOptions.classList.remove('visible');
                validateSetup();
            }
        });
    });

    // Task 1 / Task 2 / Random
    DOM.taskBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            DOM.taskBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.ieltsTask = btn.dataset.task;
            updateParagraphOptionsUI();
            validateSetup();
        });
    });

    // IELTS paragraph sub-options
    DOM.optionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            DOM.optionBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.ieltsType = btn.dataset.type;
            validateSetup();
        });
    });

    // Setup Navigation
    DOM.startBtn.addEventListener('click', () => {
        if (state.mode === 'general') navigate('/general');
        else if (state.mode === 'ielts' && state.ieltsTask === 'random') navigate('/ielts/random');
        else if (state.mode === 'ielts') navigate(`/ielts/${state.ieltsTask}/${state.ieltsType}`);
    });

    DOM.menuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        navigate('/');
    });
    DOM.navSetup.addEventListener('click', (e) => {
        e.preventDefault();
        navigate('/');
    });

    DOM.restartBtn.addEventListener('click', () => initTest(false));
    DOM.nextTypingBtn.addEventListener('click', () => initTest(true));
    DOM.repeatBtn.addEventListener('click', () => initTest(false));
    DOM.nextBtn.addEventListener('click', () => initTest(true));

    // Typing Events
    DOM.hiddenInput.addEventListener('input', handleInput);
    DOM.hiddenInput.addEventListener('keydown', handleKeydown);

    // Focus management
    document.addEventListener('click', (e) => {
        if (state.isActive && !state.isFinished && !DOM.resultsContainer.classList.contains('active')) {
            DOM.hiddenInput.focus();
        }
    });

    DOM.hiddenInput.addEventListener('blur', () => {
        if (state.isActive && !state.isFinished) {
            DOM.blurWarning.classList.remove('hidden');
            DOM.caret.classList.add('hidden');
        }
    });

    DOM.hiddenInput.addEventListener('focus', () => {
        DOM.blurWarning.classList.add('hidden');
        if (state.isActive && !state.isFinished) {
            DOM.caret.classList.remove('hidden');
        }
    });

    DOM.blurWarning.addEventListener('click', () => {
        DOM.hiddenInput.focus();
    });

    window.addEventListener('resize', updateCaretPosition);

    updateParagraphOptionsUI();
}
