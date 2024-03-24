<script>
	import { selectedWords } from '../stores.js';
    import { fade } from 'svelte/transition';

	let words = [];
	selectedWords.subscribe((arrWords) => {
		words = arrWords;
	});

	function removeSelectedWord(e, index) {
		selectedWords.update((words) => {
			if (words.length <= 1) return [];

			const wordToRemoveIndex = words.findIndex((w) => w.index === index && !w.is_key);
			if (wordToRemoveIndex >= 0) words.splice(wordToRemoveIndex, 1);
            
			return words;
		});
	}
</script>
<section>

    <p>Palabras minadas</p>
    <p class="selected-words-container">
        {#each words as word}
		<button
        transition:fade={{ duration: 1000, x: 100, delay: 100 }}
			on:click={(e) => removeSelectedWord(e, word.index)}
			class="selected-word"
			class:key-word={word.is_key}>{word.word}</button
		>
        {/each}
    </p>
</section>

<style>
	.selected-words-container {
		display: flex;
		flex-wrap: wrap;
		gap: 0.2em;
		margin: 5px 0;
		user-select: none;
		cursor: pointer;
	}

	.selected-word {
		font-size: 1rem;
		border: 2px solid #a58be2;
		padding: 5px 10px;
		border-radius: 5px;
		background: none;
		color: var(--clr-pri-light);

        /* animation: fadeIn 2s; */
	}

    /* @keyframes fadeIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    } */

	.selected-word:hover {
		background-color: #4a3f66;
	}

	.key-word {
		background-color: #4a3f66;
	}
</style>
