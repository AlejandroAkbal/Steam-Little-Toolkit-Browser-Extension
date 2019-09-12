/* ----------------- Defaults ----------------- */

let defaultUserSettings = [

    { id: "removeOwned", value: true, name: "Remove owned games", title: "Removes owned games from the Steam storefront" },
    { id: "removeIgnored", value: false, name: "Remove ignored games", title: "Removes ignored games from the Steam storefront" },
    { id: "removeLiveStreams", value: true, name: "Remove livestreams", title: "Removes livestreams from the entire Steam storefront" },
    { id: "removeOwnedRecentlyUpdatedList", value: false, name: "Rem. owned on recently updated", title: "Removes owned games on the recently updated section" },
    { id: "removeIgnoredRecentlyUpdatedList", value: false, name: "Rem. ignored on recently updated", title: "Removes ignored games on the recently updated section" },
    { id: "viewAllLanguages", value: false, name: "All lang. on reviews", title: "Automatically shows all the languages for game's reviews" },
    { id: "bypassLinkFilter", value: true, name: "Bypass link filter", title: "Automatically bypasses the Steam external url link filter" },
    { id: "bypassAgeCheck", value: false, name: "Bypass age check", title: "Automatically bypasses the Steam Age Check Filter" }
];

/* ----------------- Main ----------------- */

function populateSettingsIfUndefined() {

    chrome.storage.sync.get('globalUserSettings', (data) => {

        /* ----- Checks if the storage is empty and resets it ----- */ //

        if (isEmpty(data)) {

            logToConsole("Setting to default all settings");
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
            logToConsole("Every setting is okay");
        }
        else { // TODO: Implementar que si una setting especifica no existe, crearla, en vez de eliminarlo todo
            logToConsole("Detected mismatch, resetting to default");
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

