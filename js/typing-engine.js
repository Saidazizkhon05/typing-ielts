import { DOM } from './dom.js';
import { state } from './state.js';
import { generateGeneralText, generateIELTStext } from './text-generator.js';
import { renderWords, updateWordDOM, updateCaretPosition, updateLiveStats, resetTypingScroll } from './ui.js';
import { calculateStats } from './utils.js';
import { updateTask1ChartPanel } from './task1-charts.js';

export function startTimer() {
    state.startTime = Date.now();
    state.timerInterval = setInterval(updateLiveStats, 1000);
}

export function stopTimer() {
    if (state.timerInterval) {
        clearInterval(state.timerInterval);
        state.timerInterval = null;
    }
}

export function startTest() {
    initTest(true);
}

export function initTest(newText = true) {
    stopTimer();
    
    if (newText) {
        state.currentEssay = null;
        if (state.mode === 'general') {
            state.currentText = generateGeneralText(30);
        } else {
            state.currentText = generateIELTStext();
        }
    }
    
    // Update UI Header
    if (state.mode === 'ielts' && state.currentEssay) {
        DOM.textInfo.classList.remove('hidden');
        const taskLabel = state.currentEssay.ieltsTask === 'task1' ? 'Task 1' : 'Task 2';
        DOM.infoTask.textContent = taskLabel;
        const typeLabels = {
            introduction: 'Introduction',
            overview: 'Overview',
            body1: 'Body 1',
            body2: 'Body 2',
            conclusion: 'Conclusion',
            random: state.currentEssay.selectedType,
        };
        DOM.infoType.textContent = typeLabels[state.currentEssay.selectedType] || state.currentEssay.selectedType;
        DOM.infoTopic.textContent = `Topic: ${state.currentEssay.topic}`;
        updateTask1ChartPanel(DOM.task1ChartPanel, DOM.task1Chart, state.currentEssay);
    } else {
        DOM.textInfo.classList.add('hidden');
        updateTask1ChartPanel(DOM.task1ChartPanel, DOM.task1Chart, null);
    }
    
    // Switch Views
    DOM.setupContainer.style.display = 'none';
    DOM.resultsContainer.classList.remove('active');
    DOM.typingContainer.classList.add('active');
    
    // Clean text: remove multiple spaces, newlines, etc.
    state.currentText = state.currentText.replace(/\s+/g, ' ').trim();
    
    state.words = state.currentText.split(' ');
    state.currentWordIndex = 0;
    state.currentCharIndex = 0;
    state.stats = { correctChars: 0, incorrectChars: 0, timeElapsed: 0 };
    state.isActive = true;
    state.isFinished = false;
    state.startTime = null;
    
    DOM.hiddenInput.value = '';
    DOM.liveWpm.textContent = '0';
    DOM.liveAcc.textContent = '100%';
    DOM.liveTime.textContent = '0s';
    
    // Reset scroll
    resetTypingScroll();
    
    renderWords();
    updateCaretPosition();
    DOM.hiddenInput.focus();
}

export function handleInput(e) {
    if (!state.isActive || state.isFinished) return;
    
    if (!state.startTime) {
        startTimer();
    }
    
    const inputValue = DOM.hiddenInput.value;
    const currentWordObj = state.wordElements[state.currentWordIndex];
    const targetWord = state.words[state.currentWordIndex];
    
    // Space typed - move to next word
    if (inputValue.endsWith(' ')) {
        if (inputValue.trim().length > 0 || state.currentCharIndex > 0) {
            state.currentWordIndex++;
            state.currentCharIndex = 0;
            DOM.hiddenInput.value = '';
            
            // Check if test is finished
            if (state.currentWordIndex >= state.words.length) {
                finishTest();
                return;
            }
        } else {
            // Prevent multiple spaces
            DOM.hiddenInput.value = inputValue.trim();
        }
    } else {
        // Typing characters
        state.currentCharIndex = inputValue.length;
        currentWordObj.typed = inputValue;
        
        // Update DOM for current word
        updateWordDOM(currentWordObj, targetWord, inputValue);
        
        // Check if last word is fully typed correctly
        if (state.currentWordIndex === state.words.length - 1 && inputValue === targetWord) {
            finishTest();
            return;
        }
    }
    
    updateCaretPosition();
}

export function handleKeydown(e) {
    if (!state.isActive || state.isFinished) return;
    
    // Handle backspace across words
    if (e.key === 'Backspace' && DOM.hiddenInput.value === '' && state.currentWordIndex > 0) {
        state.currentWordIndex--;
        const prevWordObj = state.wordElements[state.currentWordIndex];
        DOM.hiddenInput.value = prevWordObj.typed;
        state.currentCharIndex = DOM.hiddenInput.value.length;
        updateCaretPosition();
        e.preventDefault();
    }
}

export function finishTest() {
    state.isFinished = true;
    state.isActive = false;
    stopTimer();
    DOM.hiddenInput.blur();
    
    const finalStats = calculateStats(state);
    
    DOM.typingContainer.classList.remove('active');
    DOM.resultsContainer.classList.add('active');
    
    DOM.resultWpm.textContent = finalStats.wpm;
    DOM.resultAcc.textContent = `${finalStats.acc}%`;
    DOM.resultTime.textContent = `${finalStats.time}s`;
}
