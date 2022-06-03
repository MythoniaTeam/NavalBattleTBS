function getHoverdGrid(cp, a) {
    //根据光标位置算出光标所在的格子在棋盘中的坐标
    //cp = cursor position
    //a是正六边形边长的一半
    var tp = new Vector((cp.x / Math.sqrt(3) * a + (cp.y / a - 2) / 3) / 2 - 1, (cp.y / a - 2) / 3);
    var gp = new Vector(Math.round(tp.x), Math.round(tp.y));//grid position
    //transformed position，把光标坐标转换到棋盘坐标系
    var lines = {
        k: {k: 0, b: gp.y},
        l: {k: -1, b: gp.x + gp.y},
        m: {k: 0.5, b: -0.5 * gp.x + g.y + 0.5},
        n: {k: 2, b: -2 * gp.x + gp.y + 1},
        p: {k: 0.5, b: -0.5 * gp.x + g.y - 0.5},
        q: {k: 2, b: gp.x + gp.y - 1}
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