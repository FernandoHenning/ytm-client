
# YouTube Music WebView Client

This is a custom client for YouTube Music. This project is NOT a native YouTube Music desktop player. I simply embedded the web version of YouTube Music into a native application with ElectronJS. This so that I can continue to play music in the background with the window closed. Yes, we have to do Google's work in order to have that functionality.

I'm not a fan of web apps embedded in native apps, but I was looking for the simplicity to do this in one day. This also allows you to have any new features YouTube adds instantly, as it is still the web version.

I have only been able to test on Windows. So, if you find any bugs or problems, feel free to open an issue or send a pull request if you've fixed it.👍
Also, theres only to build configuration for Windows, so, if you want to use it on Linux or macOS feel free to add it and build it.
## NEW: Added Linux .deb build
Keep in mind that to use the tray icon funcionality you need to install a extension that allows you to have tray icons on gnome. If you don't install a extension just launch the app again and it will launch the same instance. To close it, you are going to need to kill the process.
 
## Features 
- It includes all the functionalities offered by YouTube Music, after all it is the web version.
- Listen to all your music, podcasts or anything else on YouTube Music in the background. You can reopen the window or quit the app from the tray icon depending on your operating system.

## How to run the source code

1. First, clone the repository: `https://github.com/FernandoHenning/ytm-client.git`
2. Install all dependencies: `npm install`
3. Run it with: `npm start`
4. If you want to pack the application: `npm run pack-win` (Windows) `npm run pack-debian` (Debian 12). The resulting .exe and .msi will be in the dist folder. I use Electorn builder for this. 
## Known Issues
- [x] **Resolved** The application becomes unresponsive if a second instance is opened while in the background [#1](https://github.com/FernandoHenning/ytm-client/issues/1).
- [ ] App icon not working on Linux installation.
---
### Credits
- <a href="https://www.flaticon.es/iconos-gratis/boton-de-play" title="boton-de-play iconos">Icon by Alfredo Hernandez - Flaticon</a>
