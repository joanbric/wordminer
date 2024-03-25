<script>
	import SeoTag from '$lib/components/SEOTag.svelte';
	import ImageOff from '$lib/components/icons/ImageOff.svelte';
    import Alert from '$lib/components/Alert.svelte';
	import { getSelectedWords } from './stores.js';
	const seo = {
		title: 'Definer',
		description:
			"Definer is a free, open-source word miner. It uses the Tesseract OCR engine to extract text from images. It's powered by [SvelteKit](https://kit.svelte.dev/)."
	};

    let alert;
	/** @type {import('./$types').ActionData} */
	export let form;
	const { status, img, text } = form || {};
    $:{
        if(status?.code === 500){
            alert = {
                type: 'error',
                title: 'Error',
                message: status.msg
            };
        }
    }
	import TextOnPage from './components/TextOnPage.svelte';
	import MinedWords from './components/MinedWords.svelte';

	let response = '';

	async function getChunks(reader) {
		const { value: chunk, done } = await reader.read();
		if (done) {
			return '';
		}

		const json = JSON.parse(new TextDecoder('utf-8').decode(chunk));
		response += json.response;
		await getChunks(reader);
	}

	async function testStream(event) {
		if (!img) return;
		const str = getSelectedWords()
			.map((e) => (e.is_key ? `<concept>${e.word}</concept>` : e.word))
			.join(' ');

		const context = `<context>${str}</context>`;

		const eventSource = new EventSource(`/api/ai?context=${context}`);
		event.target.textContent = 'Fetching chunks...';
		eventSource.onmessage = ({ data }) => {
			const streamedData = JSON.parse(data);
			if (streamedData === '__END__') {
				eventSource.close();
				return;
			}
			response += streamedData;
		};
	}
</script>


<SeoTag {...seo} />

{#if alert}
    <Alert {...alert} />
{/if}
<h1>Mining the picture</h1>

<section class="image-container">
	{#if img}
		<div class="controllers">
			<MinedWords />
			<button class="btn-primary" on:click={testStream}>Define</button>
			{#if response}
				<section class="response-container">
					<h2>Definition</h2>
					<p class="response">{response}</p>
				</section>
			{/if}
		</div>
		<TextOnPage imgHref={img} {text} />
	{:else}
		<p class="img-placeholder"><ImageOff />Image has not found or is invalid</p>
		<a href="/">Go back to home</a>
	{/if}
</section>

<style>
	.controllers {
		width: 100%;
		position: sticky;
		top: 0;
		z-index: 30;
		background-color: #333d;
		backdrop-filter: blur(3px);
		border-radius: 12px;
		padding-inline: 3px;
	}
	.image-container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: center;
	}
	h1 {
		margin-bottom: 3rem;
	}
	section {
		margin-block: 2rem;
	}
	.img-placeholder {
		border-radius: 1rem;
		width: 100%;
		height: 40vh;
		background-color: var(--clr-pri-dark);
		color: var(--clr-pri-light);
		font-size: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: center;
		justify-content: center;
		margin-inline: auto;
	}
	.btn-primary {
		width: 100%;
		padding-block: 1rem;
	}

	.response {
		font-size: 1.2rem;
	}
	h2 {
		font-size: 1.2rem;
	}
</style>
