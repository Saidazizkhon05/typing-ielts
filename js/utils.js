export function calculateStats(state) {
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
