/**
 *
 * @author
 *
 */
var GameBg = (function (_super) {
    __extends(GameBg, _super);
    function GameBg() {
        _super.call(this);
        this.items = new Array();
        this.initBg();
        this.initGame();
    }
    var d = __define,c=GameBg;p=c.prototype;
    p.initBg = function () {
        var bg = new egret.Shape();
        bg.graphics.beginFill(0xffffff);
        bg.graphics.drawRect(0, 0, GameData.getBgWidth(), GameData.getBgHeight());
        bg.graphics.endFill();
        this.addChild(bg);
        this.gameSprite = new egret.Sprite();
        this.gameSprite.width = GameData.getBgWidth();
        this.gameSprite.height = GameData.getBgHeight();
        this.addChild(this.gameSprite);
        var w = GameData.getBgWidth() / GameData.column;
        var h = GameData.getBgHeight() / GameData.row;
        for (var i = 0; i < GameData.row; i++) {
            for (var j = 0; j < GameData.column; j++) {
                var shape = new egret.Shape();
                shape.graphics.beginFill(0x000000);
                shape.graphics.drawRoundRect(i * w, j * h, w, h, 10, 10);
                shape.graphics.endFill();
                this.gameSprite.addChild(shape);
                var shape1 = new egret.Shape();
                shape1.graphics.beginFill(0xCCFFFF);
                shape1.graphics.drawRoundRect(i * w + 1, j * h + 1, w - 2, h - 2, 10, 10);
                shape1.graphics.endFill();
                this.gameSprite.addChild(shape1);
            }
        }
        this.bar = new egret.Shape();
        this.addChild(this.bar);
        this.refreshBar();
    };
    p.initGame = function () {
        for (var j = 0; j < GameData.column - 1; j++) {
            this.addRow(j);
        }
        //        this.addRow(0);
        GameData.game_state = 1;
        this.timerText = new egret.TextField();
        this.timerText.textAlign = egret.HorizontalAlign.CENTER;
        this.timerText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.timerText.fontFamily = "Arial";
        this.timerText.textColor = 0xff0000;
        this.timerText.size = 60;
        this.timerText.text = "";
        this.timerText.width = GameData.getBgWidth();
        this.timerText.height = 80;
        this.timerText.x = 0;
        this.timerText.y = 20;
        this.addChild(this.timerText);
        this.startSprite = new egret.Sprite();
        this.addChild(this.startSprite);
        var startShape = new egret.Shape();
        startShape.graphics.beginFill(0x000000, 0.5);
        startShape.graphics.drawRect(0, 0, GameData.getBgWidth(), GameData.getBgHeight());
        startShape.graphics.endFill();
        this.startSprite.addChild(startShape);
        var gamenameText = new egret.TextField();
        gamenameText.textAlign = egret.HorizontalAlign.CENTER;
        gamenameText.size = 40;
        gamenameText.text = GameData.game_name;
        gamenameText.width = GameData.getBgWidth();
        gamenameText.wordWrap = true;
        gamenameText.x = 0;
        gamenameText.y = 60;
        this.startSprite.addChild(gamenameText);
        var gametipsText = new egret.TextField();
        gametipsText.textAlign = egret.HorizontalAlign.CENTER;
        gametipsText.size = 30;
        gametipsText.text = GameData.start_tips;
        gametipsText.width = GameData.getBgWidth() - 20;
        gametipsText.x = 10;
        gametipsText.y = gamenameText.y + gamenameText.height + 40;
        this.startSprite.addChild(gametipsText);
        var startText = new egret.TextField();
        startText.textAlign = egret.HorizontalAlign.CENTER;
        startText.verticalAlign = egret.VerticalAlign.MIDDLE;
        startText.background = true;
        startText.backgroundColor = 0xffffff;
        startText.border = true;
        startText.borderColor = 0x000000;
        startText.fontFamily = "Arial";
        startText.textColor = 0x000000;
        startText.size = 30;
        startText.text = "开始游戏";
        startText.width = 200;
        startText.height = 80;
        startText.x = (GameData.getBgWidth() - startText.width) / 2;
        startText.y = (GameData.getBgHeight() - startText.height) / 2;
        this.startSprite.addChild(startText);
        startText.touchEnabled = true;
        startText.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclikSatrt, this);
        this.timer = new egret.Timer(1, 0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
    };
    p.addRow = function (col) {
        var selects = new Array(true, false, false, false);
        var index1 = GameData.random(0, GameData.err_texts.length);
        var err_text = GameData.err_texts[index1];
        for (var i = 0; i < GameData.row; i++) {
            var index = GameData.random(0, selects.length);
            var select = selects[index];
            selects.splice(index, 1);
            var text = "";
            if (select) {
                text = GameData.ok_text;
            }
            else {
                text = err_text;
            }
            var item = new ItemSprite();
            item.setPos(i, col, text, select, this);
            this.gameSprite.addChild(item);
            this.items.push(item);
        }
    };
    p.move = function (select_x) {
        for (var i = this.items.length - 1; i >= 0; i--) {
            var item = this.items[i];
            if (item.pos_y == GameData.column - 1) {
                this.gameSprite.removeChild(item);
                this.items.splice(i, 1);
            }
            else {
                item.move(select_x);
            }
        }
        this.addRow(0);
    };
    p.refreshTimer = function () {
        this.timerText.text = GameData.time_count / 1000 + "''";
    };
    p.refreshBar = function () {
        var colors = new Array(0xec7979, 0xeb6161, 0xea4343, 0xe82222, 0xe60808);
        var color = colors[4];
        if (GameData.score <= 10) {
            color = colors[0];
        }
        else if (GameData.score <= 20) {
            color = colors[1];
        }
        else if (GameData.score <= 30) {
            color = colors[2];
        }
        else if (GameData.score <= 40) {
            color = colors[3];
        }
        var w = GameData.getBgWidth() * GameData.score / GameData.max_score;
        this.bar.graphics.beginFill(color);
        this.bar.graphics.drawRoundRect(0, 0, w, 10, 10, 10);
        this.bar.graphics.endFill();
        if (GameData.score >= GameData.max_score) {
            this.endGame();
        }
    };
    p.onclikSatrt = function (event) {
        var sound = RES.getRes("button_click");
        sound.play(0, 1);
        GameData.game_state = 2;
        this.removeChild(this.startSprite);
        this.timer.start();
    };
    p.onclikEnd = function (event) {
        var sound = RES.getRes("button_click");
        sound.play(0, 1);
        GameData.game_state = 2;
        GameData.score = 0;
        GameData.time_count = 0;
        this.refreshTimer();
        this.bar.graphics.clear();
        this.refreshBar();
        for (var i = this.items.length - 1; i >= 0; i--) {
            var item = this.items[i];
            this.gameSprite.removeChild(item);
            this.items.splice(i, 1);
        }
        for (var j = 0; j < GameData.column - 1; j++) {
            this.addRow(j);
        }
        this.removeChild(this.endSprite);
        this.timer.start();
    };
    p.timerFunc = function (event) {
        GameData.time_count += 1;
        this.refreshTimer();
    };
    p.endGame = function () {
        var sound = RES.getRes("dialog_open");
        sound.play(0, 1);
        GameData.game_state = 3;
        this.timer.stop();
        this.endSprite = new egret.Sprite();
        this.addChild(this.endSprite);
        var endShape = new egret.Shape();
        endShape.graphics.beginFill(0x000000, 0.5);
        endShape.graphics.drawRect(0, 0, GameData.getBgWidth(), GameData.getBgHeight());
        endShape.graphics.endFill();
        this.endSprite.addChild(endShape);
        var endText = new egret.TextField();
        endText.textAlign = egret.HorizontalAlign.CENTER;
        endText.verticalAlign = egret.VerticalAlign.MIDDLE;
        endText.background = true;
        endText.backgroundColor = 0xffffff;
        endText.border = true;
        endText.borderColor = 0x000000;
        endText.fontFamily = "Arial";
        endText.textColor = 0x000000;
        endText.size = 30;
        endText.text = "重新开始";
        endText.width = 200;
        endText.height = 80;
        endText.x = (GameData.getBgWidth() - endText.width) / 2;
        endText.y = (GameData.getBgHeight() - endText.height) / 2;
        this.endSprite.addChild(endText);
        endText.touchEnabled = true;
        endText.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclikEnd, this);
        var end_text = "你用了" + GameData.time_count / 1000 + "''找到了" + GameData.score + "个庆安人";
        this.timerText.text = "";
        var showTimerText = new egret.TextField();
        showTimerText.textAlign = egret.HorizontalAlign.CENTER;
        showTimerText.verticalAlign = egret.VerticalAlign.MIDDLE;
        showTimerText.fontFamily = "Arial";
        //        showTimerText.textColor = 0xff0000;
        showTimerText.size = 30;
        showTimerText.text = end_text;
        showTimerText.width = GameData.getBgWidth();
        showTimerText.x = 0;
        showTimerText.y = 200;
        this.endSprite.addChild(showTimerText);
        var img = new egret.Bitmap();
        img.texture = RES.getRes("arrow");
        img.x = GameData.getBgWidth() - 50;
        this.addChild(img);
        var shareText = new egret.TextField();
        shareText.textAlign = egret.HorizontalAlign.CENTER;
        shareText.verticalAlign = egret.VerticalAlign.MIDDLE;
        shareText.fontFamily = "Arial";
        shareText.textColor = 0xffffff;
        shareText.size = 30;
        shareText.text = "分享到朋友圈，看看谁更厉害";
        shareText.width = GameData.getBgWidth() - 20;
        shareText.x = 0;
        shareText.y = 60;
        this.endSprite.addChild(shareText);
    };
    p.setWeixinShaseCustomInfo = function () {
        var title = "我用了" + GameData.time_count / 1000 + "''找到了" + GameData.score + "个庆安人,你也来试试！";
        var desc = "我用了" + GameData.time_count / 1000 + "''找到了" + GameData.score + "个庆安人,你也来试试！";
        var link = "http://mp.weixin.qq.com/s?__biz=MzA5MTQ2NjQ2MA==&mid=400448746&idx=1&sn=9d1bc0b7ae9b55db6422f1a7fe1d531b";
        var imgurl = location.href.split("#")[0] + "logo.png";
        //获取“分享给朋友
        var shareAppMessage = new BodyMenuShareAppMessage();
        shareAppMessage.title = title;
        shareAppMessage.desc = desc;
        shareAppMessage.link = link;
        shareAppMessage.imgUrl = imgurl;
        wx.onMenuShareAppMessage(shareAppMessage);
        //“分享到QQ
        var shareqq = new BodyMenuShareQQ();
        shareqq.title = title;
        shareqq.desc = desc;
        shareqq.link = link;
        shareqq.imgUrl = imgurl;
        wx.onMenuShareQQ(shareqq);
        //“分享到微博”
        var shareweibo = new BodyMenuShareWeibo();
        shareweibo.title = title;
        shareweibo.desc = desc;
        shareweibo.link = link;
        shareweibo.imgUrl = imgurl;
        wx.onMenuShareWeibo(shareweibo);
        //“分享到朋友圈
        var sharet = new BodyMenuShareTimeline();
        sharet.title = title;
        sharet.link = link;
        sharet.imgUrl = imgurl;
        wx.onMenuShareTimeline(sharet);
    };
    return GameBg;
})(egret.Sprite);
egret.registerClass(GameBg,"GameBg");
