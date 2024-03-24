<script>
	import { onMount } from 'svelte';

	export let imgHref;
	export let text;

	import { addWord } from '../stores.js';
	let image;
	let img;
    let scaleRation;
	onMount(async () => {
        image = new Image();
		image.src = imgHref;
        console.log(image.width, image.height);
		console.log(img.width, img.height);
        scaleRation = img.width / image.width;
	});
	console.log(text);
	function changeHandler(e, index) {
		const word = text[index].text;
		addWord(index, word);
		e.target.checked = true;
	}
</script>

<div class="container">
	<img bind:this={img} src={imgHref} alt="Media" draggable="false" />
	{#each text as word, index}
		{@const pos = word.baseline}
		<span
			class="word-container"
			style:top={`${pos.y0 * scaleRation - 20}px`}
			style:left={`${pos.x0 * scaleRation}px`}
			style:font-size={`${word.font_size * scaleRation}px`}
		>
			<input on:change={(e) => changeHandler(e, index)} type="checkbox" name={index} id={index} />

			<label for={index}>{word.text}</label>
		</span>
	{/each}
</div>

<style>
	.container {
		position: relative;
		max-width: 100%;
		margin: 1rem 0;
		user-select: none;
		overflow: hidden;
	}
	.word-container {
		position: absolute;
		text-shadow: 0 4px 1rem var(--clr-sec-dark);
		border: 1px solid #7967a581;
		background-color: rgba(66, 57, 90, 0.6);
		backdrop-filter: blur(5px);
		border-radius: 5px;
		padding: 0 2px;
	}
	input {
		display: none;
	}
	input:checked + label {
		background-color: #4a3974;
	}
	img {
		width: 100%;
	}
</style>
