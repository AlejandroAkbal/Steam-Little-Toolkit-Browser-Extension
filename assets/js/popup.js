/* ----------------- Restoring the settings to the menu ----------------- */
function restoreOptions() {

    let trCounter = 0,
        fullHtmlChunk = "";

    chrome.storage.sync.get('globalUserSettings', (data) => {

        const entries = Object.entries(data.globalUserSettings);
        // console.log(entries);

        for (let key of entries) {
            //console.log(key[1]); // console.log(data.globalUserSettings[key]); // console.log(`${key[1].id} : ${key[1].value} : ${key[1].name}`);

            /* -----  Making the check checked if its true ----- */
            let isChecked = "";
            if (key[1].value === true) { isChecked = 'checked="true"'; }

            /* ----- Filling the table ----- */
            let htmlChunk = `<td><label class="slt-switch"><input id="${key[1].id}" type="checkbox" ${isChecked}><span class="slt-slider"></span></label>${key[1].name}</td>`;

            /* ----- Separating into three cells per table row ----- */
            if (trCounter === 0) { /* console.log("Opertura"); */ fullHtmlChunk += "<tr>" + htmlChunk; }
            else { fullHtmlChunk += htmlChunk; }


            // console.log(trCounter);
            ++trCounter;
            if (trCounter >= 3) { trCounter = 0; }


            /* ----- Applying HTML ----- */
            document.getElementById("tableBody").innerHTML = fullHtmlChunk;

        }


    });

}

/* ----------------- Add listeners to settings ----------------- */
function addListenerToOptions() {

    chrome.storage.sync.get('globalUserSettings', (data) => {

        let temporaryUserSettings = data;

        const entries = Object.entries(data.globalUserSettings); // console.log(entries);

        for (let key of entries) {
            // console.log(key[1].id); // console.log(data.globalUserSettings[key]); // console.log(`${key[1].id} : ${key[1].value} : ${key[1].name}`);

            let checkBox = document.getElementById(key[1].id); // console.log(checkBox);

            /* ----- Adds listener to every setting so it changes the value on the database ----- */
            checkBox.addEventListener("change", function () {

                if (this.checked) {
                    // console.log("True"); // console.log(this.id); // console.log(key); // 
                    console.log(temporaryUserSettings.globalUserSettings[key[0]].value);

                    temporaryUserSettings.globalUserSettings[key[0]].value = true;
                    console.log(temporaryUserSettings.globalUserSettings[key[0]].value);

                    chrome.storage.sync.set({ 'globalUserSettings': temporaryUserSettings.globalUserSettings });

                }

                else if (!this.checked) {
                    // console.log("False"); // console.log(this.id); // console.log(key); // 
                    console.log(temporaryUserSettings.globalUserSettings[key[0]].value);

                    temporaryUserSettings.globalUserSettings[key[0]].value = false;
                    console.log(temporaryUserSettings.globalUserSettings[key[0]].value);

                    chrome.storage.sync.set({ 'globalUserSettings': temporaryUserSettings.globalUserSettings });

                }

            });

        }

    });

}

/* ----------------- Listeners to activate everything ----------------- */
document.addEventListener("DOMContentLoaded", function () {
    restoreOptions();
    addListenerToOptions();
});
