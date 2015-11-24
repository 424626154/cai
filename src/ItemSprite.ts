/**
 *
 * @author 
 *
 */
class ItemSprite extends egret.Sprite{
    public pos_x: number = 0;
    public pos_y: number = 0;
    public bg: egret.Shape;
    public bg1: egret.Shape;
    public w: number;
    public h: number;
    public text: string;
    public select: boolean;
    public select_color1: number = 0x130c0e;
    public select_color2: number = 0xffffff;
    public select_color3: number = 0xd3d7d4;
    public select_color4: number = 0xef4136;
    public clik:boolean = false;
    public gameBg: GameBg;
    public nameText: egret.TextField;
	public constructor() {
        super();
        this.init();
	}
    public init() { 
        this.w = GameData.getBgWidth() / GameData.column;
        this.h = GameData.getBgHeight() / GameData.row;
        this.bg = new egret.Shape();
        this.bg.graphics.beginFill(0x000000);
        this.bg.graphics.drawRoundRect(0,0,this.w,this.h,10,10);
        this.bg.graphics.endFill();
        this.addChild(this.bg);
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclik,this)
        this.bg1 = new egret.Shape();
        this.bg1.graphics.beginFill(0x000000);
        this.bg1.graphics.drawRoundRect(1,1,this.w - 2,this.h - 2,10,10);
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
        this.nameText.x = (this.w-text_w)/2;
        this.nameText.y = 0;
        this.addChild(this.nameText);
    }
    public onclik(event: egret.TouchEvent) { 
        if(GameData.game_state != 2){ 
            return;
        }
        if(this.pos_y == GameData.clik_y){ 
            if(!this.select) {
                this.gameBg.endGame();
                var sound:egret.Sound = RES.getRes("find_wrong");
                sound.play(0,1);
            } else { 
                var sound:egret.Sound = RES.getRes("find_shen_su");
                sound.play(0,1);
            }
            this.gameBg.move(this.pos_x);
        }
    }
    
    public setPos(pos_x:number,pos_y:number,text:string,select:boolean,gameBg:GameBg) { 
        this.pos_x = pos_x;
        this.pos_y = pos_y;
        this.select = select;
        this.gameBg = gameBg;
        this.text = text;
        this.refreshBg();
        this.refreshPos();
        this.refreshText();
    }
    public refreshPos() { 
        this.x = this.pos_x * this.w;
        this.y = this.pos_y * this.h;
    }
    public refreshBg() { 
        if(this.clik) {
//                    egret.log(this.select);
            if(this.select){
                this.bg1.graphics.beginFill(this.select_color3);
            } else { 
                this.bg1.graphics.beginFill(this.select_color4);
            }
        } else { 
            if(this.select){
                this.bg1.graphics.beginFill(this.select_color1);
            } else { 
                this.bg1.graphics.beginFill(this.select_color2);
            }
        }
 
        this.bg1.graphics.drawRoundRect(1,1,this.w-2,this.h-2,10,10);
        this.bg1.graphics.endFill();
    }
    
    public refreshText() { 
        if(this.select){
            this.nameText.textColor = 0xffffff;
        } else { 
            this.nameText.textColor = 0x000000;
        }
        this.nameText.text = this.text;
    }
    public move(select_x:number) { 
        this.pos_y += 1;
        if(this.pos_x == select_x&&this.pos_y == GameData.column-1){ 
            this.clik = true;
//            egret.log(this.pos_x,select_x,this.clik );
            if(this.select){ 
                GameData.score += 1;
                this.gameBg.refreshBar();
            }
        }
        this.refreshPos();
        this.refreshBg();
    }
    
}
