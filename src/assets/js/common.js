/* ----------------- Debugging ----------------- */

/* -----  Just to have a nicer console ----- */
const consolePrefix = `
-==o==- Steam Little Toolkit -==o==-

`; // console.log(consolePrefix);

/* ----- Utility for debugging ----- */
function logDatabase() {
    chrome.storage.sync.get('globalUserSettings', (data) => {

        console.log(data);

    });

}
