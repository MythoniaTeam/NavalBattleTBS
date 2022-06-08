class Beginning extends Sprite {
    //开场动画
    constructor(isPart = false) {
        super(new Transform(new Vector(), new Vector(10, 10)));
        this.type = "beginning";
        this.texture = textures.MythoniaTeam;
        this.sound = sounds.click;
        if (!isPart) {
            this.parts = {
                td: new Beginning(true),
                tg: new Beginning(true)
            };
        }
    }

    update(t) {
        var g = Math.max((t - 240) / 60, 0);
        this.draw(this.texture.Background, this.transform, g, "ui");
        this.parts.td.update_dimming(t);
        this.parts.tg.update_glowing(t);
        if (t >= 300) {
            this.remove();
        }
    }

    update_dimming(t) {
        if (10 <= t && t < 100) {
            //10 ~ 50 - 淡入
            //50 ~ 100 - 静止
            var g = Math.max((50 - t) / 40, 0);
            this.draw(this.texture.Dimming, this.transform, g, "ui");
        }
    }

    update_glowing(t) {
        if (94 <= t && t < 180) {
            //94 ~ 100 - 淡入
            //100 ~ 180 - 静止
            var g = Math.max((94 - t) / 6, 0);
            this.draw(this.texture.Glowing, this.transform, g, "ui");
            if (t == 94) {
                this.sound.play();
                console.log(1)
            }
        } else if (180 <= t && t < 240) {
            //淡出
            var g = Math.max((t - 180) / 60, 0);
            this.draw(this.texture.Glowing, this.transform, g, "ui");
        }
    }
};
