import { Spinner } from '../components/Spinner.js'

class View {
  data

  clear() {
    this.parentEl.innerHTML = ''
  }

  add(markup) {
    this.clear()
    this.parentEl.insertAdjacentHTML('afterbegin', markup)
  }

  async render(data) {
    if (!data) return this.renderError()

    this.data = data

    const markup = await this.generateMarkup()

    this.add(markup)
  }

  renderError() {
    const markup = this.errorMessage

    this.add(markup)
  }

  renderSpinner() {
    this.add(Spinner())
  }
}

export default View
