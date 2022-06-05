/* textures存储是所有贴图文件路径的对象（当作字典来用），加载后字符串变为Image对象
 * 一表两用，这也算是一种偷懒吧（其实主要是为了编辑器的自动填充）。请拿好你的降压药
 * 贴图采用svg格式
 * sounds类似textures，不过存储的是音效
 * music存储的则是背景音乐，这两者都采用mp3格式
 * 注意在填写字面量时只需填写文件名的字符串且不需要带拓展名
 */

var textures = {};

textureAmount = 0;
loadedTextureAmount = 0;

function onloadTexture() {
    loadedTextureAmount++;
    if (loadedTextureAmount == textureAmount) {
        loadSounds(sounds, ["..", "assets", "sounds"]);
    };
};

function loadTextures(textureDict, path) {
    for (i in textureDict) {
        if (typeof textureDict[i] == "string") {
            var img = new Image();
            img.src = textureDict[path.join("/") + textureDict[i] + ".svg"];
            img.onload = onloadTexture;
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

soundAmount = 0;
loadedSoundAmount = 0;

function onloadSound() {
    loadedSoundAmount++;
    if (loadedSoundAmount == soundAmount) {
        loadMusic();
    };
};

function loadSounds(soundDict, path) {
    for (i in soundDict) {
        if (typeof soundDict[i] == "string") {
            var sound = new Audio();
            sound.src = soundDict[path.join("/") + soundDict[i] + ".mp3"];
            sound.onload = onloadSound;
            soundDict[i] = sound;
            soundAmount++;
        } else if (typeof soundDict[i] == "object") {
            path.push(i);
            loadSounds(soundDict[i], path);
            path.pop();
        };
    };
};

//——————分割线——————

var music = [];

musicAmount = music.length;
loadedMusicAmount = 0;

function onloadMusic {
    loadedMusicAmount++;
    if (loadedMusicAmount == musicAmount) {
        main();
    };
};

function loadMusic(musicList) {
    for (i = 0; i < musicList.length; i++) {
        var mus = new Audio();
        mus.src = "../assets/backgroundMusic/" + musicList[i] + ".mp3";
        mus.onload = onloadMusic;
        musicList[i] = mus;
    };
};
