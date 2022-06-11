class Sprite {
    //这是一个抽象类
    constructor(transform) {
        this.transform = transform;
        this.texture = null; //通常是textures的一个节点
        this.sound = null; //通常是sounds的一个节点
        this.behavior = {
            //是一系列在update()时可能调用的函数
        };
        this.currentBehavior = this.behavior.default; //当前的behavior
        this.effects = new SpriteEffects();
        this.type = "Sprite";
        this.timer = 0; //旧称frameCounter，每帧增加1
        this.toBeRemove = false;
        this.parts = new SpriteTable();
        this.init();
    }

    init() {} //相当于另一个constructor

    update() {
        //每一帧都会调用此函数
        this.currentBehavior();
        this.parts.update();
        this.timer++;
    }

    draw(texture = this.texture, transform = this.transform, effects = this.effects) {
        //向缓冲区添加一个新的图像（以sprite方式）
        canvasBuffer.add(new DrawRequest(texture, transform, effects, "sprite"));
    }

    drawUI(texture = this.texture, transform = this.transform, effects = this.effects) {
        //向缓冲区添加一个新的图像（以ui方式）
        canvasBuffer.add(new DrawRequest(texture, transform, effects, "ui"));
    }
    
    playSound(sound = this.sound, volume = options.volume.SE) {
        //播放一个音效
        sound.volume = Math.max(0, Math.min(1, Math.pow(0.8, 10 - volume)));
        sound.play();
    }

    behave(behavior = this.behavior.default, condition = true) {
        //更改behavior并重设计时器，condition只是一个类似语法糖的东西而已
        if (condition) {
            this.currentBehavior = behavior;
            this.timer = -1;
        }
    }

    behaveWhen(behavior, time) {
        //类似语法糖的方法，在time时刻（第time帧）切换到指定behavior
        this.behave(behavior, this.timer == time);
    }

    remove() {
        //移除这个sprite，但并不立即停止此sprite的运行
        this.toBeRemove = true;
    }
    
    removeWhen(time) {
        //语法糖，在time时刻（第time帧）移除此实体
        if (this.timer == time) {
            this.remove();
        }
    }
};


class SpriteTable {
    //一个用于存储一系列Sprite并管理和运行它们的表，可以是树结构的
    constructor() {
        this.toBeRemove = false;
    }

    update() {
        for (var i in this) {
            if (typeof this[i] == "object") {
                this[i].update();
                if (this[i].toBeRemove) {
                    delete this[i];
                }
            }
        }
    }
}


class SpriteList {
    //类似SpriteTable，不过采用数组存储，但仍能继续嵌套SpriteList
    //适合存储一系列数量未知且行为相似的Sprite（如敌怪、弹幕等）
    constructor() {
        this.list = [];
        this.toBeRemove = false;
    }

    update() {
        for (i = 0; i < this.list.length; i++) {
            this.list[i].update();
            if (this.list[i].toBeRemove) {
                this.list.splice(i, 1);
            }
        }
    }
}


class SpriteEffects {
    //用于保存一系列特效——如亮度、虚像等——的数值
    constructor(brightness = 0, ghost = 0) {
        this.brightness = brightness;
        this.ghost = ghost;
    }
}


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
