import PlayerView from './views/PlayerView.js'
import PlaylistView from './views/PlaylistView.js'
import AudioManager from './components/AudioManager.js'

import Model from './Model.js'
// import NavbarView from './views/NavbarView.js'

const filepicker = document.querySelector('.file')
filepicker.addEventListener('change', handleAddFolder)

function handleOnNavigation(where) {
  console.log(where)
}

function handleAddFolder(e) {
  // Filter Only Accepted Audio Formats
  const files = Array.from(e.target.files).filter((file) =>
    AudioManager.acceptedFormats().some((format) => format === file.type)
  )

  Model.addToLibrary(files)

  PlaylistView.render(Model.getLibrary())
}

function playAtPosition(position) {
  const song = Model.getSongAtPosition(position)

  AudioManager.loadSong(song.file)
}

function handlePlaylistClick(position) {
  Model.setPlaylistPosition(position)

  playAtPosition(position)
}

function handleProgressBarChange(position) {
  AudioManager.seek(position)
}

function handleSearchTrack(direction) {
  if (direction === 'back') Model.playlistPrevious()
  else if (direction === 'forward') Model.playlistNext()

  playAtPosition(Model.getPlaylistPosition())
}

function handleTogglePlay() {
  AudioManager.togglePause()
}

function handleToggleRepeat() {
  Model.toggleRepeat()

  PlayerView.setOptions(Model.getOptionsState())
}

function handleToggleShuffle() {
  Model.toggleShuffle()

  PlayerView.setOptions(Model.getOptionsState())
}

function handleVolumeChange(vol) {
  Model.setVolume(vol)
  AudioManager.setVolume(Model.getVolumeState())
}

function handleLastSongEnded() {
  PlayerView.disableControls()

  const options = Model.getOptionsState()

  if (
    Model.getPlaylistPosition() === Model.library.length - 1 &&
    options.repeat === 'off' &&
    !options.shuffle
  ) {
    Model.setPlaylistPosition(0)

    return
  }
  Model.playlistNext()

  AudioManager.loadSong(Model.getCurrentSong().file)
}

function handleOnTimeUpdate(time) {
  PlayerView.setStartTime(time)
  PlayerView.setProgressBar(time)
}

function handleLoadedMetadata(e) {
  const song = Model.getCurrentSong()
  song.duration = AudioManager.getSongDuration()

  PlayerView.setTrackInfo(song)
  PlayerView.enableControls()

  // PlaylistView.setBackgroundCover(song)

  AudioManager.play()
}

const start = () => {
  AudioManager.addHandlerLastSongEnded(handleLastSongEnded)
  AudioManager.addHandlerOnTimeUpdate(handleOnTimeUpdate)
  AudioManager.addHandlerLoadedMetadata(handleLoadedMetadata)

  // NavbarView.addHandlerOnNavigation(handleOnNavigation)

  PlayerView.addHandlerProgressBarChange(handleProgressBarChange)
  PlayerView.addHandlerBackwardButtonClick(handleSearchTrack)
  PlayerView.addHandlerForwardButtonClick(handleSearchTrack)
  PlayerView.addHandlerPlayButtonClick(handleTogglePlay)
  PlayerView.addHandlerRepeatButtonClick(handleToggleRepeat)
  PlayerView.addHandlerShuffleButtonClick(handleToggleShuffle)
  PlayerView.addHandlerVolumeChange(handleVolumeChange)
  PlayerView.setOptions(Model.getOptionsState())

  PlaylistView.addHandlerClick(handlePlaylistClick)
  PlaylistView.render()
}

start()
