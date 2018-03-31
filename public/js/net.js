/**
 * 渔网类
 * @constructor
 */


function Net(res,netType){
    this.img = res['net'];//获取鱼的对象
    Sprite.call(this,this.img);
    this._size = [
        null,
        {w:98,h:92,sx:328,sy:370},
        {w:137,h:137,sx:0,sy:400},
        {w:140,h:140,sx:173,sy:363},
        {w:174,h:170,sx:0,sy:231},
        {w:186,h:162,sx:228,sy:189},
        {w:207,h:189,sx:228,sy:0},
        {w:228,h:234,sx:0,sy:0}
    ];
    this.w = this._size[netType].w;
    this.h = this._size[netType].h;
    this.width = this.w;
    this.height = this.h;
    this.sx = this._size[netType].sx;
    this.sy = this._size[netType].sy;
    this.speed = 3;
}
Net.prototype = Object.create(Sprite.prototype);
Net.prototype.constructor = Net;
Net.prototype.hide = function () {
    this.opacity -= 0.01;
    if(this.opacity <= 0){
        this.visible = false;
    }
};