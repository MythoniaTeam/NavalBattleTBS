var frameDelay = 17;
//每两帧之间的最小时间间隔（毫秒）
var fps = 1000 / frameDelay;
//fps指示器

var mainSpriteTable = new SpriteTable();

var options = {
    volume: {
        //音量大小，取[0,10]
        BGM: 8,//背景音乐
        SE: 8//音效
    }
}

function mainUpdate() {
    //进行一帧的更新
    var t = new Date().getTime();
    mainSpriteTable.update();
    ctx.clearRect(0, 0, canvasSize.x, canvasSize.y);
    canvasBuffer.draw();
    t = new Date().getTime() - t;
    setTimeout(mainUpdate, frameDelay - t);
    fps = 1000 / (t <= frameDelay ? frameDelay : t);
}

function main() {
    mainSpriteTable.beginning = new Beginning();
    mainUpdate();
};