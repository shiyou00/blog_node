//工具函数
/**
 * 角度转弧度
 * @param n
 * @returns {number}
 */
function d2a(n){
    return n*Math.PI/180;
}
/**
 * 弧度转角度
 */
function a2d(arg){
    return arg*(180/Math.PI);
}
/**
 * 随机数范围
 * @param n
 * @param m
 * @returns {number}
 */
function rnd(n,m){
    return Math.floor((Math.random()*(m-n+1)+n));
}




/**
 * 加载一张图片 -> 加载多张图片
 * @param callback
 */
var oImg = {
    fish1:"/img/fish1.png",
    fish2:"/img/fish2.png",
    fish3:"/img/fish3.png",
    fish4:"/img/fish4.png",
    fish5:"/img/fish5.png",
    cannon1:"/img/cannon1.png",
    cannon2:"/img/cannon2.png",
    cannon3:"/img/cannon3.png",
    cannon4:"/img/cannon4.png",
    cannon5:"/img/cannon5.png",
    cannon6:"/img/cannon6.png",
    cannon7:"/img/cannon7.png",
    bottom:"/img/bottom.png",
    bullet:"/img/bullet.png",
    net:"/img/net.png"
};
var aImg = {};
var num = 0;
var loadImg = function(callback){
    var n=0;
    for(var i in oImg){
        var img = new Image();
        img.src = oImg[i];
        aImg[i] = img;
        num++;
        img.onload = function(){
            n++;
            if(n==num){
                callback(aImg);
            }
        }
    }

};