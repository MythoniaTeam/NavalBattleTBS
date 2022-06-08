class Vector {
    //3维向量或坐标，也可以当作2维向量或坐标来使用
    //所有方法都会返回新对象，而不是改变原本的值

    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    plus(v) {
        //加法
        return new Vector(this.x + v.x, this.y + v.y, this.z + v.z);
    }

    minus(v) {
        //减法
        return new Vector(this.x - v.x, this.y - v.y, this.z - v.z);
    }

    dot(v) {
        //数量积（点积）
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }

    module() {
        //取模
        return Math.sqrt(this.x ^ 2 + this.y ^ 2 + this.z ^ 2);
    }

    scale(s) {
        //数乘或者缩放，可接受数字或向量
        if (s.x != undefined && s.y != undefined && s.z != undefined) {
            return new Vector(this.x * s.x, this.y * s.y, this.z * s.z);
        } else {
            return new Vector(this.x * s, this.y * s, this.z * s);
        }
    }

    arc() {
        //xy平面上的方向（弧度制）
        return Math.atan2(this.y, this.x);
    }

    angle() {
        //xy平面上的方向（角度制）
        return this.arc() * (180 / Math.PI);
    }
};

class Transform {
    //类似隔壁unity的transform
    constructor(position = new Vector(), scale = new Vector(1, 1), direction = 0) {
        this.position = position;
        this.scale = scale;
        this.direction = direction;
        //方向为弧度制
    };

    moveTo(p = new Vector()) {
        //移动（坐标）
        this.position = p;
    }

    moveBy(v) {
        //移动（向量）
        this.position = this.position.plus(v);
    }

    scaleTo(s = new Vector(1, 1)) {
        //设定缩放倍数
        this.scale = s;
    }

    scaleByA(s = 0) {
        //按加值缩放
        if (s.x != undefined && s.y != undefined && s.z != undefined) {
            this.scale = this.scale.plus(s);
        } else {
            this.scale = this.scale.plus(new Vector(s, s))
        };
    }

    scaleByM(s = 1) {
        //按倍数缩放
        this.scale = this.scale.scale(s);
    }

    rotateToArc(a) {
        //旋转到指定弧度
        this.direction = a;
    }

    rotateToAngle(a) {
        //旋转到指定角度
        this.rotateToArc(a * (Math.PI / 180));
    }
    
    rotateByArc(a) {
        //旋转指定弧度
        this.rotateToArc(this.direction + a);
    }
    
    rotateByAngle(a) {
        //旋转指定角度
        this.rotateByArc(a * (Math.PI / 180));
    }
};
