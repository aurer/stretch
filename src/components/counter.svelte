<script lang="ts">
  import { onDestroy } from 'svelte';
	import {isRunning, duration, interval, sets} from '../store'
	import {sound2, sound3} from '../lib/sound'
	import Progress from './progress.svelte'
	import CircularProgress from './circular-progress.svelte'

	let count = $state(0)
	let set = $state(1)
	let isWaiting = $state(false)
	let timer: number = 0;
	let error = null;
	let wakeLock: WakeLockSentinel;

	async function loop() {
		await prepare();
		await countDown()

		if (set++ < $sets) {
			return loop()
		}
		
		stop()
	}

	async function prepare() {
		isWaiting = true;
		await new Promise(resolve => {
			timer = setTimeout(resolve, $interval*1000)
		});
	}

	async function countDown() {
		count = $duration;
		return new Promise(resolve => {
			isWaiting = false	
			function updateCount() {
				if (count > 0) {
					setTimeout(() => {
						count -= 1
						updateCount()
					}, 1000)
				} else {
					resolve(true)
				}
			}
			updateCount()
		})
	}


	// Function that attempts to request a screen wake lock.
	const requestWakeLock = async () => {
		try {
			wakeLock = await navigator.wakeLock.request();
			// wakeLock.addEventListener('release', () => {
			// 	console.log('Screen Wake Lock released:', wakeLock.released);
			// });
		} catch (err) {
			console.error(err);
		}
	};


	function stop() {
		clearTimeout(timer)
		isRunning.set(false)
		wakeLock?.release();
	}
	
	requestWakeLock().then(() => {
		loop()
	})

	onDestroy(() => {
		clearTimeout(timer)
	});
</script>

<div class="counter">
	{error}
	<h2 class="set">
		<span class="current">{set}</span>
		<span class="slash">/</span>
		<span class="total">{$sets}</span>
	</h2>
	<div class="countdown">
		{#if isWaiting}
			<p class="get-ready">Get ready...</p>
			<CircularProgress 
				size={200} 
				duration={$interval} 
				reverse={true}
				sx="position:absolute; inset:0; width:100%; height:100%; opacity:0.3;"
			/>
		{:else}
			<p class="clock">{count}</p>
			<CircularProgress 
				size={200} 
				duration={$duration} 
				sx="position:absolute; inset:0; width:100%; height:100%;"
			/>
		{/if}
	</div>
	<button onclick={stop}>Cancel</button>
</div>

<style>
  .counter {
		margin: 5rem auto;
	}

	h2 {
		font-family: "Bitter", sans-serif;
		font-size: 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.4em;
		color: var(--color-500);
		margin: 0;
	}

	h2 .slash {
		color: var(--color-700);
		font-size: 0.8em;
	}

	.countdown {
		height: 40vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		position: relative;
		margin-top: 1rem;
	}

	.get-ready {
		font-size: 1.4rem;
	}

	.clock {
		font-size: 12rem;
		line-height: 1;
		margin: 0;
		letter-spacing: -0.1em;
	}

	button {
		margin-top: 3rem;
	}
</style>
