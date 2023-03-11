import SaveData from "../class/SaveData";
import Text from "../common/Text";

const saveData = new SaveData();

export default class GameSave {

    static SaveToLocalStorage() {
        let data = JSON.stringify(saveData);
        sessionStorage.setItem(Text.SAVE_NAME, data);
    }

    static LoadFromLocalStorage() {
        let rawString = sessionStorage.getItem(Text.SAVE_NAME);
        let data = JSON.parse(rawString);
        if (data)
            Object.assign(saveData, data);
    }

    //  Game Accessors

    static SetMaxRound(num) {
        saveData.maxRound = Math.max(saveData.maxRound, num);
    }

    static IncPlayTime(delta) {
        saveData.playTime += Math.round(delta);
    }

    static IncRoundsPlayed(num = 1) {
        saveData.roundsPlayed += num;
    }

    static IncRetries(num = 1) {
        saveData.retries += num;
    }
}