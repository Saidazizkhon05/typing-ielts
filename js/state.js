export const state = {
    mode: null, // 'general' or 'ielts'
    ieltsTask: 'task1', // 'task1', 'task2', or 'random'
    ieltsType: null, // 'introduction', 'overview', 'body1', 'body2', 'conclusion'
    essays: [], // Task 2 — loaded from JSON
    task1Reports: [], // Task 1 — loaded from JSON
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
