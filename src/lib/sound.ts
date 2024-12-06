export function playSound(frequency: number, duration: number, volume: number = 0.5, fade = true) {
  if (isNaN(frequency)) {
		frequency = 450
	}

	if (isNaN(duration)) {
		duration = 0.2
	}
	
	const audioCtx = new AudioContext();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.type = 'sawtooth';
  oscillator.frequency.value = frequency;

  gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);
  if (fade) {
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
  }

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.start();
  oscillator.stop(audioCtx.currentTime + duration);
}

export function sound1() {
	playSound(400, 0.1, 0.6)
}

export function sound2() {
	playSound(800, 0.8, 0.8)
}

export function sound3() {
	let count = 0;

  function play() {
    if (count < 3) {
      count += 1
      playSound(1200, 0.4, 1)
      setTimeout(play, 150)
    }
  }

  play()
}