const fs = require('fs')
const path = require('path')

const src = path.join(__dirname, 'examples')
const __build__ = '__build__'

const PAGE = {
  title: 'Vue Attache Example',
  template: path.join(src, 'index.html'),
  chunks: ['chunk-vendors', 'chunk-common']
}

const pages = fs.readdirSync(src).reduce((pages, dir) => {
  if (dir !== __build__) {
    const fullPath = path.join(src, dir)
    const entry = path.join(fullPath, 'main.js')
    if (fs.statSync(fullPath).isDirectory() && fs.existsSync(entry)) {
      const page = Object.create(PAGE)
      const template = path.join(fullPath, 'index.html')
      if (fs.existsSync(template)) {
        page.template = template
      }
      page.filename = `${dir}.html`
      page.entry = entry
      page.chunks.push(dir)
      pages[dir] = page
    }
  }
  return pages
}, {
  index: {
    ...PAGE,
    entry: `${src}/main.js`,
    chunks: ['chunk-vendors', 'chunk-common', 'index']
  }
})

module.exports = {
  outputDir: path.join(__dirname, __build__),
  pages
}
