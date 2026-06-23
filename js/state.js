export const state = {
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
