export default class Dom {

    static GetId(id) {
        return getElementWithId(id);
    }

    static GetFirstFromClass(name) {
        return getClassElements(name)[0];
    }

    static AddClass(element, className) {
        addClassToElement(element, className);
    }

    static RemoveClass(element, className) {
        removeClassFromElement(element, className);
    }

    static AddClick(id, fn) {
        addClickEventListenerToElementWithId(id, fn);
    }

    static ResetClickOnClass(className) {
        let arr = getClassElements(className);
        for (let element of arr)
            resetClickEventListenerOnElement(element);
    }

    static SetVisible(id) {
        setVisibilityOnElementWithId(id, 'visible');
    }

    static SetHidden(id) {
        setVisibilityOnElementWithId(id, 'hidden');
    }

    static SetClassVisible(className) {
        setVisibilityOnClass(className, 'visible');
    }

    static SetClassHidden(className) {
        setVisibilityOnClass(className, 'hidden');
    }

    static SetDisplayBlock(id) {
        setDisplayOnElementWithId(id, 'block');
    }

    static SetDisplayNone(id) {
        setDisplayOnElementWithId(id, 'none');
    }

    static SetText(id, text) {
        setTextContentOnElementWithId(id, text);
    }

    static SetHP(id, pc) {
        setHPBarWidth(id, pc);
    }

    static ResetMenu(className, activeName) {
        resetMenu(className, activeName);
    }
}

function setDisplayOnElementWithId(id, value) {
    let element = document.getElementById(id);
    element.style.display = value;
}

function setVisibilityOnClass(className, value) {
    let arr = getClassElements(className);
        for (let element of arr)
            element.style.visibility = value;
}

function setVisibilityOnElementWithId(id, value) {
    let element = document.getElementById(id);
    element.style.visibility = value;
}

function getElementWithId(id) {
    return document.getElementById(id);
}

function getClassElements(className) {
    return document.getElementsByClassName(className);
}

function addClassToElement(element, className) {
    element.classList.add(className);
}

function removeClassFromElement(element, className) {
    element.classList.remove(className);
}

function addClickEventListenerToElementWithId(id, fn) {
    document.getElementById(id).addEventListener('click', fn);
    document.getElementById(id).action = fn;
}

function resetClickEventListenerOnElement(element) {
    let new_element = element.cloneNode(true);
    element.parentNode.replaceChild(new_element, element);
}

function setTextContentOnElementWithId(id, text) {
    let element = document.getElementById(id);
    element.textContent = text;
}

function resetMenu(className, activeName) {
    let activeElement = Dom.GetFirstFromClass(activeName);
    Dom.RemoveClass(activeElement, activeName);

    let firstElement = Dom.GetFirstFromClass(className);
    Dom.AddClass(firstElement, activeName);
}

function setHPBarWidth(id, percent) {
    let element = document.getElementById(id);
    element.style.width = percent + "%";
    element.style.left = (100 - percent) + "%";
}