import { writable, get } from "svelte/store";

export const selectedWords = writable([]);


export function addWord(index, word) {
    selectedWords.update((words) => {
        const findedWord = words.find((w) => w.index === index);
        const isThisKey = words.length === 0;
        if (!findedWord) {
            words.push({ index, word, is_key: isThisKey });
        }
        words.sort((a, b) => a.index - b.index);
        return words;
    })}

export function getSelectedWords() {
    return get(selectedWords);
}