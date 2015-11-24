/**
 *
 * @author
 *
 */
var ItemSprite = (function (_super) {
    __extends(ItemSprite, _super);
    function ItemSprite() {
        _super.call(this);
        this.pos_x = 0;
        this.pos_y = 0;
        this.select_color1 = 0x130c0e;
        this.select_color2 = 0xffffff;
        this.select_color3 = 0xd3d7d4;
        this.select_color4 = 0xef4136;
        this.clik = false;
        this.init();
    }
    var d = __define,c=ItemSprite;p=c.prototype;
    p.init = function () {
        this.w = GameData.getBgWidth() / GameData.column;
        this.h = GameData.getBgHeight() / GameData.row;
        this.bg = new egret.Shape();
        this.bg.graphics.beginFill(0x000000);
        this.bg.graphics.drawRoundRect(0, 0, this.w, this.h, 10, 10);
        this.bg.graphics.endFill();
        this.addChild(this.bg);
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclik, this);
        this.bg1 = new egret.Shape();
        this.bg1.graphics.beginFill(0x000000);
        this.bg1.graphics.drawRoundRect(1, 1, this.w - 2, this.h - 2, 10, 10);
        this.bg1.graphics.endFill();
        this.addChild(this.bg1);
        var text_w = 40;
        this.nameText = new egret.TextField();
        this.nameText.textAlign = egret.HorizontalAlign.CENTER;
        this.nameText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.nameText.size = 40;
        this.nameText.height = this.h;
        this.nameText.width = text_w;
        this.nameText.wordWrap = true;
        this.nameText.x = (this.w - text_w) / 2;
        this.nameText.y = 0;
        this.addChild(this.nameText);
    };
    p.onclik = function (event) {
        if (GameData.game_state != 2) {
            return;
        }
        if (this.pos_y == GameData.clik_y) {
            if (!this.select) {
                this.gameBg.endGame();
                var sound = RES.getRes("find_wrong");
                sound.play(0, 1);
            }
            else {
                var sound = RES.getRes("find_shen_su");
                sound.play(0, 1);
            }
            this.gameBg.move(this.pos_x);
        }
    };
    p.setPos = function (pos_x, pos_y, text, select, gameBg) {
        this.pos_x = pos_x;
        this.pos_y = pos_y;
        this.select = select;
        this.gameBg = gameBg;
        this.text = text;
        this.refreshBg();
        this.refreshPos();
        this.refreshText();
    };
    p.refreshPos = function () {
        this.x = this.pos_x * this.w;
        this.y = this.pos_y * this.h;
    };
    p.refreshBg = function () {
        if (this.clik) {
            //                    egret.log(this.select);
            if (this.select) {
                this.bg1.graphics.beginFill(this.select_color3);
            }
            else {
                this.bg1.graphics.beginFill(this.select_color4);
            }
        }
        else {
            if (this.select) {
                this.bg1.graphics.beginFill(this.select_color1);
            }
            else {
                this.bg1.graphics.beginFill(this.select_color2);
            }
        }
        this.bg1.graphics.drawRoundRect(1, 1, this.w - 2, this.h - 2, 10, 10);
        this.bg1.graphics.endFill();
    };
    p.refreshText = function () {
        if (this.select) {
            this.nameText.textColor = 0xffffff;
        }
        else {
            this.nameText.textColor = 0x000000;
        }
        this.nameText.text = this.text;
    };
    p.move = function (select_x) {
        this.pos_y += 1;
        if (this.pos_x == select_x && this.pos_y == GameData.column - 1) {
            this.clik = true;
            //            egret.log(this.pos_x,select_x,this.clik );
            if (this.select) {
                GameData.score += 1;
                this.gameBg.refreshBar();
            }
        }
        this.refreshPos();
        this.refreshBg();
    };
    return ItemSprite;
})(egret.Sprite);
egret.registerClass(ItemSprite,"ItemSprite");
