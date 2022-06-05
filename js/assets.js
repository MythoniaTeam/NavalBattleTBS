/* textures存储是所有贴图文件路径的对象（当作字典来用），加载后填入Image对象
 * 索引代表文件名，值（数字）代表后缀名（0：svg，1：png）
 * sounds类似textures，不过存储的是音效，music存储的则是背景音乐
 * 后缀名0：mp3，1：wav
 */

var textures = {
    MythoniaTeam: 0
};

textureAmount = 0;
loadedTextureAmount = 0;

function onloadTexture() {
    console.log("Loading textures : " + ++loadedTextureAmount + "/" + textureAmount);
    if (loadedTextureAmount == textureAmount) {
        main();
    };
};

function loadTextures(textureDict, path) {
    for (i in textureDict) {
        if (typeof textureDict[i] == "number") {
            img = new Image();
            img.onload = onloadTexture;
            img.src = path.join("/") + "/" + i + [".svg", ".png"][textureDict[i]];
            textureDict[i] = img;
            textureAmount++;
        } else if (typeof textureDict[i] == "object") {
            path.push(i);
            loadTextures(textureDict[i], path);
            path.pop();
        };
    };
};

//——————分割线——————

var sounds = {};

function loadSounds(soundDict, path) {
    for (i in soundDict) {
        if (typeof soundDict[i] == "number") {
            var sound = new Audio();
            sound.src = path.join("/") + "/" + i + [".mp3", ".wav"][soundDict[i]];
            soundDict[i] = sound;
        } else if (typeof soundDict[i] == "object") {
            path.push(i);
            loadSounds(soundDict[i], path);
            path.pop();
        };
    };
};

//——————分割线——————

var music = [];

function loadMusic(musicList) {
    for (i = 0; i < musicList.length; i++) {
        var mus = new Audio();
        mus.src = "../assets/backgroundMusic/" + musicList[i] + ".mp3";
        musicList[i] = mus;
    };
};
