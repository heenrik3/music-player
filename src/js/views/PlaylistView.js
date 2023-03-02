import View from './View.js'

function playlistItem(data, index) {
  return `<div class="playlist__item" id=${index}>
    <picture class="playlist__pic">
      <img src=${data.cover ? data.cover : 'cd.png'} />
    </picture>
    <div class="playlist__song">
    <span class="playlist__title">${
      data.title ? data.title : 'Faixa Desconhecida'
    }</span>
    <span class="playlist__artist">${
      data.artist ? data.artist : 'Artista Desconhecido'
    }</span>
    </div> 
  
    <button class="playlist__favorite">
      <i class="fa-regular fa-heart"></i>
    </button>

  </div>`
}

class Playlist extends View {
  parentEl = document.querySelector('.playlist__list')
  errorMessage = 'Nenhuma música adicionada.'

  constructor() {
    super()
  }

  addHandlerClick(handler) {
    this.parentEl.addEventListener('click', function (e) {
      const item = e.target.closest('.playlist__item')
      if (!item) return

      handler(+item.id)
    })
  }

  generateMarkup() {
    return new Promise((resolve, reject) => {
      this.renderSpinner()

      setTimeout(() => {
        setTimeout(() => {
          const markup = this.data
            .map((song, index) => playlistItem(song, index))
            .join('')

          resolve(markup)
        }, 100)
      }, 1000)
    })
  }

  // setBackgroundCover(song) {
  //   this.parentEl.style.backgroundImage = song.cover
  //     ? `url(${song.cover})`
  //     : `url(public/vinil.png)`
  // }
}

export default new Playlist()
