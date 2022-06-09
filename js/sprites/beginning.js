class Beginning extends Sprite {
    //开场动画
    
    constructor(isPart = false, name = null) {
        super(new Transform(new Vector(-8, 15), new Vector(7.4, 7.4)));
        this.type = "beginning";
        this.texture = textures.MythoniaTeam;
        this.sound = sounds.click;
        this.isPart = isPart;
        if (!isPart) {
            this.parts = {
                td: new Beginning(true, "dim"),
                tg: new Beginning(true, "glow"),
                ts: new Beginning(true, "shine"),
                tcw: new Beginning(true, "coverWhite"),
            };
        }
        else {
            this.type += '.' + name;
            this.name = name;
            if (name == "coverWhite")
                this.gProcessFunc = function (g) {
                    var coverWhiteGhost = 0.68;
                    return g * (1 - coverWhiteGhost) + coverWhiteGhost;
                }
            else this.gProcessFunc = null;
        }
        //黑幕的Transform
        //this.coverTransform = new Transform()
     }

    
    time = {
        /*
         * In - 开始渐入
         * InEnd - 结束渐入, 开始展示
         * Out - 展示结束, 开始渐出
         * OutEnd - 渐出结束, 无需再绘制该对象
         */

        dimIn: 10,
        dimInEnd: 60,
        dimOut: 100,
        dimOutEnd: 100,

        shineIn: 96,
        shineInEnd: 100,
        shineOut: 108,
        shineOutEnd: 138,

        coverWhiteIn: 96,
        coverWhiteInEnd: 100,
        coverWhiteOut: 102,
        coverWhiteOutEnd: 110,

        glowIn: 100,
        glowInEnd: 100,
        glowOut: 288,
        glowOutEnd: 378,

        duration(actionName) {
            return this[actionName + "End"] - this[actionName];
        }
    }


    
    update(t) {
        if (!this.isPart) {
            this.draw(this.texture.CoverBlack, this.transform, 0, "ui");
            this.parts.td.update(t);
            this.parts.tg.update(t);
            this.parts.ts.update(t);
            this.parts.tcw.update(t);
        }
        else {
            this.animation(t, this.name, this.gProcessFunc);
        }
    }



    calGhostApper(tNow, tStart, tEnd) {
        //返回渐入的虚像值
        return tNow >= tEnd ? 0
            : tNow < tStart ? 1
            : (tEnd - tNow) / (tEnd - tStart)
    }

    calGhostDisapper(tNow, tStart, tEnd) {
        //返回渐出的虚像值
        return tNow >= tEnd ? 1
            : tNow < tStart ? 0
            : (tNow - tStart) / (tEnd - tStart);
    }

    animation(t, name, gProcessFunc = null) {
        //传入名字, 和一个用于处理 虚像值 的函数

        if (this.time[name + "In"] <= t && t < this.time[name + "OutEnd"]) {
            //渐入
            if (t < this.time[name + "InEnd"])
                var g = this.calGhostApper(t, this.time[name + "In"], this.time[name + "InEnd"]);

            //渐出
            else if (this.time[name + "Out"] <= t)
                var g = this.calGhostDisapper(t, this.time[name + "Out"], this.time[name + "OutEnd"]);
            
            else
                var g = 0;

            if (gProcessFunc != null) g = gProcessFunc(g);

            
            this.draw(this.texture[name[0].toUpperCase() + name.substring(1)], this.transform, g, "ui");
        }
    }

};
