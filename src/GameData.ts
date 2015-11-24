/**
 *
 * @author 
 *
 */
class GameData {
	public constructor() {
	}
    private static bgWidth: number = 0;   //屏幕宽度
    private static bgHeight: number = 0;  //屏幕高度
    public static row = 4;//行
    public static column = 4;//列
    public static clik_y = 2;
    public static score = 0;
    public static max_score = 50;
    public static game_state = 0;//1 开始游戏 2游戏进行中 3 结束游戏
    public static time_count = 0;
    
    public static game_name = "找庆安人";
    public static start_tips = "比比看谁能再最快的速度内找到50个庆安人，找错人游戏结束"

    public static ok_text = "庆安人";
    public static err_texts: Array<string> = new Array<string>("安达人","肇东人","海伦人","望奎人","兰西人","青冈人","明水人","绥棱人");
    /**
    * 屏幕宽度
    */
    public static getBgWidth(): number {
        if(GameData.bgWidth == 0) {
            GameData.bgWidth = egret.MainContext.instance.stage.stageWidth;
        }
        return GameData.bgWidth;
    }
    /**
    * 屏幕高度
    */
    public static getBgHeight(): number {
        if(GameData.bgHeight == 0) {
            GameData.bgHeight = egret.MainContext.instance.stage.stageHeight;
        }
        return GameData.bgHeight;
    }
    public static random(min: number,max: number): number {
        return Math.floor(min + Math.random() * (max - min));
            }
            
}
