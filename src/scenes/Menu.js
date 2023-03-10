import Phaser from "phaser";
import Text from "../common/Text";
import Sfx from "../const/Sfx";
import Dom from "../util/Dom";
import Juke from "../util/Juke";
import KeyControl from "../util/KeyControl";

export default class Menu extends Phaser.Scene {
    
    constructor() {
        super(Text.MENU);
    }
    
    create () {

        let juke = new Juke(this);

        showMenu();
        //hideMenu();

        //  CLICK on elements

        Dom.AddClick(Text.MENU_PLAY, ()=>{
            Dom.ResetMenu(Text.MENU_ITEMS, Text.MENU_SELECTED);
            hideMenu();
            if (this.scene.isActive(Text.GAME)) {
                this.scene.setVisible(true, Text.GAME);
                this.scene.get(Text.GAME).events.emit(Text.EVENT_NEXT_STATE);
                this.scene.stop();
            }
            else {
                this.scene.start(Text.GAME);
            }
            juke.play(Sfx.MENU_PLAY);
        });
        Dom.AddClick(Text.MENU_HOW, ()=>{
            setMenuItemSelected(Text.MENU_HOW);
            showPopup(Text.DOM_HOW);
            juke.play(Sfx.MENU_CLICK);
        });
        Dom.AddClick(Text.MENU_CREDITS, ()=>{
            setMenuItemSelected(Text.MENU_CREDITS);
            showPopup(Text.DOM_CREDITS);
            juke.play(Sfx.MENU_CLICK);
        });
        Dom.AddClick(Text.MENU_EXIT, ()=>{
            setMenuItemSelected(Text.MENU_EXIT);
            juke.play(Sfx.MENU_CLOSE);
        });

        Dom.AddClick(Text.DOM_HOW, hidePopups);
        Dom.AddClick(Text.DOM_CREDITS, hidePopups);

        //  UP and DOWN controls

        KeyControl.AddDownControl(this, ()=>{
            juke.play(Sfx.MENU_MOVE);
            KeyControl.TraverseMenu(Text.MENU_SELECTED, 1);
            hidePopups();
        });
        KeyControl.AddUpControl(this, ()=>{
            juke.play(Sfx.MENU_MOVE);
            KeyControl.TraverseMenu(Text.MENU_SELECTED, -1);
            hidePopups();
        });
        KeyControl.AddActionControl(this, (event) => {
            KeyControl.SelectMenuItem(Text.MENU_SELECTED);
        });

        this.input.keyboard.on('keydown-BACKSPACE', backButton);
    }
}

function backButton(event) {
    console.log('BS');
    // Select exit
    // If already selected, exit game
}

//  DOM Controls

function setMenuItemSelected(id) {
    let activeElement = Dom.GetFirstFromClass(Text.MENU_SELECTED);
    let clicked = Dom.GetId(id);
    Dom.RemoveClass(activeElement, Text.MENU_SELECTED);
    Dom.AddClass(clicked, Text.MENU_SELECTED);
}

function showPopup(id) {
    Dom.SetVisible(id);
}

function hidePopups() {
    Dom.SetClassHidden(Text.MENU_POPUP);
}

function hideMenu() {
    Dom.SetHidden(Text.DOM_LOGO);
    Dom.SetHidden(Text.DOM_MENU);
}

function showMenu() {
    Dom.SetVisible(Text.DOM_LOGO);
    Dom.SetVisible(Text.DOM_MENU);
}