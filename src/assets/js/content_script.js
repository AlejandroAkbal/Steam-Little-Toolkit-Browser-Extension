function contentScript() {
    /**
     * Check and set a global guard variable.
     * If this content script is injected into the same page again,
     * it will do nothing next time.
     
    if (window.hasRun) {
        console.log("Not injected");
        return;
    }
    window.hasRun = true;

    */



    /* ----------------- Main funcionality ----------------- */
    chrome.storage.sync.get('globalUserSettings', (data) => {
        // console.log(data.globalUserSettings);


        /* ----- Category: Link Filter ----- */

        if (urlContains('linkfilter') > -1) {
            // console.log("We are on a filter");

            /* ----- Bypass Link Filter ----- */
            if (searchInDatabase("bypassLinkFilter", true)) { bypassLinkFilter(); }

        }

        /* ----- Category: Age Check ----- */

        if (urlContains('agecheck') > -1) {
            // console.log("We are on a filter");

            /* ----- Bypass Link Filter ----- */
            if (searchInDatabase("bypassAgeCheck", true)) { bypassAgeCheck(); }

        }

        /* ----- Category: Common Usage ----- */

        if (urlContains('updated') < 0) {
            // console.log("We are on the common areas");

            /* ----- Remove owned games ----- */
            if (searchInDatabase("removeOwned", true)) { removeOwnedGames(); }

            /* ----- Remove ignored games ----- */
            if (searchInDatabase("removeIgnored", true)) { removeIgnoredGames(); }

        }

        /* ----- Category: Updated Games ----- */

        if (urlContains('updated') > -1) {
            // console.log("We are on a updated game list");

            /* ----- Remove owned games ----- */
            if (searchInDatabase("removeOwnedRecentlyUpdatedList", true)) { removeUpdatedOwnedGames(); }

            /* ----- Remove ignored games ----- */
            if (searchInDatabase("removeIgnoredRecentlyUpdatedList", true)) { removeUpdatedIgnoredGames(); }

        }

        /* ----- Category: Always executed ----- */ //
        if (searchInDatabase("removeLiveStreams", true)) { removeLiveStreams(); }


        /* ----- Category: Utilities ----- */

        function searchInDatabase(id, value) {
            for (let key of data.globalUserSettings) {
                // console.log(key);

                if (id == key.id && value == key.value) {
                    return true;
                }
            }
            return false;
        }

    });

    /* ----------------- Outer Functions ----------------- */

    function bypassLinkFilter() {

        console.log(`${consolePrefix}Bypassing Link Filter`);
        window.location = String(window.location).substr(43);

    }

    function bypassAgeCheck() {

        console.log(`${consolePrefix}Bypassing Age Check`);

        // Check if its only a continue button or a form with real age check
        const formAgeYear = document.getElementById('ageYear');
        if (formAgeYear) { formAgeYear.value = 2000; }

        // Submit the form
        document.querySelector('.btnv6_blue_hoverfade.btn_medium').click();

    }

    function removeOwnedGames() {

        console.log(`${consolePrefix}Removing owned games`);
        removeElements(document.querySelectorAll(".ds_owned"));

    }

    function removeIgnoredGames() {

        console.log(`${consolePrefix}Removing ignored games`);
        removeElements(document.querySelectorAll(".ds_ignored"));

    }

    function removeUpdatedOwnedGames() {

        console.log(`${consolePrefix}Removing owned games on recently updated`);
        removeElements(document.querySelectorAll(".ds_owned"));

    }

    function removeUpdatedIgnoredGames() {

        console.log(`${consolePrefix}Removing ignored games on recently updated`);
        removeElements(document.querySelectorAll(".ds_ignored"));

    }

    function removeLiveStreams() {

        console.log(`${consolePrefix}Removing livestreams`);
        removeElements(document.querySelectorAll("#application_root"));
        removeElements(document.querySelectorAll(".home_ctn.live_streams_ctn.no_paging"));

    }

    /* ----------------- Outer Utilities ----------------- */

    /*
    *   Function that checks if the current url is the passed url
    *        "< 0" means that it ISN'T the section
    *        "> -1" means it is the section
    */
    const urlContains = (query) => window.location.href.indexOf(`/${query}/`);

    /*
    *   Function that deletes passed elements
    */
    const removeElements = (elms) => elms.forEach(el => el.remove());


}   // Todo: si cambiamos una setting enviar un mensaje al content script para relodear la pagina


// Temporal Fix until I add event-driven calls
setTimeout(contentScript, 500);

setInterval(contentScript, 3000);