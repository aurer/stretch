<script lang="ts">
  import {isRunning, duration, sets, interval} from '../store'
	import InputRange from './input-range.svelte'

	let durationValue = $state($duration)
  let setsValue = $state($sets)
	let intervalValue = $state($interval)

	function start() {
		isRunning.set(true)
		duration.set(durationValue)
		sets.set(setsValue)
		interval.set(intervalValue)
	}
</script>

<div>
	<div class="inputs">
		<InputRange 
			label="Sets"
			name="count"
			step={1}
			min={1}
			max={10}
			bind:value={setsValue}
		/>

		<InputRange 
			label="Set duration"
			name="duration"
			step={5}
			min={5}
			max={60}
			valueUnit="s"
			bind:value={durationValue} 
		/>
		
		<InputRange 
			label="Interval"
			name="interval"
			step={1}
			min={1}
			max={10}
			valueUnit="s"
			bind:value={intervalValue}
		/>
	</div>
	
  <button onclick={start}>Start</button>
</div>

<style>
  .inputs {
		display: flex;
		flex-direction: column;
		gap: 6vh;
		margin: 12vh auto;
	}
</style>
