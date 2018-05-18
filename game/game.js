class Game {
    constructor(fps, images, runCallback) {
        window.fps = fps
        this.images = images
        this.runCallback = runCallback

        //
        this.scene = null
        this.canvas = document.querySelector('#id-canvas')
        this.context = this.canvas.getContext('2d')

        this.actions = {}
        this.keydowns = {}

        // events
        window.addEventListener('keydown', event => {
            log('event.key', event.key)
            this.keydowns[event.key] = true
        })
        window.addEventListener('keyup', event => {
            this.keydowns[event.key] = false
        })

        this.init()
    }

    //
    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }

    runWithScene(scene) {
        var g = this
        g.scene = scene

        setTimeout(function() {
            g.runloop()
        }, 1000/window.fps)
    }

    runloop() {
        var g = this
        var actions = Object.keys(g.actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            if (g.keydowns[key]) {
                g.actions[key]()
            }
        }
        // update
        g.update()
        // clear
        g.context.clearRect(0, 0, g.canvas.width, g.canvas.height)
        //
        g.draw()
        // new run loop
        setTimeout(function() {
            g.runloop()
        }, 1000/window.fps)
    }

    // update
    update() {
        this.scene.update()
    }

    // draw
    draw() {
        this.scene.draw()
    }

    //
    registerAction(key, callback) {
        this.actions[key] = callback
    }

    __start(scene) {
        this.runCallback(this)
    }

    replaceScene(scene) {
        this.scene = scene

    }

    imageByName(name) {
        var g = this
        var img = g.images[name]
        return img
    }

    drawImage(element) {
        var img = element.image
        this.context.drawImage(img.texture, element.x, element.y, element.w, element.h)
    }

    init() {
        var g = this
        var loads = []

        var names = Object.keys(g.images)
        for (var i = 0; i < names.length; i++) {
            let name = names[i]
            var path = g.images[name]

            let img = new Image()
            img.src = path
            img.onload = function() {
                g.images[name] = img
                loads.push(1)
                if (loads.length == names.length) {
                    g.__start()
                }
            }
        }
    }
}
