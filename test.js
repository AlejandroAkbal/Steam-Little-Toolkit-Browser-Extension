for (let globalKey of entries) {
    // console.log(globalKey[1]);
    // console.log(data.globalUserSettings[key]);
    // console.log(`${key[1].id} : ${key[1].value} : ${key[1].name}`);

    if (globalKey[1] == defaultUserSettings) { }

    for (let defaultKey of Object.entries(defaultUserSettings)) {
        console.log(defaultKey[1]);

        if (globalKey[1] == defaultKey[1]) { console.log(`${globalKey} is equal to ${defaultKey}`); }




    }



}




let counter = -1;

for (let defaultKey of Object.entries(defaultUserSettings)) {
    counter++;
    // console.log(`${defaultKey} : ${counter}`);

    // console.log(defaultKey);
    console.log(entries.1);

    if (defaultKey == entries[counter]) { console.log("son iguales"); }

}