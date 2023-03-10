import Playstate from "../class/Playstate";
import Text from "../common/Text";
import Sfx from "../const/Sfx";
import Dom from "../util/Dom";
import GameSave from "../util/GameSave";
import KeyControl from "../util/KeyControl";

export default class Ready extends Playstate {

    constructor(scene) {
        super(scene);
    }

    init(win) {
        
        if (win) {
            this.counter.setActive(true);
            this.counter.setMaxCount(3000);
            this.counter.resetCount();
            showFeedback();
        }
        else {

            KeyControl.AddRightControl(this.scene, (event) => {
                KeyControl.TraverseMenu(Text.CHOICE_SELECTED, 1);
                this.playSound(Sfx.MENU_MOVE);
            });
            KeyControl.AddLeftControl(this.scene, (event) => {
                KeyControl.TraverseMenu(Text.CHOICE_SELECTED, -1);
                this.playSound(Sfx.MENU_MOVE);
            });
            KeyControl.AddActionControl(this.scene, (event) => {
                KeyControl.SelectMenuItem(Text.CHOICE_SELECTED);
                this.playSound(Sfx.MENU_CLICK);
            });
    
            Dom.AddClick(Text.CHOICE_LEFT, (event)=>{
                GameSave.IncRetries();
                this.reset();
                this.fireEvent(Text.EVENT_NEXT_STATE);
            });
            Dom.AddClick(Text.CHOICE_RIGHT, (event)=>{
                this.scene.exitToMenu();
            });

            showChoiceMenu();
            this.counter.setActive(false);
        }
    }

    update(time, delta) {
        if (this.counter.updateAndCheck(time, delta))
            this.fireEvent(Text.EVENT_NEXT_STATE);
    }

    reset() {
        super.reset();
        KeyControl.RemoveAllControls(this.scene);
        resetClicks();
        hideChoiceMenu();
    }
}

function showFeedback() {
    Dom.SetText(Text.CHOICE_TITLE, Text.TITLE_NEXT);
    Dom.SetText(Text.CHOICE_SUBTITLE, Text.SUBTITLE_NEXT);
    Dom.SetVisible(Text.DOM_CHOICES);
    Dom.SetHidden(Text.DOM_CHOICES_BUTTONS);
}

function showChoiceMenu() {
    Dom.SetText(Text.CHOICE_TITLE, Text.TITLE_RETRY);
    Dom.SetText(Text.CHOICE_SUBTITLE, Text.SUBTITLE_RETRY);
    Dom.SetVisible(Text.DOM_CHOICES);
    Dom.SetVisible(Text.DOM_CHOICES_BUTTONS);
}

function hideChoiceMenu() {
    Dom.SetHidden(Text.DOM_CHOICES);
    Dom.SetHidden(Text.DOM_CHOICES_BUTTONS);
}

function resetClicks() {
    Dom.ResetClickOnClass(Text.CHOICE_LEFT);
    Dom.ResetClickOnClass(Text.CHOICE_RIGHT);
    Dom.ResetMenu(Text.CHOICE_ITEM, Text.CHOICE_SELECTED);
}