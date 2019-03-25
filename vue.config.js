const fs = require('fs')
const path = require('path')

const examples = path.join(__dirname, 'examples')

const __build__ = '__build__'

const PAGE = {
  title: 'Vue Attache Example',
  template: path.join(examples, 'index.html'),
  chunks: ['chunk-vendors', 'chunk-common', 'index']
}

module.exports = {

  outputDir: `${examples}/${__build__}`,

  pages: fs.readdirSync(examples).reduce((pages, dir) => {
    if (dir !== __build__) {
      const fullPath = path.join(examples, dir)
      const entry = path.join(fullPath, 'main.js')
      if (fs.statSync(fullPath).isDirectory() && fs.existsSync(entry)) {
        const page = Object.create(PAGE)
        const template = path.join(fullPath, 'index.html')
        if (fs.existsSync(template)) {
          page.template = template
        }
        page.filename = `${dir}.html`
        page.entry = entry
        pages[dir] = page
      }
    }
    return pages
  }, {
    index: {
      ...PAGE,
      entry: `${examples}/main.js`,
    }
  }),

  configureWebpack: {
    resolve: {
      alias: {
        'vue-attache': path.join(__dirname, 'src')
      }
    },
  },
}
