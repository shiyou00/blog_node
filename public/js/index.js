
/**
 * ★移动出画布及时删除
 * ★不同角度游动
 * ★架设炮台
 * ★炮筒架设
 * ★炮筒跟随鼠标移动
 * ★射出炮弹
 * ★炮弹超出范围删除
 * ★根据炮筒的等级射出不同级别的炮弹
 * ★绘制加减
 * ★点击加减号改变炮筒级别
 * todo:绘制能量条
 * todo:金币数量
 * ★当子弹和鱼进行碰撞后，通过子弹的级别，产生相应大小的鱼网
 * ★鱼儿死亡
 * ★一段时间后，网消失和死鱼消失
 * todo: 初始化给予2000金币
 * todo: 射出炮弹,根据炮弹类型减掉相应金币
 * todo: 射杀到鱼儿的时候，增加相应的金币
 * todo: 开始，暂停画面
 * todo: 渔网和鱼进行碰撞检测
 * todo: 鱼增加血量属性
 * todo: 渔网增加攻击力
 * todo: 增加对象池
 * todo: 代码使用面向对象重构
 *
 */

;(function(window,document){
    function FishGame(options) {
        //变量定义区
        this.canvas = document.getElementById("canvas");
        this.gd = canvas.getContext("2d");
        this.removeWidth = this.canvas.width + 100;
        this.removeHeight = this.canvas.height + 100;
        this.elePosition = {
            addBtn:{
                x:200,
                y:this.canvas.height - 6,
                w:36,
                h:28,
                width:36*0.6,
                height:28*0.6,
                sx:2,
                sy:74
            },
            subtractBtn:{
                x:224,
                y:this.canvas.height - 6,
                w:36,
                h:28,
                width:36*0.6,
                height:28*0.6,
                sx:90,
                sy:74
            }
        };
        this.gold = 2000;//用户初始金币
        this.cannon = null;
        this.cannonType = 1;
        this.bx = 0;
        this.by = 0;
        this.pause = false;
        this.bottom = null;
        this.cannonRotate = 0;
        this.addBtn = null;
        this.subtractBtn = null;
        this.aBullet = [];
        this.aFish = [];
        this.aNet = [];
        this.aDieFish = [];

        //默认参数
        var defaults = {

        };

        //如果未传递参数则使用默认参数
        this.ops = options || {};
        for (var i in defaults) {
            if (typeof options[i] === 'undefined') {
                options[i] = defaults[i];
            } else if (typeof options[i] === 'object') {
                for (var deepDef in defaults[i]) {
                    if (typeof options[i][j] === 'undefined') {
                        options[i][j] = defaults[i][j];
                    }
                }
            }
        }

        //初始化函数
        this.init();
        this.bindEvent();
    }
    //构造函数指向自己本身
    FishGame.prototype.constructor = FishGame;
    // 画布手势移动事件
    FishGame.prototype.handleMouseMove = function () {
        var self = this;
        self.canvas.onmousemove = function (e) {
            var px = e.pageX - self.canvas.offsetLeft;
            var py = e.pageY - self.canvas.offsetTop;
            var cy = py - self.cannon.y;
            var cx = px - self.cannon.x;
            self.cannonRotate = self.cannon.rotate = a2d(Math.atan2(cy,cx))+90;
        };
    };
    // 增加按钮
    FishGame.prototype.addBtnImg = function (res) {
        var self = this;
        this.addBtn = new Sprite(res.bottom);
        this.addBtn.x = self.elePosition.addBtn.x;
        this.addBtn.y = self.elePosition.addBtn.y;
        this.addBtn.w = self.elePosition.addBtn.w;
        this.addBtn.h = self.elePosition.addBtn.h;
        this.addBtn.width = self.elePosition.addBtn.width;
        this.addBtn.height = self.elePosition.addBtn.height;
        this.addBtn.sx = self.elePosition.addBtn.sx;
        this.addBtn.sy = self.elePosition.addBtn.sy;
        this.addBtn.rotate = 0;
    };
    // 递减按钮
    FishGame.prototype.subtractBtnImg = function (res) {
        var self = this;
        this.subtractBtn = new Sprite(res.bottom);
        this.subtractBtn.x = self.elePosition.subtractBtn.x;
        this.subtractBtn.y = self.elePosition.subtractBtn.y;
        this.subtractBtn.w = self.elePosition.subtractBtn.w;
        this.subtractBtn.h = self.elePosition.subtractBtn.h;
        this.subtractBtn.width = self.elePosition.subtractBtn.width;
        this.subtractBtn.height = self.elePosition.subtractBtn.height;
        this.subtractBtn.sx = self.elePosition.subtractBtn.sx;
        this.subtractBtn.sy = self.elePosition.subtractBtn.sy;
        this.subtractBtn.rotate = 0;
    };
    // 点击事件
    FishGame.prototype.handleClick = function (res) {
        var self = this ;
        self.canvas.addEventListener("click",function (e) {
            var x = e.clientX - self.canvas.offsetLeft;
            var y = e.clientY - self.canvas.offsetTop;
            if(self.isInPosition(x,y,self.addBtn)){
                if(self.cannonType>=7){
                    return false;
                }
                self.cannonType++;
                self.newCannon(res);
                self.cannon.draw(self.gd);
                return false;
            }
            if(self.isInPosition(x,y,self.subtractBtn)){
                if(self.cannonType<=1){
                    return false;
                }
                self.cannonType--;
                self.newCannon(res);
                return false;
            }
            /**
             * 生产炮弹
             * 判断用户是否有金币数量
             */
            if(self.gold>10){

            }
            self.productionBullet(res,self.cannonType);
        },false);
    };

    // 生产炮弹
    FishGame.prototype.productionBullet = function (res,type) {
        var self = this;
        var bullet = new Bullet(res,type);
        bullet.rotate = self.cannonRotate;
        bullet.x = self.bx;
        bullet.y = self.by;
        self.aBullet.push(bullet);
    };
    // 绘制炮弹
    FishGame.prototype.drawBullet = function () {
        var self = this;
        for(var i=0;i<self.aBullet.length;i++){
            self.aBullet[i].move();
            self.aBullet[i].draw(self.gd);
            //超出屏幕记得移除炮弹
            if(self.aBullet[i].x<-100||self.aBullet[i].x>self.removeWidth||self.aBullet[i].y>self.removeHeight||self.aBullet[i].y<-100){
                self.aBullet.splice(i,1);
            }
        }
    };

    // 生产鱼
    FishGame.prototype.productionFish = function (res) {
        //一些产鱼的关卡就可以在这个函数中生成
        var self = this;
        setInterval(function () {
            self.aFish.push(new Fish(res,rnd(1,5)));
        },1200);
    };
    // 生产死鱼
    FishGame.prototype.productionDieFish = function (m) {
        var dieFish = this.aFish.splice(m,1);
        this.aDieFish.push(dieFish[0]);
    };
    // 生产网
    FishGame.prototype.productionNet = function (res,type,m) {
        var net = new Net(res,type);
        net.x = this.aFish[m].x;
        net.y = this.aFish[m].y;
        this.aNet.push(net);
    };
    // 绘制渔网
    FishGame.prototype.drawNet = function () {
        for(var i=0;i<this.aNet.length;i++){
            this.aNet[i].draw(this.gd);
            this.aNet[i].hide();
            if(this.aNet[i].visible == false){
                this.aNet.splice(i,1);
                i--;
            }
        }
    };
    // 绘制死鱼
    FishGame.prototype.drawDieFish = function () {
        var self = this;
        for(var i=0;i<self.aDieFish.length;i++){
            self.aDieFish[i].draw(self.gd);
        }
    };
    // 绘制活鱼
    FishGame.prototype.drawFish = function () {
        var self = this;
        for(var i=0;i<self.aFish.length;i++){
            self.aFish[i].move();
            self.aFish[i].draw(self.gd);
            //计算是否移动出了canvas画布，如果是的话，则在数组中删除掉
            if(self.aFish[i].x>this.removeWidth||self.aFish[i].y>self.removeHeight||self.aFish[i].y<-100){
                self.aFish.splice(i,1);
            }
        }
    };


    // 碰撞处理
    FishGame.prototype.collisionTest = function (res) {
        var self = this;
        for(var n=0;n<self.aBullet.length;n++){
            for(var m=0;m<self.aFish.length;m++){
                if(self.aBullet[n].collTest(self.aFish[m])){
                    if(self.aBullet[n].collision == false){
                        self.aBullet[n].collision = true;
                        // 检测到碰撞后
                        var type = self.aBullet[n].type;
                        // 生产相应的网
                        self.productionNet(res,type,m);
                        // 生产死鱼
                        self.productionDieFish(m);
                    }
                }
            }
        }
    };

    // 精灵的动画
    FishGame.prototype.animation = function () {
        var self = this;
        setInterval(function(){
            for(var i=0;i<self.aFish.length;i++){
                self.aFish[i].swimming();
            }
            for(var j=0;j<self.aDieFish.length;j++){
                self.aDieFish[j].dieFn();
                if(self.aDieFish[j].visible == false){
                    self.aDieFish.splice(j,1);
                    j--;
                }
            }
        },120);
    };
    // 按帧更新画布
    FishGame.prototype.drawFrame = function (res) {
        var self = this;
        function frame(){
            if(self.pause == false){
                window.requestAnimationFrame(frame,canvas);
            }
            self.gd.clearRect(0,0,self.canvas.width,self.canvas.height);

            self.drawDieFish();
            self.drawFish();
            self.drawBullet();
            // 双重循环判断是否碰撞，如果碰撞到，给出回调函数，在回调函数中处理这些事物
            self.collisionTest(res);
            //渔网和鱼之间进行碰撞检测
            // 渲染渔网
            self.drawNet();


            //绘制炮台，炮筒
            self.bottom.draw(self.gd);
            self.cannon.draw(self.gd);
            self.addBtn.draw(self.gd);
            self.subtractBtn.draw(self.gd);
        }
        frame();
    };

    //初始化入口函数
    FishGame.prototype.init = function(){
        var self = this;
        loadImg(function(res){
            //-----初始化固定精灵-----//
            self.newCannon(res);
            self.setBattery(res);
            self.addBtnImg(res);
            self.subtractBtnImg(res);


            //-----生产鱼-----//
            self.productionFish(res);

            //-----按帧更新画布-----//
            self.drawFrame(res);


            //-----精灵动画-----//
            self.animation();

            //-----画布事件-----//
            self.handleClick(res);
            self.handleMouseMove();
        });
    };
    FishGame.prototype.bindEvent = function(res){};

    FishGame.prototype.newCannon = function (res) {
        this.cannon = new Cannon(res,this.cannonType);
        this.bx = this.cannon.x = this.canvas.width/2 + this.cannon.w/2; //在canvas中的位置X
        this.by = this.cannon.y = this.canvas.height - 30 ; //在canvas中的位置Y
    };

    // 架设炮台
    FishGame.prototype.setBattery = function (res) {
        this.bottom = new Sprite(res.bottom);
        this.bottom.w = res.bottom.width; //图像宽
        this.bottom.h = res.bottom.height; //图像高
        this.bottom.width = this.bottom.w;
        this.bottom.height = this.bottom.h;
        this.bottom.rotate = 0;
        this.bottom.x = this.canvas.width/2 ; //在canvas中的位置X
        this.bottom.y = this.canvas.height - 10 ; //在canvas中的位置Y
    };

    FishGame.prototype.isInPosition = function (x,y,ele) {
        if(x>(ele.x-ele.w/2)&&x<(ele.x-ele.w/2+ele.width)&&(y>ele.y-ele.h/2)&&y<(ele.y-ele.h/2+ele.height)){
            return true;
        }else{
            return false;
        }
    };




    //对外暴露的接口
    window.fishing = function (options) {
        return new FishGame(options);
    }

}(window,document));

fishing();





















