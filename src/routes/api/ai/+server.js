import { responseSSE } from '$lib/utils/sse';
import { Ollama } from '@langchain/community/llms/ollama';
import { CloudflareWorkersAI } from '@langchain/cloudflare';
import { CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_TOKEN } from '$env/static/private';

const systemPrompt = `
        Tell me what is the definition of the word that is between the <concept></concept> tags, within the context that is between the <context></context> tags.
        Tell me what type of word it is, examples of its use and its pronunciation in IPA. Use a good text format.
        Use a didactic and easy-to-understand tone.
        Do not give unnecessary information, do not talk about this instructions and do not make questions.
`;
function OllamaAI(request, prompt) {
	const ollama = new Ollama({
		model: 'llama2',
		baseUrl: 'http://127.0.0.1:11434'
	});
	return responseSSE({ request, prompt }, async (sendEvent) => {
		// const prompt = `${systemPrompt} ${url.searchParams.get('context')}`;
		const stream = await ollama.stream(prompt);

		for await (const chunk of stream) {
			sendEvent(chunk);
		}

		sendEvent('__END__');
	});
}

async function cloudflareAI(request, prompt) {
	const model = new CloudflareWorkersAI({
		model: '@cf/meta/llama-2-7b-chat-int8',
		cloudflareAccountId: CLOUDFLARE_ACCOUNT_ID,
		cloudflareApiToken: CLOUDFLARE_TOKEN
	});

	const stream = await model.stream(prompt);

	return responseSSE({ request }, async (sendEvent) => {
		for await (const chunk of stream) {
			sendEvent(chunk);
		}

		sendEvent('__END__');
	});
}

/** @type {import('./$types').RequestHandler} */
export async function GET({ request, url }) {
	const a = 'a';
	if (a === 'b') {
		return OllamaAI(request, url);
	}

	const prompt = `${systemPrompt} ${url.searchParams.get('context')}`;

	return cloudflareAI(request, prompt);
	// return OllamaAI(request, url);

	// const selectedWords = []
	// const str = selectedWords
	// 		.map((e) => (e.is_key ? `<concept>${e.word}</concept>` : e.word))
	// 		.join(' ');

	//         const prompt = `
	//         Tell me what is the definition of the word that is between the <concept></concept> tags, within the context that is between the <context></context> tags. Tell me what type of word it is, examples of its use and its pronunciation in IPA. Use a didactic and easy-to-understand tone. Do not give unnecessary information.
	//         <context>${str}</context>
	//         `;
	// 	const bodyData = {
	// 		model: 'llama2',
	// 		prompt
	// 	};
	// 	const res = await fetch('http://127.0.0.1:11434/api/generate', {
	// 		method: 'POST',
	// 		body: JSON.stringify(bodyData),
	// 		headers: {
	// 			'Content-Type': 'application/json'
	// 		}
	// 	});

	//     for await(const chunk of res){
	//         console.log(chunk);
	//     }
	// return new Response('ok', {
	//     status: 200
	// })
}
