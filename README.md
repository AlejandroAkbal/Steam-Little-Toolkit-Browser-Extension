# Steam Little Toolkit browser extension
Tweaks the Steam store to make it better experience

Works best with the [SteamDB Extension](https://steamdb.info/extension/)!.

Find all the utilites by reading the settings!

**Download the script for [Mozilla Firefox](https://example.com) or for [Google Chrome](https://example.com)**


## Images

The graphical menu
![Menu](README/images/Graphical_Menu.PNG)

Console Notifications
![Notifications](README/images/Notifications.PNG)

## List of features
- [x] Remove live streams on steam store
- [x] Remove owned/ignored games on the steam store
- [x] Remove owned/ignored games on the *recently updated* list
- [x] Bypass age check
- [x] Bypass external link filter
- [x] Graphical menu for toggling all the settings
- [x] Transform the script to a browser extension
- [x] Doesnt load if a secure page is loaded (cart, login, etc.)

## To do
- [ ] Remove games when an event happens, not every **x** seconds
- [ ] Option to ignore owned/ignored games while viewing bundles
- [ ] Fix owned/ignored games being deleted from search results
- [ ] If a setting is added, add it to the current menu instead of replacing to the default one
- [ ] Add OS notifications for when the settings are replaced by the default ones
- [ ] Add toggle to disable the beg for money

## Web-Ext
Browser development
```
npm install -g web-ext
web-ext lint
cd ./src
web-ext run --firefox="C:\Program Files\Firefox Developer Edition\firefox.exe" --firefox-profile=Extensiones
```
