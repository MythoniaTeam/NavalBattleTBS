/* textures存储是所有贴图文件路径的对象（当作字典来用），加载后填入Image对象
 * 索引代表文件名，值（数字）代表后缀名（0：svg，1：png）
 * sounds类似textures，不过存储的是音效，music存储的则是背景音乐
 * 后缀名0：mp3，1：wav
 */

var textures = {
    Mask: {
        Black: 1,
        White: 1
    },
    MythoniaTeam: {
        Background: 0,
        Dimming: 0,
        Glowing: 0
    }
};

var sounds = {
    Click: 0
};

var music = {
    Test: 0
};

function getAmount(obj) {
    //获取一个树结构对象所含成员的数量
    var count = 0;
    for (var i in obj) {
        if (typeof obj[i] == "object" && obj[i] != null) {
            count += getAmount(obj[i]);
        } else {
            count += 1;
        };
    };
    return count;
};

assetAmount = getAmount(textures) + getAmount(sounds) + getAmount(music);
loadedAssetAmount = 0;

function onloadAsset() {
    console.log("Loading assets : " + ++loadedAssetAmount + "/" + assetAmount);
    if (loadedAssetAmount == assetAmount) {
        var b = document.getElementById("startGame");
        b.innerHTML = "点此开始游戏";
        b.onclick = function() {
            this.style.display = "none";
            main();
        }
    };
};

//——————分割线——————

function loadTextures(textureDict, path) {
    for (var i in textureDict) {
        if (typeof textureDict[i] == "number") {
            img = new Image();
            img.onload = onloadAsset;
            img.src = path.join("/") + "/" + i + [".svg", ".png"][textureDict[i]];
            textureDict[i] = img;
        } else if (typeof textureDict[i] == "object") {
            path.push(i);
            loadTextures(textureDict[i], path);
            path.pop();
        };
    };
};

function loadSounds(soundDict, path) {
    for (var i in soundDict) {
        if (typeof soundDict[i] == "number") {
            var sound = new Audio();
            sound.oncanplaythrough = onloadAsset;
            sound.src = path.join("/") + "/" + i + [".mp3", ".wav"][soundDict[i]];
            soundDict[i] = sound;
        } else if (typeof soundDict[i] == "object") {
            path.push(i);
            loadSounds(soundDict[i], path);
            path.pop();
        };
    };
};

function loadMusic(musicList) {
    for (var i in musicList) {
        var mus = new Audio();
        mus.loop = "loop";
        mus.src = "assets/music/" + i + ".mp3";
        mus.oncanplaythrough = onloadAsset;
        musicList[i] = mus;
    };
};

function loadAssets() {
    loadTextures(textures, ["assets", "textures"]);
    loadSounds(sounds, ["assets", "sounds"]);
    loadMusic(music);
}
