class Scores {
    constructor(game) {
        this.game = game
        //
        this.setup()
    }

    static new(...args) {
        this.i = new this(...args)
        return this.i
    }

    setup() {
        var game = this.game
        this.scores = 0

        this.scoresImge = {
            '0': GameImage.new(game, 'font_0'),
            '1': GameImage.new(game, 'font_1'),
            '2': GameImage.new(game, 'font_2'),
            '3': GameImage.new(game, 'font_3'),
            '4': GameImage.new(game, 'font_4'),
            '5': GameImage.new(game, 'font_5'),
            '6': GameImage.new(game, 'font_6'),
            '7': GameImage.new(game, 'font_7'),
            '8': GameImage.new(game, 'font_8'),
            '9': GameImage.new(game, 'font_9'),
        }

        var s = this.scores.toString()
        this.images = []
        this.x = 200
        this.y = 80
        // this.w = this.image.texture.width
        // this.h = this.image.texture.height
    }

    getScoreImge(s) {
        return this.scoresImge[s]
    }

    update() {
        // 更新分数
        this.images = []
        var s = this.scores.toString()
        for( var i = 0; i < s.length; i++) {
            var num = s[i]
            var img = this.getScoreImge(num)
            this.images.push(img)
        }
    }

    draw() {
        var context = this.game.context
        var space = 20
        for (var i = 0; i < this.images.length; i++) {
            var image = this.images[i]
            var x = 200 + space * i
            var y  = 80
            context.drawImage(image.texture, x, y)
        }
    }
}
