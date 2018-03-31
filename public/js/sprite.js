/**
 * 游戏精灵
 *  属性：
 *      - 图片对象
 *      -
 *  方法：
 *      - 绘制图像
 *      - 图像移动
 * @constructor
 */

function Sprite(img){
    this.img = img;
    this.x = 0; //在canvas中的位置X
    this.y = 0; //在canvas中的位置Y
    this.w = 0; //图像宽
    this.h = 0; //图像高
    this.sx = 0; //需要绘制图片上的X坐标
    this.sy = 0; //需要绘制图片上的Y坐标
    this.width = 0;//要使用图像的宽度，该大小控制图像的伸缩
    this.height = 0;//要使用图像的高度，该大小控制图像的伸缩
    this.speed = 1;//速度
    this.rotate = 90;//角度
    this.opacity = 1;//透明度
    this.visible = true;//是否显示
}
Sprite.prototype.constructor = Sprite;
//碰撞检测方式1
Sprite.prototype.collTest = function(obj2){
    var x1 = this.x;
    var y1 = this.y;
    var x2 = obj2.x;
    var y2 = obj2.y;
    var a = x2-x1;
    var b = y2-y1;
    var c = Math.sqrt(a*a+b*b);
    if(c<30){
        return true;
    }else{
        return false;
    }
};
//碰撞检测方式2
Sprite.prototype.crash = function (goal) {
    var rx = this.x + this.w/2;
    var ry = this.y + this.height/2;
    return !!(   rx >= goal.x && rx <= (goal.x + goal.w-20) && ry >= goal.y && ry <= (goal.y + goal.h-20)  );
};
Sprite.prototype.draw = function(gd){
    /**
     * 绘制图像固定步骤
     *  1. 先保存状态
     *  2. 绘制 移动，角度
     *  3. 绘制 图像
     *  4. 恢复状态
     */
    if(!this.visible){
        return false;
    }
    gd.save();

    gd.translate(this.x,this.y);

    gd.rotate(d2a(this.rotate));

    gd.globalAlpha = this.opacity;

    /**
     * context.drawImage(image,sx,sy,sw,sh,dx,dy,dw,dh);
     *   sx:图像上的x坐标
     sy:图像上的y坐标
     sw:矩形区域的宽度
     sh:矩形区域的高度
     dx:画在canvas的x坐标
     dy:画在canvas的y坐标
     dw:画出来的宽度
     dh:画出来的高度
     */
    gd.drawImage(this.img,this.sx,this.sy,this.w,this.h,-this.w/2,-this.h/2,this.width,this.height);

    gd.restore();
};

Sprite.prototype.move = function () {
    /**
     * 三角函数游戏精灵的运动轨迹
     * @type {number}
     */
    var speedX = Math.sin(d2a(this.rotate))*this.speed;
    var speedY = -Math.cos(d2a(this.rotate))*this.speed;

    this.x+=speedX;
    this.y+=speedY;



};