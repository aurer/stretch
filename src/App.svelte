<script lang="ts">
  import Setup from './components/setup.svelte'
  import Counter from './components/counter.svelte'
  import {isRunning} from './store'
</script>

<main>
  <h1 class={$isRunning ? 'small' : 'large'}>Stretch</h1>
  {#if $isRunning}
    <Counter />
  {:else}
    <Setup />
  {/if}
</main>

<style>
  h1 {
    font-family: "Bitter", sans-serif;
    color: var(--color-500);
    font-size: 1.3rem;
    line-height: 1.1;
    text-transform: uppercase;
    letter-spacing: 0.5em;
    margin: 0 0 1em;
  }
</style>