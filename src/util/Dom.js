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
}

function setDisplayOnElementWithId(id) {
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