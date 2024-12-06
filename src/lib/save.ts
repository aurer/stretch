export function save(name: string, value: any) {
	localStorage.setItem(name, value);
}

export function saved(name: string, fallback: any) {
	const value = localStorage.getItem(name)
	return value ?? fallback
}