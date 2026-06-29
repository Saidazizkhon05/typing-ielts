export const DOM = {
    loadingOverlay: document.getElementById('loading-overlay'),
    setupContainer: document.getElementById('setup-container'),
    typingContainer: document.getElementById('typing-container'),
    resultsContainer: document.getElementById('results-container'),
    
    modeCards: document.querySelectorAll('.mode-card'),
    ieltsOptions: document.getElementById('ielts-options'),
    taskBtns: document.querySelectorAll('.task-btn'),
    paragraphOptions: document.getElementById('ielts-paragraph-options'),
    optionBtns: document.querySelectorAll('.option-btn'),
    startBtn: document.getElementById('start-btn'),
    
    wordsContainer: document.getElementById('words'),
    typingAreaWrapper: document.querySelector('.typing-area-wrapper'),
    caret: document.getElementById('caret'),
    hiddenInput: document.getElementById('hidden-input'),
    blurWarning: document.getElementById('blur-warning'),
    
    textInfo: document.getElementById('text-info'),
    task1ChartPanel: document.getElementById('task1-chart-panel'),
    task1Chart: document.getElementById('task1-chart'),
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
    nextTypingBtn: document.getElementById('next-typing-btn'),
    nextBtn: document.getElementById('next-btn'),
    repeatBtn: document.getElementById('repeat-btn'),
    menuBtn: document.getElementById('menu-btn'),
    navSetup: document.getElementById('nav-setup')
};
