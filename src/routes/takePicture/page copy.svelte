<script>
	import { onMount } from 'svelte';
	import Alert from '../../lib/components/Alert.svelte';
	import optimizeImage from '../../lib/utils/optimizeImage';
	import optimizeOpenCV from '../../lib/utils/optimizeImgOpenCV';

	let screen = null;
	let alert;
	let info = '';
	let deviceId;
	let isRecoding = false;

	const startRecoding = async () => {
		if (isRecoding) return;
		const constraints = {
			video: {
				deviceId: { ideal: deviceId },
				width: { ideal: 1080, max: 1080 },
				height: { ideal: 1920, max: 1920 },
				facingMode: { ideal: 'environment' },
				noiseSuppression: true
			},
			audio: false
		};
		try {
			const stream = await navigator.mediaDevices.getUserMedia(constraints);
			screen.srcObject = stream;
			screen.play();
			isRecoding = true;
		} catch (error) {
			alert = {
				type: 'error',
				title: `Error - ${error.name}`,
				message: error.message
			};
		}
	};

	let devices = [];
	onMount(async () => {
		devices = (await navigator.mediaDevices.enumerateDevices()).filter((d) =>
			d.kind.includes('video')
		);
	});
	async function getMediaInfo() {
		for (const device of devices) {
			info += `***** Device label: ${device.label} - Device kind: ${device.kind} - Device ID: ${device.deviceId} *****`;
		}
	}
	function cameraChange() {
		screen.pause();
		screen.srcObject = null;
		isRecoding = false;
	}
	let inputImg;
	let canvas;
	async function takePhoto() {
		screen.pause();
		// const canvas = document.createElement('canvas');
		// const ctx = canvas.getContext('2d');
		// canvas.width = screen.videoWidth;
		// canvas.height = screen.videoHeight;
		// ctx.drawImage(screen, 0, 0);
		// const imgBase64 = canvas.toDataURL('image/png');
		// inputImg.value = imgBase64
		// try{
		alert = {
			type: 'info',
			title: 'Datos a enviar',
			message: `*** ${1 + 1} ***`
		};
		const imgBase64 = await optimizeOpenCV(screen, canvas);

		inputImg.value = imgBase64;
		// }catch(err){

		//     alert = {
		//         type: 'info',
		//         title: 'Datos a enviar',
		//         message: `*** ${err.message} ***`
		//     }
		//     throw new Error(err)
		// }
	}
</script>

<h1>Take a picture</h1>

{#if alert}
	<Alert {...alert} on:close={() => (alert = null)} />
{/if}
<video
	bind:this={screen}
	autoplay
	class:flip={devices.find((d) => d.deviceId === deviceId)?.label.includes('front')}
>
	<track kind="captions" src="captions.vtt" srclang="en" label="English" />
</video>

<button on:click={startRecoding}>Start recording</button>
<!-- <button on:click={getMediaInfo}>Get info</button> -->
<select bind:value={deviceId} on:change={cameraChange} name="devices" id="devices">
	{#each devices as device}
		<option value={device.deviceId}>{device.kind} - {device.label}</option>
	{/each}
</select>
<button on:click={takePhoto}>Take photo</button>
<form action="/definer" method="POST">
	<input type="hidden" name="imgBase64" bind:this={inputImg} />
	<input type="submit" value="Scan picture" />
</form>
<p>
	{info}
</p>
<canvas bind:this={canvas}></canvas>

<style>
	video {
		max-width: 100dvw;
	}
	.flip {
		transform: rotateY(180deg);
	}
</style>
