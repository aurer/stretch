<script lang="ts">
	let {
		label,
		options,
		grid = null,
		value = $bindable()
	} = $props()
	const style = grid ? `--grid-size: ${grid}` : null
</script>

<div class="input">
	<label for="interval">{label}</label>
	<div class="radio-{grid ? 'grid' : 'group'}" style={style}>
		{#each options as i}
			<label class="radio-button">
				<input 
					type="radio" 
					name="interval" 
					checked={i == value}
					value={i} 
					bind:group={value} 
				/>
				<span>{i}</span>
			</label>
		{/each}
	</div>
</div>

<style>
	.radio-group {
		display: flex;
		gap: 1rem;
		flex-flow: row wrap;
		justify-content: space-evenly;
	}

	.radio-grid {
		display: grid;
		grid-template-columns: repeat(var(--grid-size), 1fr);
		gap: 1rem;
	}

	.radio-button {
		display: inline-block;
		font-family: "Bitter", sans-serif;
		flex-shrink: 0;

		span {
			display: block;
		}
	}

	@supports selector(:has(input:checked)) {
		.radio-button {
			background-color: #333;
			padding: .6rem;
			border-radius: 4px;
			cursor: pointer;
			transition: background-color .2s, color .2s;

			&:has(input:checked) {
				background-color: #fff;
				color: #000;
			}

			input {
				display: none;
			}
		}
	}
</style>