// --- State ---
const state = {
    mode: null, // 'general' or 'ielts'
    ieltsType: null, // 'random', 'introduction', 'body1', 'body2', 'conclusion'
    essays: [], // Loaded from JSON
    currentEssay: null,
    currentText: "",
    words: [], // Array of word strings
    wordElements: [], // Array of DOM elements
    
    currentWordIndex: 0,
    currentCharIndex: 0,
    
    startTime: null,
    timerInterval: null,
    
    stats: {
        correctChars: 0,
        incorrectChars: 0,
        timeElapsed: 0,
    },
    
    isActive: false,
    isFinished: false
};

// --- DOM Elements ---
const DOM = {
    loadingOverlay: document.getElementById('loading-overlay'),
    setupContainer: document.getElementById('setup-container'),
    typingContainer: document.getElementById('typing-container'),
    resultsContainer: document.getElementById('results-container'),
    
    modeCards: document.querySelectorAll('.mode-card'),
    ieltsOptions: document.getElementById('ielts-options'),
    optionBtns: document.querySelectorAll('.option-btn'),
    startBtn: document.getElementById('start-btn'),
    
    wordsContainer: document.getElementById('words'),
    caret: document.getElementById('caret'),
    hiddenInput: document.getElementById('hidden-input'),
    blurWarning: document.getElementById('blur-warning'),
    
    textInfo: document.getElementById('text-info'),
    infoTask: document.querySelector('.info-task'),
    infoType: document.getElementById('info-type'),
    infoTopic: document.getElementById('info-topic'),
    
    liveWpm: document.getElementById('live-wpm'),
    liveAcc: document.getElementById('live-acc'),
    liveTime: document.getElementById('live-time'),
    
    resultWpm: document.getElementById('result-wpm'),
    resultAcc: document.getElementById('result-acc'),
    resultTime: document.getElementById('result-time'),
    
    restartBtn: document.getElementById('restart-btn'),
    nextBtn: document.getElementById('next-btn'),
    repeatBtn: document.getElementById('repeat-btn'),
    menuBtn: document.getElementById('menu-btn'),
    navSetup: document.getElementById('nav-setup')
};

// --- Initialization & Routing ---
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

function handleRoute() {
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

function navigate(path) {
    window.location.hash = path;
}

window.addEventListener('hashchange', handleRoute);

function setupEventListeners() {
    // Mode Selection
    DOM.modeCards.forEach(card => {
        card.addEventListener('click', () => {
            DOM.modeCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            state.mode = card.dataset.mode;
            
            if (state.mode === 'ielts') {
                DOM.ieltsOptions.classList.add('visible');
                validateSetup();
            } else {
                DOM.ieltsOptions.classList.remove('visible');
                validateSetup();
            }
        });
    });
    
    // IELTS Sub-options
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
        else if (state.mode === 'ielts') navigate(`/ielts/${state.ieltsType}`);
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
    
    // Clicking blur warning focuses input
    DOM.blurWarning.addEventListener('click', () => {
        DOM.hiddenInput.focus();
    });
}

function validateSetup() {
    if (state.mode === 'general') {
        DOM.startBtn.disabled = false;
    } else if (state.mode === 'ielts' && state.ieltsType) {
        DOM.startBtn.disabled = false;
    } else {
        DOM.startBtn.disabled = true;
    }
}

function showSetup() {
    stopTimer();
    DOM.setupContainer.style.display = 'flex';
    DOM.typingContainer.classList.remove('active');
    DOM.resultsContainer.classList.remove('active');
    state.isActive = false;
}

// --- Text Generation ---
function generateGeneralText(wordCount = 50) {
    let text = [];
    for (let i = 0; i < wordCount; i++) {
        const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
        text.push(randomWord);
    }
    return text.join(' ');
}

function generateIELTStext() {
    if (!state.essays || state.essays.length === 0) return generateGeneralText();
    
    const randomEssay = state.essays[Math.floor(Math.random() * state.essays.length)];
    state.currentEssay = randomEssay;
    
    let targetType = state.ieltsType;
    if (targetType === 'random') {
        const types = ['introduction', 'body1', 'body2', 'conclusion'];
        targetType = types[Math.floor(Math.random() * types.length)];
    }
    
    state.currentEssay.selectedType = targetType; // Save what type was actually selected
    
    const text = randomEssay.paragraphs[targetType];
    return text || generateGeneralText(); // Fallback if missing
}

// --- Typing Test Logic ---
function startTest() {
    initTest(true);
}

function initTest(newText = true) {
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
        DOM.infoType.textContent = state.currentEssay.selectedType;
        DOM.infoTopic.textContent = `Topic: ${state.currentEssay.topic}`;
    } else {
        DOM.textInfo.classList.add('hidden');
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
    DOM.liveTime.textContent = state.words.length + ' words'; // DEBUG
    
    // Reset scroll just in case
    DOM.wordsContainer.scrollTop = 0;
    
    renderWords();
    updateCaretPosition();
    DOM.hiddenInput.focus();
}

function renderWords() {
    DOM.wordsContainer.innerHTML = '';
    state.wordElements = [];
    
    state.words.forEach((word, wordIndex) => {
        const wordEl = document.createElement('div');
        wordEl.className = 'word';
        
        const letters = [];
        for (let i = 0; i < word.length; i++) {
            const letterEl = document.createElement('span');
            letterEl.className = 'letter';
            letterEl.textContent = word[i];
            wordEl.appendChild(letterEl);
            letters.push(letterEl);
        }
        
        DOM.wordsContainer.appendChild(wordEl);
        state.wordElements.push({ el: wordEl, letters: letters, typed: '' });
    });
    
    // DEBUG: if empty, force a warning
    if (DOM.wordsContainer.innerHTML === '') {
        DOM.wordsContainer.innerHTML = '<span style="color:red; font-size: 2rem;">ERROR: renderWords produced empty HTML! currentText length: ' + state.currentText.length + '</span>';
    }
}

function handleInput(e) {
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

function handleKeydown(e) {
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

function updateWordDOM(wordObj, targetWord, typedWord) {
    const letters = wordObj.letters;
    
    // Reset extra letters if they exist
    const extraLetters = wordObj.el.querySelectorAll('.extra');
    extraLetters.forEach(el => el.remove());
    
    for (let i = 0; i < Math.max(targetWord.length, typedWord.length); i++) {
        if (i < targetWord.length) {
            const letterEl = letters[i];
            if (i < typedWord.length) {
                if (typedWord[i] === targetWord[i]) {
                    letterEl.className = 'letter correct';
                } else {
                    letterEl.className = 'letter incorrect';
                }
            } else {
                letterEl.className = 'letter';
            }
        } else if (i < typedWord.length) {
            // Extra letters typed beyond target word length
            const extraEl = document.createElement('span');
            extraEl.className = 'letter incorrect extra';
            extraEl.textContent = typedWord[i];
            wordObj.el.appendChild(extraEl);
        }
    }
}

function updateCaretPosition() {
    if (state.currentWordIndex >= state.wordElements.length) return;
    
    const wordObj = state.wordElements[state.currentWordIndex];
    let targetEl;
    
    if (state.currentCharIndex === 0) {
        targetEl = wordObj.letters[0];
        if (targetEl) {
            const letterRect = targetEl.getBoundingClientRect();
            const containerRect = DOM.wordsContainer.getBoundingClientRect();
            const top = letterRect.top - containerRect.top + DOM.wordsContainer.scrollTop;
            const left = letterRect.left - containerRect.left + DOM.wordsContainer.scrollLeft;
            DOM.caret.style.left = left + 'px';
            DOM.caret.style.top = top + 'px';
        }
    } else {
        // Place caret after the last typed character
        const charIdx = Math.min(state.currentCharIndex - 1, wordObj.letters.length - 1);
        const extraLetters = wordObj.el.querySelectorAll('.extra');
        
        if (extraLetters.length > 0) {
            targetEl = extraLetters[extraLetters.length - 1];
        } else {
            targetEl = wordObj.letters[charIdx];
        }
        
        if (targetEl) {
            const letterRect = targetEl.getBoundingClientRect();
            const containerRect = DOM.wordsContainer.getBoundingClientRect();
            const top = letterRect.top - containerRect.top + DOM.wordsContainer.scrollTop;
            const left = letterRect.left - containerRect.left + DOM.wordsContainer.scrollLeft + letterRect.width;
            DOM.caret.style.left = left + 'px';
            DOM.caret.style.top = top + 'px';
        }
    }
    
    // Scroll tracking: calculate absolute caret position relative to the container scroll
    const topPos = parseInt(DOM.caret.style.top, 10);
    // Rough estimate of a line height, if caret is too far down, scroll container
    if (topPos > DOM.wordsContainer.scrollTop + 100) {
        DOM.wordsContainer.scrollTop += 40;
    }
}

// --- Timers & Stats ---
function startTimer() {
    state.startTime = Date.now();
    state.timerInterval = setInterval(updateLiveStats, 1000);
}

function stopTimer() {
    if (state.timerInterval) {
        clearInterval(state.timerInterval);
        state.timerInterval = null;
    }
}

function calculateStats() {
    let correctChars = 0;
    let incorrectChars = 0;
    
    state.wordElements.forEach((wordObj, i) => {
        const targetWord = state.words[i];
        const typedWord = wordObj.typed || '';
        
        // Count characters in completed words + spaces
        if (i < state.currentWordIndex || (i === state.currentWordIndex && state.isFinished)) {
            for (let j = 0; j < Math.max(targetWord.length, typedWord.length); j++) {
                if (j < targetWord.length && j < typedWord.length && targetWord[j] === typedWord[j]) {
                    correctChars++;
                } else {
                    incorrectChars++;
                }
            }
            // Add a correct character for the space between words
            if (i < state.words.length - 1) correctChars++;
        }
    });
    
    // Add correct chars for the currently typed word (if not finished)
    if (!state.isFinished && state.currentWordIndex < state.words.length) {
        const currentWordObj = state.wordElements[state.currentWordIndex];
        const targetWord = state.words[state.currentWordIndex];
        const typedWord = currentWordObj.typed || '';
        
        for (let j = 0; j < typedWord.length; j++) {
            if (j < targetWord.length && targetWord[j] === typedWord[j]) {
                correctChars++;
            } else {
                incorrectChars++;
            }
        }
    }
    
    const timeElapsedSec = state.startTime ? (Date.now() - state.startTime) / 1000 : 0;
    const timeElapsedMin = timeElapsedSec / 60;
    
    const wpm = timeElapsedMin > 0 ? Math.round((correctChars / 5) / timeElapsedMin) : 0;
    const totalChars = correctChars + incorrectChars;
    const acc = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100;
    
    return { wpm, acc, time: Math.round(timeElapsedSec) };
}

function updateLiveStats() {
    const stats = calculateStats();
    DOM.liveWpm.textContent = stats.wpm;
    DOM.liveAcc.textContent = `${stats.acc}%`;
    DOM.liveTime.textContent = `${stats.time}s`;
}

function finishTest() {
    state.isFinished = true;
    state.isActive = false;
    stopTimer();
    DOM.hiddenInput.blur();
    
    const finalStats = calculateStats();
    
    DOM.typingContainer.classList.remove('active');
    DOM.resultsContainer.classList.add('active');
    
    DOM.resultWpm.textContent = finalStats.wpm;
    DOM.resultAcc.textContent = `${finalStats.acc}%`;
    DOM.resultTime.textContent = `${finalStats.time}s`;
}

// Start
window.addEventListener('load', init);
window.addEventListener('resize', updateCaretPosition);
