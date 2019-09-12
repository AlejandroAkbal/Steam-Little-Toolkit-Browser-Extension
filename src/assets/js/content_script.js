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

        /* ----- Category: Viewing Games Pages ----- */

        if (urlContains('app') > -1) {
            // console.log("We are on a game page");

            /* ----- Automatically view all languages on games reviews ----- */
            if (searchInDatabase("viewAllLanguages", true)) { viewAllLanguages(); }

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

        logToConsole("Bypassing Link Filter");
        window.location = String(window.location).substr(43);

    }

    function bypassAgeCheck() {

        logToConsole("Bypassing Age Check");

        // Check if its only a continue button or a form with real age check
        const formAgeYear = document.getElementById('ageYear');
        if (formAgeYear) { formAgeYear.value = 2000; }

        // Submit the form
        document.querySelector('.btnv6_blue_hoverfade.btn_medium').click();

    }

    function removeOwnedGames() {

        logToConsole("Removing owned games");
        removeElements(document.querySelectorAll(".ds_owned:not(.match)"));
        // Removes all elements with the class ds_owned but not if the element has the class match

    }

    function removeIgnoredGames() {

        logToConsole("Removing ignored games");
        removeElements(document.querySelectorAll(".ds_ignored"));

    }

    function removeUpdatedOwnedGames() {

        logToConsole("Removing owned games on recently updated");
        removeElements(document.querySelectorAll(".ds_owned"));

    }

    function removeUpdatedIgnoredGames() {

        logToConsole("Removing ignored games on recently updated");
        removeElements(document.querySelectorAll(".ds_ignored"));

    }

    function removeLiveStreams() {

        logToConsole("Removing livestreams");
        removeElements(document.querySelectorAll("#application_root"));
        removeElements(document.querySelectorAll(".home_ctn.live_streams_ctn.no_paging"));

    }

    function viewAllLanguages() {

        if (counter <= 2) {

            logToConsole("Viewing all languages");
            document.getElementById("reviews_filter_language").click();

            // Workaround until I add a event-driven method
            counter++;

        }

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

let counter = 0;