import { DOM } from './dom.js';
import { state } from './state.js';
import { calculateStats } from './utils.js';

const CARET_LINE_OFFSET = 48;
const CARET_HEIGHT = 32; // matches #caret height: 2rem

export function updateLiveStats() {
    const stats = calculateStats(state);
    DOM.liveWpm.textContent = stats.wpm;
    DOM.liveAcc.textContent = `${stats.acc}%`;
    DOM.liveTime.textContent = `${stats.time}s`;
}

export function renderWords() {
    DOM.wordsContainer.innerHTML = '';
    state.wordElements = [];

    state.words.forEach((word) => {
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
        state.wordElements.push({ el: wordEl, letters, typed: '' });
    });

    if (DOM.wordsContainer.innerHTML === '') {
        DOM.wordsContainer.innerHTML = '<span style="color:red; font-size: 2rem;">ERROR: renderWords produced empty HTML!</span>';
    }
}

export function updateWordDOM(wordObj, targetWord, typedWord) {
    const letters = wordObj.letters;

    const extraLetters = wordObj.el.querySelectorAll('.extra');
    extraLetters.forEach(el => el.remove());

    for (let i = 0; i < Math.max(targetWord.length, typedWord.length); i++) {
        if (i < targetWord.length) {
            const letterEl = letters[i];
            if (i < typedWord.length) {
                letterEl.className = typedWord[i] === targetWord[i]
                    ? 'letter correct'
                    : 'letter incorrect';
            } else {
                letterEl.className = 'letter';
            }
        } else if (i < typedWord.length) {
            const extraEl = document.createElement('span');
            extraEl.className = 'letter incorrect extra';
            extraEl.textContent = typedWord[i];
            wordObj.el.appendChild(extraEl);
        }
    }
}

function scrollCaretIntoView(caretTop) {
    const scrollContainer = DOM.typingAreaWrapper;
    if (!scrollContainer) return;

    const caretBottom = caretTop + CARET_HEIGHT;
    const visibleTop = scrollContainer.scrollTop;
    const visibleBottom = visibleTop + scrollContainer.clientHeight;

    if (caretTop < visibleTop) {
        scrollContainer.scrollTop = Math.max(0, caretTop - CARET_LINE_OFFSET);
    } else if (caretBottom > visibleBottom) {
        scrollContainer.scrollTop = caretTop - CARET_LINE_OFFSET;
    }
}

export function updateCaretPosition() {
    if (state.currentWordIndex >= state.wordElements.length) return;

    const scrollContainer = DOM.typingAreaWrapper;
    if (!scrollContainer) return;

    const wordObj = state.wordElements[state.currentWordIndex];
    let targetEl;

    if (state.currentCharIndex === 0) {
        targetEl = wordObj.letters[0];
        if (!targetEl) return;

        const letterRect = targetEl.getBoundingClientRect();
        const containerRect = scrollContainer.getBoundingClientRect();
        const top = letterRect.top - containerRect.top + scrollContainer.scrollTop;
        const left = letterRect.left - containerRect.left;

        DOM.caret.style.left = `${left}px`;
        DOM.caret.style.top = `${top}px`;
        scrollCaretIntoView(top);
        return;
    }

    const charIdx = Math.min(state.currentCharIndex - 1, wordObj.letters.length - 1);
    const extraLetters = wordObj.el.querySelectorAll('.extra');

    targetEl = extraLetters.length > 0
        ? extraLetters[extraLetters.length - 1]
        : wordObj.letters[charIdx];

    if (!targetEl) return;

    const letterRect = targetEl.getBoundingClientRect();
    const containerRect = scrollContainer.getBoundingClientRect();
    const top = letterRect.top - containerRect.top + scrollContainer.scrollTop;
    const left = letterRect.left - containerRect.left + letterRect.width;

    DOM.caret.style.left = `${left}px`;
    DOM.caret.style.top = `${top}px`;
    scrollCaretIntoView(top);
}

export function resetTypingScroll() {
    if (DOM.typingAreaWrapper) {
        DOM.typingAreaWrapper.scrollTop = 0;
    }
}
