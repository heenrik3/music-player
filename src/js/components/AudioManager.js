class AudioManager {
  audio = document.querySelector('#audio')
  reader = new FileReader()

  acceptedAudioFormats = ['audio/mpeg']

  constructor() {
    this.reader.onload = (e) => {
      this.audio.src = e.target.result
      this.audio.load()
    }

    this.setVolume(0.5)
  }

  addHandlerOnTimeUpdate(handler) {
    this.audio.addEventListener('timeupdate', (e) => {
      handler(this.audio.currentTime)
    })
  }

  addHandlerLoadedMetadata(handler) {
    this.audio.addEventListener('loadedmetadata', (e) => {
      handler()
    })
  }

  addHandlerLastSongEnded(handler) {
    this.audio.addEventListener('ended', handler)
  }

  getSongDuration() {
    return this.audio.duration
  }

  loadSong(file) {
    this.reader.readAsDataURL(file)
  }

  seek(position) {
    this.audio.currentTime = position
  }

  play() {
    this.audio.play()
  }

  togglePause() {
    this.audio.paused ? this.audio.play() : this.audio.pause()
  }

  paused() {
    return this.audio.paused
  }

  acceptedFormats() {
    return this.acceptedAudioFormats
  }

  setVolume(volume) {
    this.audio.volume = volume
  }
}

export default new AudioManager()
