ctx = document.getElementById("canvas").getContext("2d");

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

    scalarMultiplication(multiple) {
        //数乘
        return new Vector(this.x * multiple, this.y * multiple);
    }

    innerProduct(v) {
        //数量积
        return this.x * v.x + this.y * v.y;
    }

    module() {
        //取模
        return Math.sqrt(this.x ^ 2 + this.y ^ 2);
    }

    scale(v) {
        //以一个向量进行缩放
        return new Vector(this.x * v.x, this.y * v.y);
    }

    arc() {
        //角度（弧度制）
        return Math.atan2(this.y, this.x)
    }

    angle() {
        //角度（角度制）
        return this.arc() * (180 / Math.PI)
    }
}

var cameraSize = new Vector(1600, 900);
//摄像机能“拍到”的“视野”大小
var canvasSize = new Vector(1080, 720);
//HTML上<canvas>的分辨率，Camera“拍到”的东西会拉伸填充到此处

class Camera {
    //摄像机类

    constructor(p = new Vector(), scale = 0) {
        //Vector p, Number scale
        this.p = p;
        this.scale = scale;
    }

    moveTo(p = new Vector()) {
        //移动摄像机（坐标）
        this.p = p
    }

    moveBy(v) {
        //移动摄像机（向量）
        this.p += this.p.plus(v)
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
        //获取p点在canvas上的位置（转换为绘图坐标系）
        var s = new Vector(canvasSize.x / cameraSize.x, canvasSize.y / cameraSize.y);
        var x = s * (cameraSize.x / 2 + this.scale * (p.x - this.p.x));
        var y = s * (cameraSize.y / 2 - this.scale * (p.y - this.p.y));
        return new Vector(x, y);
    }

}

defaultCamera = new Camera();
