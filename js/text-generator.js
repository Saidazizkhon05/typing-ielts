import { WORDS } from './words.js';
import { state } from './state.js';

export function generateGeneralText(wordCount = 50) {
    let text = [];
    for (let i = 0; i < wordCount; i++) {
        const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
        text.push(randomWord);
    }
    return text.join(' ');
}

export function generateIELTStext() {
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
