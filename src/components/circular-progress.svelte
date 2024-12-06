<script lang="ts">
	import {onMount} from 'svelte'
	const {size, duration = 5, reverse = false, sx = ""} = $props()
	const radius = (size/2)-2
	const circumference = 2 * Math.PI * radius
	const direction = reverse ? 'reverse' : 'normal'
	const style = `--duration: ${duration}s; --direction: ${direction}; ${sx}`
</script>

<svg 
	width={size}
	height={size}
	viewBox={`0 0 ${size} ${size}`}
	style={style}
>
	<circle 
		cx={size/2} 
		cy={size/2} 
		r={radius} 
		stroke-dasharray={circumference} 
		stroke-dashoffset={circumference} 
	/>
</svg>

<style>
	circle {
		stroke: var(--color-50);
		stroke-width: 2px;
		animation: draw var(--duration) linear forwards;
		animation-direction: var(--direction);
		transform-origin: center;
		rotate: -90deg;
		fill: none;
	}

	@keyframes draw {
		to {
			stroke-dashoffset: 0;
		}
	}
</style>