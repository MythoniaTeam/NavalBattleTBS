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
};