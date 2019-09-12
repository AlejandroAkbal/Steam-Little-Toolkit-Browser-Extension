/* ----------------- Debugging ----------------- */

/* ----- Utility for debugging ----- */
function logDatabase() {
    chrome.storage.sync.get('globalUserSettings', (data) => {

        console.log(data);

    });

}

/* -----  Just to have a nicer console ----- */
const consolePrefix = `
-==o==- Steam Little Toolkit -==o==-
`;
// console.log(consolePrefix);

function logToConsole(message) {

    console.log(`%c${consolePrefix} %c${message}`, `background: #254441; color: #43aa8b`, `background: #254441; color: #b2b09b`);

}

// logToConsole("prueba");