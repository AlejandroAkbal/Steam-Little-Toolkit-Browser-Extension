/* ----------------- Main ----------------- */
function restoreOptions() {

    let trCounter = 0,
        fullHtmlChunk = "";

    chrome.storage.sync.get('globalUserSettings', (data) => {

        const entries = Object.entries(data.globalUserSettings);

        // console.log(entries);

        for (let key of entries) {
            //console.log(key[1]);
            // console.log(data.globalUserSettings[key]);
            // console.log(`${key[1].id} : ${key[1].value} : ${key[1].name}`);

            // Making the check checked if its true
            let isChecked = "";
            if (key[1].value === true) { isChecked = 'checked="true"'; }

            // Filling the table
            let htmlChunk = `<td><label class="slt-switch"><input id="${key[1].id}" type="checkbox" ${isChecked}><span class="slt-slider"></span></label>${key[1].name}</td>`;

            // Separating into three cells per table row
            if (trCounter === 0) { console.log("Opertura"); fullHtmlChunk += "<tr>" + htmlChunk; }
            else { fullHtmlChunk += htmlChunk; }


            console.log(trCounter);
            ++trCounter;
            if (trCounter >= 3) { trCounter = 0; }


            // Applying HTML
            document.getElementById("tableBody").innerHTML = fullHtmlChunk;

        }


    });

}

// Faltan listeners de cambio de settings


/* ----------------- Listeners ----------------- */

document.addEventListener("DOMContentLoaded", restoreOptions);