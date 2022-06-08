class Sprite {
    //这是一个抽象类
    constructor(transform) {
        this.transform = transform;
        this.texture = null;//通常是textures的一个节点
        this.sound = null;//通常是sounds的一个节点
        this.type = "_sprite";
        this.frameCounter = 0;//第一帧为0，每次更新都会增加1
        this.toBeRemove = false;
        this.parts = {};
    }

    update(t) {}//每一帧都会调用此函数，t相当于this.frameCounter

    draw(texture, transform = this.transform, ghost = 0, mode = "sprite") {
        //向缓冲区添加一个新的图像
        //ghost为透明度，取值范围[0,1]
        canvasBuffer.add(new DrawRequest(texture, transform, ghost, mode));
    }

    remove() {
        //移除这个sprite，但并不立即停止此sprite的运行
        this.toBeRemove = true;
    }
    
    clearParts() {
        //移除parts中所有需要移除的Sprite
        function f(obj) {
            for (var i in obj) {
                if (typeof obj[i] == Object && obj[i] != null) {
                    f(obj[i]);
                } else {
                    if (obj[i].toBeRemove) {
                        if (Array.isArray(obj)) {
                            obj.splice(i, 1);
                        } else {
                            delete obj[i];
                        }
                    }
                }
            }
        };
        f(this.parts);
    }
};

spriteClasses = [
    //要加载的所有sprite
    "beginning"
];

for (i = 0; i < spriteClasses.length; i++) {
    //加载所有sprite类
    console.log("loading sprite: " + spriteClasses[i]);
    var script = document.createElement("script");
    script.src = "js/sprites/" + spriteClasses[i] + ".js";
    document.head.appendChild(script);
};