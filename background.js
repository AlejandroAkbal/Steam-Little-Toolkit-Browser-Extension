// TODO: Añadir que si no existe en el storage la setting crearla con valores default

let defaultUserSettings = [
    { id: "bypassLinkFilter", value: false, name: "Bypass Link Filter" },
    { id: "bypassAgeCheck", value: false, name: "Bypass Age Check" },
    { id: "removeOwned", value: true, name: "Remove Owned Games" },
    { id: "removeIgnored", value: false, name: "remove Ignored Games" },
    { id: "removeOwnedRecentlyUpdatedList", value: false, name: "remove Owned on Recently Updated" },
    { id: "removeIgnoredRecentlyUpdatedList", value: false, name: "Remove Ignored on Recently Updated" },
    { id: "removeLiveStreams", value: true, name: "Remove Livestreams" }
];

function populateSettings() {

    chrome.storage.sync.get('globalUserSettings', (data) => {

        const entries = Object.entries(data.globalUserSettings);

        //console.log(entries);

        for (let key of entries) {
            // console.log(key[1]);
            // console.log(data.globalUserSettings[key]);
            // console.log(`${key[1].id} : ${key[1].value} : ${key[1].name}`);

        }


    });

}

document.addEventListener("DOMContentLoaded", populateSettings);



/* Activate once if debugging */

// function saveOptions() {
//     chrome.storage.sync.set({ 'globalUserSettings': defaultUserSettings });
// }

// saveOptions();



// chrome.storage.sync.remove('globalUserSettings');