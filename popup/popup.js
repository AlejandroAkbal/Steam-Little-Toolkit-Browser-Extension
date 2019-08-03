'use strict';

browser.storage.local.set({
    userSettings: {
        name: "Mog",
        eats: "mice"
    }
});





// Saving options
function saveOptions(e) {
    browser.storage.local.set({
        color: document.querySelector("#color").value
    });
}

// Restore options
function restoreOptions() {
    browser.storage.local.get("userSettings", (settings) => {

        console.log(settings);
    });
}

// Successful retrieve items from object
function onGot(item) {
    console.log(item);
}


// Failed retrieve items from object
function onError(error) {
    console.log(`Error: ${error}`);
}

let gettingItem = browser.storage.local.get();

gettingItem.then(onGot, onError);


// Retrieve items from object
document.addEventListener("DOMContentLoaded", restoreOptions);


// Listener WIP
document.querySelector("input").addEventListener("change", saveOptions);