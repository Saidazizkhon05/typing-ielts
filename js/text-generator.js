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

const TASK1_TYPES = ['introduction', 'overview', 'body1', 'body2'];
const TASK2_TYPES = ['introduction', 'body1', 'body2', 'conclusion'];

export function generateIELTStext() {
    let isTask1;
    let targetType;

    if (state.ieltsTask === 'random') {
        isTask1 = Math.random() < 0.5;
        const types = isTask1 ? TASK1_TYPES : TASK2_TYPES;
        targetType = types[Math.floor(Math.random() * types.length)];
    } else {
        isTask1 = state.ieltsTask === 'task1';
        targetType = state.ieltsType;
    }

    const pool = isTask1 ? state.task1Reports : state.essays;
    if (!pool || pool.length === 0) return generateGeneralText();

    const randomItem = pool[Math.floor(Math.random() * pool.length)];
    state.currentEssay = randomItem;
    state.currentEssay.selectedType = targetType;
    state.currentEssay.ieltsTask = isTask1 ? 'task1' : 'task2';

    const text = randomItem.paragraphs[targetType];
    return text || generateGeneralText();
}
