class Navbar {
  parentEl = document.querySelector('.navigation__list')
  navItems = document.querySelectorAll('.navigation__link')

  toggleActiveNavItem(e) {
    this.navItems.forEach((item) => {
      item.classList.remove('navigation--active')
    })

    e.classList.add('navigation--active')
  }

  addHandlerOnNavigation(handler) {
    this.parentEl.addEventListener('click', (e) => {
      e.preventDefault()
      const navlink = e.target.closest('.navigation__link')
      if (!navlink) return

      this.toggleActiveNavItem(navlink)

      const path = '/' + `${navlink.href}`.split(window.location.href).pop()

      handler(path)
    })
  }
}

export default new Navbar()
