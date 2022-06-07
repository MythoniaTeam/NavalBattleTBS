var ctx = document.getElementById("canvas").getContext("2d");

var cameraSize = new Vector(1600, 900);
//摄像机能“拍到”的“视野”大小
var canvasSize = new Vector(1080, 720);
//HTML上<canvas>的分辨率，Camera“拍到”的东西会拉伸填充到此处

class Camera {
    //摄像机类

    constructor(p = new Vector(), s = 0) {
        //Vector p, Number s
        this.position = p;
        this.scale = s;
    }

    moveTo(p = new Vector()) {
        //移动摄像机（坐标）
        this.position = p;
    }

    moveBy(v) {
        //移动摄像机（向量）
        this.position += this.position.plus(v);
    }

    scaleTo(scale = 1) {
        //设定缩放倍数
        this.scale = scale;
    }

    scaleByAddend(addend) {
        //按加值缩放
        this.scale += addend;
    }

    scaleByMultiple(multiple) {
        //按倍数缩放
        this.scale *= multiple;
    }

    getPosition(p) {
        //获取p点在canvas上的位置（转换为屏幕坐标系）
        var s = new Vector(canvasSize.x / cameraSize.x, canvasSize.y / cameraSize.y);
        var x = s * (cameraSize.x / 2 + this.scale * (p.x - this.position.x));
        var y = s * (cameraSize.y / 2 - this.scale * (p.y - this.position.y));
        return new Vector(x, y);
    }
}

var defaultCamera = new Camera();
