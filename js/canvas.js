var ctx = document.getElementById("canvas").getContext("2d");

class Vector {
    //2维向量或坐标
    //所有方法都会返回新对象，而不是改变原本的值

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    plus(v) {
        //加法
        return new Vector(this.x + v.x, this.y + v.y);
    }

    minus(v) {
        //减法
        return new Vector(this.x - v.x, this.y - v.y);
    }

    dot(v) {
        //数量积（点积）
        return this.x * v.x + this.y * v.y;
    }

    module() {
        //取模
        return Math.sqrt(this.x ^ 2 + this.y ^ 2);
    }

    scale(x) {
        //数乘或者缩放，可接受数字或向量
        if (x.x != undefined && x.y != undefined) {
            return new Vector(this.x * x.x, this.y * x.y);
        } else {
            return new Vector(this.x * x, this.y * y);
        }
    }

    arc() {
        //方向（弧度制）
        return Math.atan2(this.y, this.x);
    }

    angle() {
        //方向（角度制）
        return this.arc() * (180 / Math.PI);
    }
}

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
