var frameDelay = 17;
//每两帧之间的最小时间间隔（毫秒）
var fps = 1000 / frameDelay;
//fps指示器

var spriteList = {
    //存放所有正在运作的sprite
    sprites: [],

    clear: function() {
        //直接删除所有sprite
        this.sprites.length = 0;
    },

    add: function(sprite) {
        //添加一个新的sprite
        this.sprites.push(sprite);
    },

    update: function() {
        //更新所有sprite
        for (i = 0; i < this.sprites.length; i++) {
            var s = this.sprites[i];
            s.update(s.frameCounter);
            s.clearParts();
            if (s.toBeRemove) {
                this.sprites.splice(i, 1);
            };
            s.frameCounter++;
        };
    }
};

function update() {
    //进行一帧的更新
    var t = new Date().getTime();
    spriteList.update();
    ctx.clearRect(0, 0, canvasSize.x, canvasSize.y);
    canvasBuffer.draw();
    t = new Date().getTime() - t;
    setTimeout(update, frameDelay - t);
    fps = t <= frameDelay ? 1000 / frameDelay : 1000 / t;
}

function main() {
    console.log("Loading complete.");
    spriteList.add(new Beginning());
    update();
};