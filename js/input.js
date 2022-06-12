var keyState = [];
//存储每个按键的状态
//等于0为静息状态
//大于0为正在被按下，数值为按下持续的帧数
//小于0为被松开的一瞬间，数值为松开前按下持续的帧数
for (var i = 0; i < 256; i++) {
    keyState.push(0);
};

keyStateBuffer = {
    //onkeydown和onkeyup事件所检测到的按键状态变化将缓冲到此处
    down: [],
    up: []
};

function onKeyDown(event) {
    if (!(event.isComposing || event.keyCode === 229)) {
        keyStateBuffer.down.push(event.keyCode);
    }
};

function onKeyUp(event) {
    if (!(event.isComposing || event.keyCode === 229)) {
        keyStateBuffer.up.push(event.keyCode);
    }
};

function updateKeyState() {
    for (var i = 0; i < keyState.length; i++) {
        if (keyState[i] > 0) {
            keyState[i]++;
        } else if (keyState[i] < 0) {
            keyState[i] = 0;
        };
    };
    for (var i = 0; i < keyStateBuffer.down.length; i++) {
        keyState[keyStateBuffer.down.pop()] = 1;
    };
    for (var i = 0; i < keyStateBuffer.up.length; i++) {
        keyState[keyStateBuffer.up.pop()] *= -1;
    };
    //以下为调试用代码
    var s = "";
    for (var i = 0; i < keyState.length; i++) {
        if (keyState[i] != 0) {
            s += "<li>key " + i + ":" + keyState[i] + "</li>"
        };
    };
    document.getElementById("keyMonitor").innerHTML = s;
}

document.onkeydown = onKeyDown;
document.onkeyup = onKeyUp;

function getHoverdGrid(cp, a) {
    //根据光标位置算出光标所在的格子在棋盘中的坐标
    //cp = cursor position
    //a是正六边形边长的一半
    var tp = new Vector((cp.x / Math.sqrt(3) * a + (cp.y / a - 2) / 3) / 2 - 1, (cp.y / a - 2) / 3);
    var gp = new Vector(Math.round(tp.x), Math.round(tp.y)); //grid position
    //transformed position，把光标坐标转换到棋盘坐标系
    var lines = {
        k: {
            k: 0,
            b: gp.y
        },
        l: {
            k: -1,
            b: gp.x + gp.y
        },
        m: {
            k: 0.5,
            b: -0.5 * gp.x + g.y + 0.5
        },
        n: {
            k: 2,
            b: -2 * gp.x + gp.y + 1
        },
        p: {
            k: 0.5,
            b: -0.5 * gp.x + g.y - 0.5
        },
        q: {
            k: 2,
            b: gp.x + gp.y - 1
        }
    };

    function f(l) {
        //算出点tp是否在一条直线（点斜式）的上方
        return tp.y > l.k * tp.x + l.b;
    };

    var offset = new Vector();

    if (f(lines.k)) {
        if (f(lines.l)) {
            if (f(lines.m)) {
                offset = new Vector(0, 1);
            }
        } else {
            if (f(lines.n)) {
                offset = new Vector(-1, 0);
            }
        }
    } else {
        if (f(lines.l)) {
            if (!f(lines.q)) {
                offset = new Vector(1, 0);
            }
        } else {
            if (!f(lines.p)) {
                offset = new Vector(0, -1);
            }
        }
    };

    return gp.plus(offset);
}
