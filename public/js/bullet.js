/**
 * todo:给炮添加一个战力值
 * @param res
 * @param cannonType
 * @constructor
 */


function Bullet(res,cannonType){
    this.img = res['bullet'];
    Sprite.call(this,this.img);
    this._size = [
        null,
        {w:23,h:26,sx:85,sy:0},
        {w:26,h:29,sx:60,sy:0},
        {w:29,h:34,sx:30,sy:81},
        {w:29,h:34,sx:0,sy:82},
        {w:31,h:35,sx:28,sy:0},
        {w:31,h:38,sx:0,sy:44},
        {w:29,h:44,sx:0,sy:0}
    ];
    this.type = cannonType;
    this.collision = false;
    this.w = this._size[cannonType].w;
    this.h = this._size[cannonType].h;
    this.width = this.w;
    this.height = this.h;
    this.sx = this._size[cannonType].sx;
    this.sy = this._size[cannonType].sy;
    this.speed = 3;


}

Bullet.prototype = Object.create(Sprite.prototype);
Bullet.prototype.constructor = Bullet;