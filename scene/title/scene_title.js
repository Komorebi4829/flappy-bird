class SceneTitle extends Scene {
    constructor(game) {
        super(game)

        this.addBackground()
        this.addPipes()
        this.addLand()
        this.addBird()
        this.addScoresBord()
        this.addStartPicture()
        this.addGameOver()

        this.setup()

        game.registerAction('j', function(){
            var s = SceneMain.new(game)
            game.replaceScene(s)
        })
    }

    setup() {
        var game = this.game
        window.paused = true
        this.skipCount = 10
        this.end = false

        var firstPipe = this.pipes.pipes[0]
    }

    addStartPicture() {
        var game = this.game
        this.ready = GameImage.new(game, 'ready')
        this.ready.x = 100
        this.ready.y = 260

        this.addElement(this.ready)
    }
    addGameOver() {
        var game = this.game
        this.textGameOver = GameImage.new(game, 'game_over')
        this.textGameOver.x = 100
        this.textGameOver.y = 200

        this.restart = GameImage.new(game, 'restart')
        this.restart.x = 110
        this.restart.y = 280
        this.restart.w = this.restart.texture.width
        this.restart.h = this.restart.texture.height

        this.share = GameImage.new(game, 'share')
        this.share.x = 210
        this.share.y = 280
    }

    addScoresBord() {
        var game = this.game
        this.scores = Scores.new(game)
        // this.bg.w = 400
        // this.bg.h = 600
        this.addElement(this.scores)
    }

    addBackground() {
        var game = this.game
        this.bg = GameImage.new(game, 'background')
        this.bg.x = 0
        this.bg.y = 0
        this.bg.w = 400
        this.bg.h = 600
        this.addElement(this.bg)
    }

    addPipes() {
        var game = this.game
        this.pipes = Pipes.new(game)
        this.addElement(this.pipes)
    }

    addLand() {
        var game = this.game
        this.land = GameImage.new(game, 'land')
        this.land.x = 0
        this.land.y = 500
        this.land.w = 700
        this.land.h = 100
        this.addElement(this.land)
    }

    addBird() {
        var game = this.game
        this.bird = Bird.new(game)
        this.bird.x = 100
        this.bird.y = 200
        this.bird.update = function() {
            var game = this.game
            this.frameCount--
            if (this.frameCount == 0) {
                this.frameCount = 3
                this.frameIndex = (this.frameIndex + 1) % this.frames().length
                this.texture = this.frames()[this.frameIndex]
                this.image.texture = this.texture
            }
        }
        this.addElement(this.bird)
    }

    static new(...args) {
        this.i = new this(...args)
        return this.i
    }

    draw() {
        super.draw()
    }

    update() {

        super.update()

        // land scrop
        this.skipCount--
        var offset = -5
        if (this.skipCount == 0) {
            this.skipCount = 10
            offset = 45
        }

        this.land.x += offset

        var birdX = this.bird.x

        for (var i = 0; i < this.pipes.columsOfPipe; i++) {
            var index = i * 2
            var p1 = this.pipes.pipes[index]
            var p2 = this.pipes.pipes[index+1]

            if (birdX > p1.x && birdX < p1.x + p1.w) {
                this.currentPipeX = true
                this.currentPipe = p1
            }
        }
        if (this.currentPipeX && birdX >= this.currentPipe.x + this.currentPipe.w) {
            this.currentPipeX = false
            this.scores.scores += 1
            log('scores', this.scores.scores)
        }
    }
}
