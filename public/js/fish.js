
/**
 *
 * 常用参数
 * 绘制图片
 * todo:添加每条鱼的血量
 * todo:每种鱼的金币数量的定义
 *
 */
function Fish(res,type){

    this.img = res['fish'+type];//获取鱼的对象

    Sprite.call(this,this.img);

    this._size = [
        null,
        {w:37,h:55},
        {w:64,h:78},
        {w:56,h:72},
        {w:59,h:77},
        {w:122,h:107}
    ];
    this.w = this._size[type].w;//获取鱼的宽度
    this.h = this._size[type].h;//获取鱼的高度
    this.width = this.w;
    this.height = this.h;
    this.y = rnd(0,500);
    this.rotate = rnd(60,120);
    this.die = this.w*5;
}

Fish.prototype = Object.create(Sprite.prototype);
Fish.prototype.constructor = Fish;
Fish.prototype.swimming = function(){
    this.sx+=this.w;
    if(this.sx>=this.w*4){
        this.sx = 0;
    }
};
Fish.prototype.dieFn = function () {
    this.die += this.w;
    this.opacity -= 0.08;
    if(this.die>=this.w*8){
        this.die = this.w*5;
    }
    if(this.opacity<=0){
        this.visible = false;
    }
    this.sx = this.die;
};