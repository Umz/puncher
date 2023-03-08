import Phaser from "phaser";
import Text from "../common/Text";
import Dom from "../util/Dom";

export default class Menu extends Phaser.Scene {
    
    constructor() {
        super(Text.MENU);
    }
    
    create () {

        showMenu();
        this.addKeyControls();

        Dom.AddClick(Text.MENU_PLAY, ()=>{
            resetMenu();
            hideMenu();
            if (this.scene.isActive(Text.GAME)) {
                this.scene.setVisible(true, Text.GAME);
                this.scene.get(Text.GAME).events.emit(Text.EVENT_NEXT_STATE);
                this.scene.stop();
            }
            else {
                this.scene.start(Text.GAME);
            }
        });

        Dom.AddClick(Text.MENU_HOW, ()=>{
            setMenuItemSelected(Text.MENU_HOW);
            showPopup(Text.DOM_HOW);
        });

        Dom.AddClick(Text.MENU_CREDITS, ()=>{
            setMenuItemSelected(Text.MENU_CREDITS);
            showPopup(Text.DOM_CREDITS);
        });
        Dom.AddClick(Text.MENU_EXIT, ()=>{
            setMenuItemSelected(Text.MENU_EXIT);
        });

        Dom.AddClick(Text.DOM_HOW, ()=>{
            hidePopups();
        });
        Dom.AddClick(Text.DOM_CREDITS, ()=>{
            hidePopups();
        });
    }
    
    addKeyControls() {

        this.input.keyboard.on('keydown-UP', moveMenuUp);
        this.input.keyboard.on('keydown-DOWN', moveMenuDown);
        this.input.keyboard.on('keydown-TWO', moveMenuUp);
        this.input.keyboard.on('keydown-EIGHT', moveMenuDown);

        this.input.keyboard.on('keydown-ENTER', selectCurrentMenuItem);
        this.input.keyboard.on('keydown-SPACEBAR', selectCurrentMenuItem);
        this.input.keyboard.on('keydown-BACKSPACE', backButton);
    }
}

function moveMenuDown(event) {
    moveMenuSelected(1);
}

function moveMenuUp(event) {
    moveMenuSelected(-1);
}

function selectCurrentMenuItem(event) {
    selectedMenuItemAcion();
}

function backButton(event) {
    // Select exit
    // If already selected, exit game
}

//  DOM Controls

function moveMenuSelected(dir = 1) {
    let activeElement = Dom.GetFirstFromClass(Text.MENU_SELECTED);
    Dom.RemoveClass(activeElement, Text.MENU_SELECTED);
    
    let prev = activeElement.previousElementSibling || activeElement.parentElement.lastElementChild;
    let next = activeElement.nextElementSibling || activeElement.parentElement.firstElementChild;
    let nextElement = (dir > 0) ? next : prev;
    Dom.AddClass(nextElement, Text.MENU_SELECTED);

    hidePopups();
}

function selectedMenuItemAcion() {
    let activeElement = Dom.GetFirstFromClass(Text.MENU_SELECTED);
    try {
        activeElement.action();
    }
    catch (error) {}
}

function setMenuItemSelected(id) {
    let activeElement = Dom.GetFirstFromClass(Text.MENU_SELECTED);
    let clicked = Dom.GetId(id);
    Dom.RemoveClass(activeElement, Text.MENU_SELECTED);
    Dom.AddClass(clicked, Text.MENU_SELECTED);
}

function resetMenu() {
    Dom.ResetClickOnClass(Text.MENU_ITEMS);
    Dom.ResetClickOnClass(Text.MENU_POPUP);
    
    let activeElement = Dom.GetFirstFromClass(Text.MENU_SELECTED);
    Dom.RemoveClass(activeElement, Text.MENU_SELECTED);

    let firstElement = Dom.GetFirstFromClass(Text.MENU_ITEMS);
    Dom.AddClass(firstElement, Text.MENU_SELECTED);
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