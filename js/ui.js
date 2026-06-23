import { DOM } from './dom.js';
import { state } from './state.js';
import { calculateStats } from './utils.js';

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
        state.wordElements.push({ el: wordEl, letters: letters, typed: '' });
    });
    
    // Fallback error warning
    if (DOM.wordsContainer.innerHTML === '') {
        DOM.wordsContainer.innerHTML = '<span style="color:red; font-size: 2rem;">ERROR: renderWords produced empty HTML!</span>';
    }
}

export function updateWordDOM(wordObj, targetWord, typedWord) {
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

export function updateCaretPosition() {
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
    
    // Scroll tracking
    const topPos = parseInt(DOM.caret.style.top, 10);
    if (topPos > DOM.wordsContainer.scrollTop + 100) {
        DOM.wordsContainer.scrollTop += 40;
    }
}
