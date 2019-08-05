function restoreOptions() {

    chrome.storage.sync.get('globalUserSettings', (data) => {

        const entries = Object.entries(data.globalUserSettings);

        //alert(entries); 
        //console.log(entries);

        for (let key of entries) {
            // console.log(key[1]);
            // console.log(data.globalUserSettings[key]);
            // console.log(`${key[1].id} : ${key[1].value} : ${key[1].name}`);


            // Making the form 
            let isChecked = "";
            if (key[1].value === true) { isChecked = 'checked="true"'; }

            let htmlChunk = `<td>${key[1].name}<label class="slt-switch"><input id="${key[1].id}" type="checkbox" ${isChecked}><span class="slt-slider"></span></label></td>`;

            document.getElementById("settingsTable").innerHTML += htmlChunk;

        }


    });

}

// Faltan listeners de cambio de settings



document.addEventListener("DOMContentLoaded", restoreOptions);