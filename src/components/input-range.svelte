<script lang="ts">
	let {
		label,
		name,
		step,
		min,
		max,
		value = $bindable(),
		valueUnit = null
	} = $props()
</script>

<div class="input">
	<header>
		<label for={`range-${name}`}>{label}</label>
		<span class="value">
			{value}<span class="unit">{valueUnit}</span>
		</span>
	</header>
		
	<input
		type="range"
		name={name}
		id={`range-${name}`}
		step={step}
		min={min}
		max={max}
		bind:value={value} 
	/>
</div>

<style>
	input[type="range"] {
		display: block;
		width: 100%;
		appearance: none;
		background: transparent;
	}

	header {
		text-align: left;
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		font-size: 1.2em;
	}

	label {
		margin-bottom: 1.5rem;
		text-align: left;
		display: flex;
		justify-content: space-between;
	}

	label:after {
		content: ':'
	}

	.value {
		font-weight: 800;
		position: relative;
	}

	.unit {
		font-weight: 400;
		font-size: 0.9em;
		position: absolute;
		bottom: 0;
		opacity: 0.5;
	}
	
	::-webkit-slider-runnable-track {
		appearance: auto;
		height: 3px;
		border-radius: 4px;
		background-color: var(--color-700);
	}

	::-moz-range-track {
		appearance: auto;
		height: 3px;
		border-radius: 4px;
		background-color: var(--color-700);
	}
	
	::-webkit-slider-thumb {
		appearance: none;
		height: 24px;
		width: 24px;
		border: 2px solid var(--color-50); 
		border-radius: 50%;
		background-color: var(--color-950);
		margin-top: -10px;
	}

	::-moz-range-thumb {
		appearance: none;
		height: 24px;
		width: 24px;
		border: 2px solid var(--color-50); 
		border-radius: 50%;
		background-color: var(--color-950);
		margin-top: -10px;
	}
</style>