/**
 *
 * @author
 *
 */
var GameData = (function () {
    function GameData() {
    }
    var d = __define,c=GameData;p=c.prototype;
    /**
    * 屏幕宽度
    */
    GameData.getBgWidth = function () {
        if (GameData.bgWidth == 0) {
            GameData.bgWidth = egret.MainContext.instance.stage.stageWidth;
        }
        return GameData.bgWidth;
    };
    /**
    * 屏幕高度
    */
    GameData.getBgHeight = function () {
        if (GameData.bgHeight == 0) {
            GameData.bgHeight = egret.MainContext.instance.stage.stageHeight;
        }
        return GameData.bgHeight;
    };
    GameData.random = function (min, max) {
        return Math.floor(min + Math.random() * (max - min));
    };
    GameData.bgWidth = 0; //屏幕宽度
    GameData.bgHeight = 0; //屏幕高度
    GameData.row = 4; //行
    GameData.column = 4; //列
    GameData.clik_y = 2;
    GameData.score = 0;
    GameData.max_score = 50;
    GameData.game_state = 0; //1 开始游戏 2游戏进行中 3 结束游戏
    GameData.time_count = 0;
    GameData.game_name = "找庆安人";
    GameData.start_tips = "比比看谁能再最快的速度内找到50个庆安人，找错人游戏结束";
    GameData.ok_text = "庆安人";
    GameData.err_texts = new Array("安达人", "肇东人", "海伦人", "望奎人", "兰西人", "青冈人", "明水人", "绥棱人");
    return GameData;
})();
egret.registerClass(GameData,"GameData");
