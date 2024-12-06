import { writable } from 'svelte/store';
import { save, saved } from './lib/save';

export const isRunning = writable<boolean>(false);
export const duration = writable<number>(saved('duration', 30));
export const sets = writable<number>(saved('sets', 3));
export const interval = writable<number>(saved('interval', 5));

duration.subscribe((value) => {
	save('duration', value)
})

sets.subscribe((value) => {
	save('sets', value)
})

interval.subscribe((value) => {
	save('interval', value)
})