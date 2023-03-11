import Dom from "./Dom";

export default class KeyControl {
    
    static TraverseMenu(className, dir) {
        moveMenuSelected(className, dir);
    }

    static SelectMenuItem(className) {
        selectedMenuItemAcion(className);
    }

    static AddRightControl(scene, fn) {
        scene.input.keyboard.on('keydown-RIGHT', fn);
        scene.input.keyboard.on('keydown-SIX', fn);
    }

    static AddLeftControl(scene, fn) {
        scene.input.keyboard.on('keydown-LEFT', fn);
        scene.input.keyboard.on('keydown-FOUR', fn);
    }

    static AddUpControl(scene, fn) {
        scene.input.keyboard.on('keydown-UP', fn);
        scene.input.keyboard.on('keydown-TWO', fn);
    }

    static AddDownControl(scene, fn) {
        scene.input.keyboard.on('keydown-DOWN', fn);
        scene.input.keyboard.on('keydown-EIGHT', fn);
    }

    static AddActionControl(scene, fn) {
        scene.input.keyboard.on('keydown-ENTER', fn);
        scene.input.keyboard.on('keydown-FIVE', fn);
        scene.input.keyboard.on('keydown-SPACE', fn);
    }

    static AddBackControl(scene, fn) {
        scene.input.keyboard.on('keydown-BACKSPACE', fn);
    }

    static RemoveAllControls(scene) {
        scene.input.keyboard.off('keydown-LEFT');
        scene.input.keyboard.off('keydown-RIGHT');
        scene.input.keyboard.off('keydown-UP');
        scene.input.keyboard.off('keydown-DOWN');
        scene.input.keyboard.off('keydown-FOUR');
        scene.input.keyboard.off('keydown-SIX');
        scene.input.keyboard.off('keydown-TWO');
        scene.input.keyboard.off('keydown-EIGHT');
        scene.input.keyboard.off('keydown-ENTER');
        scene.input.keyboard.off('keydown-FIVE');
        scene.input.keyboard.off('keydown-SPACEBAR');
        scene.input.keyboard.off('keydown-BACKSPACE');
    }
}

function selectedMenuItemAcion(className) {
    let activeElement = Dom.GetFirstFromClass(className);
    try {
        activeElement.action();
    }
    catch (error) {}
}

function moveMenuSelected(className, dir = 1) {
    let activeElement = Dom.GetFirstFromClass(className);
    Dom.RemoveClass(activeElement, className);
    
    let prev = activeElement.previousElementSibling || activeElement.parentElement.lastElementChild;
    let next = activeElement.nextElementSibling || activeElement.parentElement.firstElementChild;
    let nextElement = (dir > 0) ? next : prev;
    Dom.AddClass(nextElement, className);
}
