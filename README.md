# MeteorKiller

[![Travis](https://img.shields.io/travis/jojoee/pwa-online-hackathon.svg)](https://travis-ci.org/jojoee/pwa-online-hackathon)
[![Codecov](https://img.shields.io/codecov/c/github/jojoee/pwa-online-hackathon.svg)](https://codecov.io/github/jojoee/pwa-online-hackathon)
[![License](https://img.shields.io/github/license/mashape/apistatus.svg)](http://opensource.org/licenses/MIT)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

Kill all Star lord's meteor

## Checklist
- [x] code on [GitHub](https://github.com/jojoee/pwa-online-hackathon)
- [x] host on [Firebase hosting](https://pwa-online-hackathon-ae5f6.firebaseapp.com/)
- [x] Firebase login API
- [x] Firebase realtime database API
- [x] Firebase notification API
- [x] add to home screen + splash screen
- [x] work offline
- [x] Lighthouse score more then 98

## Future update
- [ ] automated test: browser compatibility
- [ ] automated test: UI
- [ ] automated test: complete unit test
- [ ] automated test: increase coverage threshold
- [ ] automated script: resize app icon image
- [ ] automated script: inject js content into html
- [ ] CI: another build by [AppVeyor](http://appveyor.com/)
- [ ] CI: browser testing by [testling](https://ci.testling.com/)
- [ ] CI: dependency checker by david-dm.org
- [ ] CI: another dependency checker by [Greenkeeper](https://greenkeeper.io/)
- [ ] refactor: refactor and rewrite project with ES7 standard and compile to ES5 for frontend
- [ ] refactor: move game engine to another repository
- [ ] localization
- [ ] Docker support
- [ ] add `test`, `htmlhint`, `stylelint` into `dev` npm script
- [ ] complete DocBlockr

## Game
- [x] play as guest / or login via Google
- [x] support viewport resizing

```
theme color: #eeff23 (238, 255, 35)
background color: #505050 (80, 80, 80)
```

## Getting started
1. Install Node.js
2. Install global dependencies: `npm install -g yarn firebase-tools bower lighthouse`
3. Install dependencies: `yarn && bower install`
4. Start dev: `firebase serve` and `yarn dev`

```
$ # Before commit please run command below to check
$ yarn validate
$ lighthouse http://localhost:5000 --verbose --view --output-path=./lighthouse/result.html
$ yarn commit # instead of git commit

```

## Reference
- [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [PWA Online Hackathon](https://pwa.online.hackathon.in.th/)
- [Firebase](https://firebase.google.com/)
- [Progressive Web Apps](https://developers.google.com/web/progressive-web-apps/)
- [Google Codelabs](https://codelabs.developers.google.com)
- [What is FCM token in Firebase?](https://stackoverflow.com/questions/37671380/what-is-fcm-token-in-firebase)
- [The offline cookbook](https://jakearchibald.com/2014/offline-cookbook/)

## Reference tool
- [GoogleChrome/lighthouse](https://github.com/GoogleChrome/lighthouse)
- [GoogleChrome/workbox](https://github.com/googlechrome/workbox)
- [GoogleChrome/sw-toolbox](https://github.com/GoogleChrome/sw-toolbox)
- [Bfxr.  Make sound effects for your games.](http://www.bfxr.net/)
