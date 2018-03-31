

function Cannon(res,type){
    this.img = res['cannon'+type];
    Sprite.call(this,this.img);
    this._size = [
        null,
        {w:74,h:74},
        {w:74,h:76},
        {w:74,h:76},
        {w:74,h:83},
        {w:74,h:85},
        {w:74,h:90},
        {w:74,h:94}
    ];
    this.w = this._size[type].w;
    this.h = this._size[type].h;
    this.width = this.w;
    this.height = this.h;
    this.rotate = 0;
}

Cannon.prototype = Object.create(Sprite.prototype);
Cannon.prototype.constructor = Cannon;