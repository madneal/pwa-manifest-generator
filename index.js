const path = require('path')
const mime = require('mime')
const jimp = require('jimp')

function PwaManifestGenerator(options) {
    this.options = Object.assign({
        filename: 'manifest.json',
        orientation: 'portrait',
        display: 'standalone',
        start_url: 'index.html',
        icons: []
    }, options || {})

    const defaultIconSizes = [48, 72, 96, 144, 168, 192]
    if (typeof this.options.icon === 'string') {
        this.options.icon = {
            src: this.options.icon,
            sizes: defaultIconSizes
        }
    }
}

PwaManifestGenerator.prototype.apply = function(compiler) {
    let self = this;
    compiler.plugin('emit', function(compilation, callback) {
        if (self.options.icon) {
            self.getIcons(compiler, compilation, function() {
                self.createManifest(compilation)
                callback()
            })
        } else {
            self.createManifest(compilation)
            callback
        }
    })
}

PwaManifestGenerator.prototype.createManifest = function(compilation) {
    const filename = this.options.filename
    let contents = Object.assign({}, this.options)
    delete contents.filename
    delete contents.icon

    compilation.assets[filename] = {
        source: function() {
            return JSON.stringify(contents, null, 2)
        },
        size: function() {
            return JSON.stringify(contents).length
        }
    }
}

PwaManifestGenerator.prototype.getIcons = function(compiler, compilation) {
    let self = this
    let sizes = this.options.icon.sizes.slice()
    let src = this.options.icon.src
    let outputPath = compiler.options.output.path

    function resize(image, sizes) {
        const type = mime.lookup(src)
        const ext = mime.extension(type)
        const size = sizes.pop()
        const filename = 'icon-' + size + 'x' + size + '.' + ext
        self.options.icons.push({
            src: filename,
            sizes: size + 'x' + size,
            type: type
        })

        image.resize(size, size, function(err, image) {
            image.getBuffer(ext, function(err, buffer) {
                compilation.assets[filename] = {
                    source: function() {
                        return buffer
                    },
                    size: function() {
                        return buffer.length
                    }
                }
                if (sizes.length) {
                    resize(image, sizes)
                } else {
                    callback()
                }
            })
        })
    }

    if (src && Array.isArray(sizes) && !!sizes.length) {
        this.options.icons = []

        jimp.read(src, function(err, image) {
            resize(image, sizes)
        })
    } else {
        callback()
    }
}

module.exports = PwaManifestGenerator