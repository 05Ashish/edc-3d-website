import { create } from 'zustand'
import { Howl } from 'howler'

const sounds = {
  background: new Howl({
    src: ['src/assets/sounds/background.mp3'],
    loop: true,
    volume: 0.08
  }),
  hover: new Howl({
    src: ['/assets/sounds/hover.mp3'],
    volume: 0.5
  }),
  click: new Howl({
    src: ['src/assets/sounds/click.mp3'],
    volume: 0.5
  }),
  endLoadingScreen: new Howl({
    src: ['src/assets/sounds/production-elements-impactor-e-188986.mp3'],
    volume: 0.5
  }),
  transition: new Howl({
    src: ['src/assets/sounds/low-dark-impact-for-transition-231471.mp3'],
    volume: 0.09
  })
}

const useAudioStore = create((set, get) => ({
  isMuted: false,
  musicVolume: 0.3,
  effectsVolume: 0.5,
  isPlaying: true,

  initAudio: () => {
    const state = get()
    if (!state.isPlaying) {
      sounds.background.play()
      set({ isPlaying: true })
    }
  },

  toggleMute: () => {
    const { isMuted } = get();
    const newMutedState = !isMuted;
    
    // Mute/unmute all sounds
    Object.values(sounds).forEach(sound => {
      sound.mute(newMutedState);
    });

    // If unmuting and background music should be playing, ensure it's playing
    if (!newMutedState && get().isPlaying) {
      sounds.background.play();
    }
    
    set({ isMuted: newMutedState });
  },

  setMusicVolume: (volume) => {
    sounds.background.volume(volume)
    set({ musicVolume: volume })
    localStorage.setItem('musicVolume', volume.toString())
  },

  setEffectsVolume: (volume) => {
    ['hover', 'click', 'transition', "endLoadingScreen"].forEach(soundKey => {
      sounds[soundKey].volume(volume)
    })
    set({ effectsVolume: volume })
    localStorage.setItem('effectsVolume', volume.toString())
  },

  playSound: (soundName) => {
    const state = get()
    if (!state.isMuted && sounds[soundName]) {
      sounds[soundName].play()
    }
  },

  stopSound: (soundName) => {
    if (sounds[soundName]) {
      sounds[soundName].stop()
    }
  },

  cleanup: () => {
    Object.values(sounds).forEach(sound => {
      sound.unload()
    })
  }
}))

// Initialize audio settings from localStorage
if (typeof window !== 'undefined') {
  const savedMusicVolume = localStorage.getItem('musicVolume')
  const savedEffectsVolume = localStorage.getItem('effectsVolume')

  if (savedMusicVolume) {
    useAudioStore.getState().setMusicVolume(parseFloat(savedMusicVolume))
  }
  if (savedEffectsVolume) {
    useAudioStore.getState().setEffectsVolume(parseFloat(savedEffectsVolume))
  }
}

export const useAudioManager = () => {
  const store = useAudioStore()
  return {
    isMuted: store.isMuted,
    musicVolume: store.musicVolume,
    effectsVolume: store.effectsVolume,
    toggleMute: store.toggleMute,
    setMusicVolume: store.setMusicVolume,
    setEffectsVolume: store.setEffectsVolume,
    playSound: store.playSound,
    stopSound: store.stopSound,
    initAudio: store.initAudio
  }
}

export default useAudioManager