const DEFAULT_VOLUME = 0.5

function extractAlbumCover(picture) {
  const data = picture.data
  const format = picture.format
  let base64String = ''
  for (let i = 0; i < data.length; i++) {
    base64String += String.fromCharCode(data[i])
  }

  return `data:${format};base64,${window.btoa(base64String)}`
}

class Model {
  library
  playlist
  options

  constructor() {
    this.options = {
      repeat: {
        states: ['off', 'repeat', 'repeatOne'],
        pos: 0,
      },
      shuffle: false,
      volume: DEFAULT_VOLUME,
    }

    this.library = []

    this.playlist = {
      currentPosition: 0,
      songs: [],
    }
  }

  setVolume(volume) {
    this.options.volume = volume
  }

  toggleRepeat() {
    this.options.repeat.pos =
      this.options.repeat.pos + 1 >= this.options.repeat.states.length
        ? 0
        : this.options.repeat.pos + 1
  }

  toggleShuffle() {
    this.options.shuffle = !this.options.shuffle
  }

  getRepeatState() {
    return this.options.repeat.states[this.options.repeat.pos]
  }
  getShuffleState() {
    return this.options.shuffle
  }

  getVolumeState() {
    return this.options.volume
  }

  getOptionsState() {
    return {
      repeat: this.getRepeatState(),
      shuffle: this.getShuffleState(),
      volume: this.getVolumeState(),
    }
  }

  filterFile(file) {
    jsmediatags.read(file, {
      onSuccess: (tag) => {
        if (
          this.library.some(
            (song) => song.title === tag.tags.title || song.title === file.name
          )
        )
          return

        this.library.push({
          title: tag.tags.title ? tag.tags.title : file.name,
          artist: tag.tags.artist ? tag.tags.artist : null,
          cover: tag.tags.picture ? extractAlbumCover(tag.tags.picture) : null,
          file: file,
        })
      },
      onError: (error) => {
        console.log(error)
      },
    })
  }

  playlistPrevious() {
    this.playlist.currentPosition =
      this.playlist.currentPosition - 1 >= 0
        ? this.playlist.currentPosition - 1
        : this.library.length
  }

  playlistNext() {
    const options = this.getOptionsState()

    // if (options.repeat === 'repeat' && !options.shuffle) {
    // this.playlist.currentPosition =
    //   this.playlist.currentPosition + 1 < this.library.length
    //     ? this.playlist.currentPosition + 1
    //     : 0
    // } else if (options.repeat === 'repeatOne') {
    // return
    // } else if (options.shuffle) {
    // this.playlist.currentPosition = Math.floor(
    //   Math.random() * this.library.length - 1
    // )
    // }

    if (options.repeat === 'repeatOne') {
      return
    }

    if (options.shuffle) {
      this.playlist.currentPosition = Math.floor(
        Math.random() * this.library.length
      )

      return
    }

    this.playlist.currentPosition =
      this.playlist.currentPosition + 1 < this.library.length
        ? this.playlist.currentPosition + 1
        : 0
  }

  addToLibrary(files) {
    // Attemps to add files to library
    files.forEach((file) => this.filterFile(file))
  }

  getLibrary() {
    return this.library
  }

  getPlaylistPosition() {
    return this.playlist.currentPosition
  }

  getSongAtPosition(position) {
    // return this.playlist.songs[position]
    return this.library[position]
  }

  getCurrentSong() {
    // return this.playlist.songs[this.playlist.currentPosition]
    return this.library[this.playlist.currentPosition]
  }

  setPlaylistPosition(position) {
    this.playlist.currentPosition = position
  }
}

export default new Model()
