var canvasElement = document.getElementById("mainCanvas");
var ctx = canvasElement.getContext("2d");
var maskPainterElement = document.getElementById("maskPainter");
var maskctx = maskPainterElement.getContext("2d");
maskctx.globalCompositeOperation = "source-atop";

var cameraSize = new Vector(1600, 900);
//摄像机能“拍到”的“视野”大小
var canvasSize = new Vector(1280, 720);
//HTML上<canvas>的分辨率，Camera“拍到”的东西会拉伸填充到此处

class Camera extends Transform {
    //摄像机类，表示摄像机所处的位置
    constructor(position = new Vector(0, 0, 100), scale = new Vector(1, 1), direction = 0) {
        super(position, scale, direction);
    }

    getPosition(p) {
        //获取p点在canvas上的位置（转换为屏幕坐标系）
        var sz = 100 / this.position.z;
        var sc = new Vector(
            (canvasSize.x / cameraSize.x),
            (canvasSize.y / cameraSize.y)
        );
        var cx = p.x * this.scale.x;
        var cy = p.y * this.scale.y;
        var cc = Math.cos(this.direction);
        var cs = Math.sin(this.direction);
        var x = cameraSize.x / 2 + ((cx * cc - cy * cs) - this.position.x * this.scale.x) * sz;
        var y = cameraSize.y / 2 - ((cy * cc + cx * cs) - this.position.y * this.scale.y) * sz;
        return new Vector(x, y).scale(sc);
    }

    getScale(s) {
        //获取一个缩放为s的transform在此camera下的实际缩放
        var sc = new Vector(
            (canvasSize.x / cameraSize.x) * 100 / this.position.z,
            (canvasSize.y / cameraSize.y) * 100 / this.position.z
        );
        return new Vector(this.scale.x, this.scale.y).scale(sc).scale(s);
    }
};

var spriteCamera = new Camera();
//用于“拍摄”sprite的摄像机
var uiCamera = new Camera();
//用于“拍摄”ui的摄像机，通常不会变化以使ui绘制在屏幕上的固定位置
class DrawRequest {
    //缓冲区中的一个绘制请求
    constructor(texture, transform = new Transform(), effects = new SpriteEffects(), mode = "sprite", layer = 0) {
        this.texture = texture; //要绘制的图像
        this.transform = transform; //图像的位置、大小等信息
        this.alpha = 1 - Math.min(1, Math.max(0, effects.ghost)); //图像的不透明度
        this.brightness = effects.brightness; //没写完
        if (mode == "sprite") {
            this.camera = spriteCamera;
        } else if (mode == "ui") {
            this.camera = uiCamera;
        };
        this.layer = layer;
    }

    draw() {
        //把请求的图像绘制在画面上
        var p = this.camera.getPosition(this.transform.position);
        var s = this.camera.getScale(this.transform.scale);
        var d = this.transform.direction - this.camera.direction;
        var w = this.texture.width * s.x;
        var h = this.texture.height * s.y;
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate(-d);
        if (this.brightness == 0) {
            ctx.drawImage(this.texture, -w / 2, -h / 2, w, h);
        } else {
            var mask = this.brightness > 0 ? textures.Mask.White : textures.Mask.Black;
            maskPainterElement.width = w;
            maskPainterElement.height = h;
            maskctx.save();
            maskctx.drawImage(this.texture, 0, 0, w, h);
            maskctx.globalCompositeOperation = "source-atop";
            maskctx.globalAlpha = Math.abs(this.brightness);
            maskctx.drawImage(mask, -10, -10, w + 20, h + 20);
            ctx.drawImage(maskPainterElement, -w / 2, -h / 2);
            maskctx.restore();
        }
        ctx.restore();
    }
};

var canvasBuffer = {
    //绘制缓冲区
    requestQueue: [],
    //一帧内所有的绘制请求

    clear: function() {
        //直接清空缓冲区
        this.requestQueue.length = 0;
    },

    add: function(request) {
        //添加一个绘制请求，按图层和z坐标（先计算图层）确定绘制顺序（优先队列）
        if (this.requestQueue.length == 0) {
            this.requestQueue.push(request);
        } else {
            this.requestQueue.splice(this.requestQueue.find(function(r) {
                return r.layer >= request.layer && r.transform.position.z >= request.transform
                    .position.z;
            }), 0, request);
        };
    },

    draw: function() {
        //处理并清空缓冲区
        for (i = this.requestQueue.length - 1; i >= 0; i--) {
            this.requestQueue[i].draw();
        };
        this.clear();
    }
};
