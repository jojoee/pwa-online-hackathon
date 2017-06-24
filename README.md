# MeteorKiller

[![Travis](https://img.shields.io/travis/jojoee/pwa-online-hackathon.svg)](https://travis-ci.org/jojoee/pwa-online-hackathon)
[![Codecov](https://img.shields.io/codecov/c/github/jojoee/pwa-online-hackathon.svg)](https://codecov.io/github/jojoee/pwa-online-hackathon)
[![License](https://img.shields.io/github/license/mashape/apistatus.svg)](http://opensource.org/licenses/MIT)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Checklist
- [x] code on [GitHub](https://github.com/jojoee/pwa-online-hackathon)
- [ ] regularly commit
- [x] host on [Firebase hosting](https://pwa-online-hackathon-ae5f6.firebaseapp.com/)
- [ ] in 48hrs (23/06/2017@20.00 - 25/06/2017@20.00)
- [ ] no backend (can run on static server)
- [x] using public API
- [x] using public libraries
- [ ] Firebase login API
- [ ] Firebase realtime database API
- [ ] Firebase notification API
- [ ] add to home screen + splash screen
- [ ] work offline
- [ ] Lighthouse score more then 98

## Future update
- [ ] Firebase: storage
- [ ] Firebase: update security rules
- [ ] test: browser compatibility
- [ ] test: UI
- [ ] test: complete unit test
- [ ] test: increase coverage threshold
- [ ] localization
- [ ] CI: another build by [AppVeyor](http://appveyor.com/)
- [ ] CI: browser testing by [testling](https://ci.testling.com/)
- [ ] CI: dependency checker by david-dm.org
- [ ] CI: another dependency checker by [Greenkeeper](https://greenkeeper.io/)
- [ ] design: improve mobile UX
- [ ] automated script: concat all js files
- [ ] automated script: resize app icon image
- [ ] refactor: using `canvas` for all (not touch DOM ele)
- [ ] refactor: using Class syntax for all
- [ ] refactor: rewrite project with ES7 standard and compile to ES5 for frontend
- [ ] refactor: remove unused
- [ ] move game engine to another repository
- [ ] Docker support
- [ ] code formatter by [Prettier](https://github.com/prettier/prettier)
- [ ] fix eslint on `gulpfile.js`
- [ ] add `test`, `htmlhint`, `stylelint` into `dev` npm script
- [ ] font-icon
## Game
- [ ] play as guest / or login via Google
- [ ] welcome back report
- [ ] using Geolocation API, if user move then got reward (% of user's gold)
- [x] resize canvas when resize
- [ ] update logo
- [ ] bgm
- [ ] tutorial
- [ ] sfx
- [ ] scores

## Getting started
1. Install Node.js
2. Install global dependencies: `npm install -g yarn firebase-tools bower lighthouse`
3. Install dependencies: `yarn && bower install`
4. Start dev: `firebase serve` and `yarn dev`

```
Before commit please run command below to check
- `yarn validate`
- `lighthouse http://localhost:5000 --view --output-path=./lighthouse/result.html`

and commit with `yarn commit` instead of git commit
```

## Getting started for owner
```
$ firebase login
$ firebase init
$ firebase deploy # to deploy on Firebase hosting
```

## Reference
- [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [PWA Online Hackathon](https://pwa.online.hackathon.in.th/)
- [Firebase](https://firebase.google.com/)
- [Progressive Web Apps](https://developers.google.com/web/progressive-web-apps/)
- [Google Codelabs](https://codelabs.developers.google.com)
- [What is FCM token in Firebase?](https://stackoverflow.com/questions/37671380/what-is-fcm-token-in-firebase)

## Reference tool
- [GoogleChrome/lighthouse](https://github.com/GoogleChrome/lighthouse)
- [GoogleChrome/workbox](https://github.com/googlechrome/workbox)
- [GoogleChrome/sw-toolbox](https://github.com/GoogleChrome/sw-toolbox)
