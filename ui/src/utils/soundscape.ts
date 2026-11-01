// Zero-dependency pure Web Audio API ambient nature sound generator
// Synthesizes a soothing, filtered organic wind/breeze with sinusoidal modulation

class NatureSoundscape {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private gainNode: GainNode | null = null;
  private noiseNode: AudioNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private lfoNode: OscillatorNode | null = null;

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getActive(): boolean {
    return this.isPlaying;
  }

  public start() {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.ctx) {
        this.ctx = new AudioCtx();
      }

      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      // 1. Create 3 seconds of pink noise buffer
      const bufferSize = this.ctx.sampleRate * 3;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);

      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.035;
        b6 = white * 0.115926;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // 2. Low-pass filter for soft forest canopy breeze
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(380, this.ctx.currentTime);
      filter.Q.setValueAtTime(2.0, this.ctx.currentTime);

      // 3. Gentle LFO modulation of wind frequency (breathing swell)
      const lfo = this.ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.12, this.ctx.currentTime); // ~8s cycle
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(140, this.ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);

      // 4. Master volume gain with smooth fade in
      const masterGain = this.ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.28, this.ctx.currentTime + 2.0);

      whiteNoise.connect(filter);
      filter.connect(masterGain);
      masterGain.connect(this.ctx.destination);

      whiteNoise.start();
      lfo.start();

      this.noiseNode = whiteNoise;
      this.filterNode = filter;
      this.lfoNode = lfo;
      this.gainNode = masterGain;
      this.isPlaying = true;
    } catch (e) {
      console.warn('AudioContext not allowed without user interaction:', e);
      this.isPlaying = false;
    }
  }

  public stop() {
    if (!this.isPlaying || !this.ctx || !this.gainNode) return;
    try {
      this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, this.ctx.currentTime);
      this.gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);
      setTimeout(() => {
        try {
          (this.noiseNode as AudioBufferSourceNode)?.stop();
          this.lfoNode?.stop();
        } catch {}
        this.isPlaying = false;
      }, 1250);
    } catch {
      this.isPlaying = false;
    }
  }
}

export const soundscape = new NatureSoundscape();
