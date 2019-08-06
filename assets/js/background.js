/* ----------------- Defaults ----------------- */

let defaultUserSettings = [
    { id: "bypassLinkFilter", value: true, name: "Bypass link filter" },
    { id: "bypassAgeCheck", value: false, name: "Bypass age check" },
    { id: "removeOwned", value: true, name: "Remove owned games" },
    { id: "removeIgnored", value: false, name: "Remove ignored games" },
    { id: "removeOwnedRecentlyUpdatedList", value: false, name: "Remove owned on recently updated" },
    { id: "removeIgnoredRecentlyUpdatedList", value: false, name: "Remove ignored on recently updated" },
    { id: "removeLiveStreams", value: true, name: "Remove livestreams" }
];

/* ----------------- Main ----------------- */

function populateSettingsIfUndefined() {

    chrome.storage.sync.get('globalUserSettings', (data) => {

        /* ----- Checks if the storage is empty and resets it ----- */ //

        if (isEmpty(data)) {

            console.log(`${consolePrefix}Setting to default all settings`);
            resetAllSettings();

            // Rerun cause data has to update
            populateSettingsIfUndefined();

            return;
        }

        /* ----- Repopulate the setting if it doesnt exist ----- */

        const globalEntries = Object.keys(data.globalUserSettings);
        const defaultEntries = Object.keys(defaultUserSettings);

        // console.log(globalEntries); console.log(consolePrefix); console.log(defaultEntries);

        if (JSON.stringify(globalEntries) === JSON.stringify(defaultEntries)) {
            console.log(`${consolePrefix}Every setting is okay`);
        }
        else { // TODO: Implementar que si una setting especifica no existe, crearla, en vez de eliminarlo todo
            console.log(`${consolePrefix}Detected mismatch, resetting to default`);
            resetAllSettings();
        }

    });

}

/* ----------------- Listeners ----------------- */

//  Listener to populate settings
document.addEventListener("DOMContentLoaded", populateSettingsIfUndefined);


/* ----------------- General Utilities ----------------- */

/* ----- Tests an object to see if its empty or not ----- */
function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

/* -----  Resets all settings on storage to default state ----- */
function resetAllSettings() {
    chrome.storage.sync.set({ 'globalUserSettings': defaultUserSettings });
}

/* -----  Removes all settings saved on storage ----- */
function removeAllSettings() {
    chrome.storage.sync.remove('globalUserSettings');
}

/* -----  Just to have a nicer console ----- */
let consolePrefix = `
-==o==- Steam Little Toolkit -==o==-

`; // console.log(consolePrefix);

/* ----- Utility for debugging ----- */
function logDatabase() {
    chrome.storage.sync.get('globalUserSettings', (data) => {

        console.log(data);

    });

}