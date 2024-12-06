<script lang="ts">
	const {duration = 5} = $props()
	const style = `--time: ${duration}s`
</script>

<div class="progress" style={style}>
  <div class="inner"></div>
</div>

<style>
	.progress {
		height: 4px;
		border-radius: 2px;
		width: 100%;
		background: var(--color-800);
		position: relative;
	}

	.inner {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		background: var(--color-50);
		width: 100%;
		transform-origin: 0 0;
		scale: 0% 100%;
		animation: progress var(--time) linear;
		animation-fill-mode: forwards;
	}

	@keyframes progress {
		to {
			scale: 100% 100%;
		}
	}
</style>