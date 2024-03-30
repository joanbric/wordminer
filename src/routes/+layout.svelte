<script>
	import Header from '../lib/components/Header.svelte';
</script>

<Header />

<main>
	<slot />
</main>
<footer>
	<p>
		WordMiner 2024 - Made with ❤️ by <a target="_blank" href="https://github.com/joanbric"
			>Jhon Briones</a
		>
	</p>
</footer>

<style>
	@import url('$lib/fonts/fonts.css');
	@import url('$lib/css/global.css');

	footer {
		width: 100%;
		padding: 20px 20px;
		margin-top: auto;
		text-align: center;
		color: var(--clr-pri-light);
	}
</style>
