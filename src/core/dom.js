class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector;
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }

  get text() {
    return this.$el.textContent
  }

  set text(text) {
    this.$el.textContent = text
  }

  clear() {
    this.html('')
    return this
  }

  addClass(className) {
    this.$el.classList.add(className)
    return this
  }

  removeClass(className) {
    this.$el.classList.remove(className)
    return this
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }
    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }
    return this
  }
  on(listener, func = {}) {
    this.$el.addEventListener(listener, func)
  }
  off(listener, func) {
    this.$el.removeEventListener(listener, func)
  }
  closest(selector) {
    return $(this.$el.closest(selector))
  }
  getCoords() {
    return this.$el.getBoundingClientRect()
  }

  get data() {
    return this.$el.dataset
  }

  focus() {
    this.$el.focus()
    return this
  }

  id(parse) {
    if (parse) {
      const id = this.id()
      const parsed = id.split(':')
      return {
        row: +parsed[0],
        col: +parsed[1]
      }
    }
    return this.data.id
  }

  find(selector) {
    return $(this.$el.querySelector(selector))
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }
  css(styles = {}) {
    for (const key in styles) {
      if ({}.hasOwnProperty.call(styles, key)) {
        this.$el.style[key] = styles[key]
      }
    }
  }
}

export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes)
  }
  return $(el);
}
