class Beginning extends Sprite {
    //开场动画
    constructor() {
        super(new Transform(new Vector(), new Vector(10, 10)));
    }

    init() {
        this.type = "Beginning";
        this.texture = textures.MythoniaTeam.Background;
        this.parts.dimming = new Beginning_Dimming();
        this.parts.glowing = new Beginning_Glowing();

        this.behavior = {
            default: function() {
                this.drawUI();
                this.behaveWhen(this.behavior.fadeOut, 300);
            },

            fadeOut: function() {
                this.drawUI();
                this.effects.ghost += 1 / 60;
                this.removeWhen(60);
            }
        }

        this.behave(this.behavior.default);
    }
};


class Beginning_Dimming extends Beginning {
    init() {
        this.type = "Beginning_Dimming";
        this.texture = textures.MythoniaTeam.Dimming;
        this.effects.ghost = 1;

        this.behavior = {
            default: function() {
                this.behaveWhen(this.behavior.fadeIn, 10);
            },

            fadeIn: function() {
                this.drawUI();
                this.effects.ghost -= 0.025;
                this.removeWhen(120);
            }
        };

        this.behave();
    }
}


class Beginning_Glowing extends Beginning {
    init() {
        this.type = "Beginning_Glowing";
        this.texture = textures.MythoniaTeam.Glowing;
        this.sound = sounds.Click;
        this.effects.brightness = 0.6;
        
        this.behavior = {
            default: function() {
                this.behaveWhen(this.behavior.flash, 120)
            },

            flash: function() {
                this.drawUI();
                if (this.timer == 0) {
                    this.playSound();
                };
                if (this.effects.brightness > 0) {
                    this.effects.brightness -= 0.01;
                } else {
                    this.effects.brightness = 0;
                };
                this.behaveWhen(this.behavior.fadeOut, 120)
            },

            fadeOut: function() {
                this.drawUI();
                this.effects.ghost += 1 / 60;
                this.removeWhen(60);
            }
        };

        this.behave();
    }
};
