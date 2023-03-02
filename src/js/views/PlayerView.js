// import View from './View'

function parseTime(time) {
  var hours = Math.floor(time / 60 / 60)

  var minutes = Math.floor(time / 60) - hours * 60

  // 42
  var seconds = Math.trunc(time % 60)

  return (
    minutes.toString().padStart(2, '0') +
    ':' +
    seconds.toString().padStart(2, '0')
  )
}

class PlayerView {
  albumImg = document.querySelector('.player__img')
  songText = document.querySelector('.player__title')
  artistText = document.querySelector('.player__artist')
  progressBar = document.querySelector('.player__progress--bar')
  repeatButton = document.querySelector('.player__repeat')
  backwardButton = document.querySelector('.player__backward')
  playButton = document.querySelector('.player__play')
  forwardButton = document.querySelector('.player__forward')
  shuffleButton = document.querySelector('.player__shuffle')
  startTime = document.querySelector('.player__start')
  endTime = document.querySelector('.player__end')
  volume = document.querySelector('.player__volume--bar')

  constructor() {
    this.controls = [
      this.repeatButton,
      this.playButton,
      this.forwardButton,
      this.backwardButton,
      this.shuffleButton,
    ]

    this.disableControls()
  }

  setAlbumCover(src) {
    this.albumImg.src = src
  }
  setSongName(name) {
    this.songText.textContent = name
  }
  setArtistName(name) {
    this.artistText.textContent = name
  }

  setProgressBar(progress) {
    this.progressBar.value = progress
  }

  setProgressBarMax(max) {
    this.progressBar.max = max
  }

  disableProgressBar() {
    this.progressBar.setAttribute('disabled', true)
  }

  enableProgressBar() {
    this.progressBar.removeAttribute('disabled')
  }

  disableButtons() {
    this.controls.forEach((control) => {
      control.setAttribute('disabled', true)
    })
  }

  enableButtons() {
    this.controls.forEach((control) => {
      control.removeAttribute('disabled')
    })
  }

  disableControls() {
    this.disableProgressBar()
    this.disableButtons()
  }

  enableControls() {
    this.enableProgressBar()
    this.enableButtons()
  }

  setStartTime(time) {
    this.startTime.innerHTML = parseTime(time)
  }
  setEndTime(time) {
    this.endTime.innerHTML = parseTime(time)
  }

  setTrackInfo(song) {
    document.title = song.title + ' - ' + song.artist

    this.setAlbumCover(song.cover ? song.cover : 'cd.png')
    this.setSongName(song.title)
    this.setArtistName(song.artist)
    this.setProgressBarMax(song.duration)

    this.setEndTime(song.duration)
  }

  togglePlayButton() {
    const playIcon = '<i class="fa-solid fa-play"></i>',
      pauseIcon = '<i class="fa-solid fa-pause"></i>'

    this.playButton.innerHTML =
      this.playButton.innerHTML === playIcon ? pauseIcon : playIcon
  }

  toggleRepeatButton(type) {
    const repeatOffIcon =
        '<i class="fa-solid fa-repeat player__controls--off">',
      repeatOnIcon = '<i class="fa-solid fa-repeat"></i>',
      repeatOneIcon =
        '<div class="repeat-one"></div><i class="fa-solid fa-repeat"></i>'

    const icons = {
      off: repeatOffIcon,
      repeat: repeatOnIcon,
      repeatOne: repeatOneIcon,
    }

    this.repeatButton.innerHTML = icons[type]
  }

  toggleShuffleButton(state) {
    if (state) this.shuffleButton.classList.remove('player__controls--off')
    else this.shuffleButton.classList.add('player__controls--off')
  }

  setOptions(options) {
    this.toggleRepeatButton(options.repeat)
    this.toggleShuffleButton(options.shuffle)
    this.volume.value = options.volume
  }

  addHandlerProgressBarChange(handler) {
    this.progressBar.addEventListener('change', () => {
      handler(+this.progressBar.value)
    })
  }

  addHandlerBackwardButtonClick(handler) {
    this.backwardButton.addEventListener('click', () => {
      handler('back')
    })
  }

  addHandlerForwardButtonClick(handler) {
    this.forwardButton.addEventListener('click', () => {
      handler('forward')
    })
  }

  addHandlerPlayButtonClick(handler) {
    this.playButton.addEventListener('click', () => {
      this.togglePlayButton()
      handler()
    })
  }

  addHandlerRepeatButtonClick(handler) {
    this.repeatButton.addEventListener('click', () => {
      handler()
    })
  }

  addHandlerShuffleButtonClick(handler) {
    this.shuffleButton.addEventListener('click', () => {
      handler()
    })
  }

  addHandlerVolumeChange(handler) {
    this.volume.addEventListener('input', () => {
      handler(+this.volume.value)
    })
  }
}

export default new PlayerView()
