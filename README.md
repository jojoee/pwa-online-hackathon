# PWA

[![Travis](https://img.shields.io/travis/jojoee/pwa-online-hackathon.svg)](https://travis-ci.org/jojoee/pwa-online-hackathon)
[![Codecov](https://img.shields.io/codecov/c/github/jojoee/pwa-online-hackathon.svg)](https://codecov.io/github/jojoee/pwa-online-hackathon)
[![License](https://img.shields.io/github/license/mashape/apistatus.svg)](http://opensource.org/licenses/MIT)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

PWA online hackathon

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
- [ ] Firebase storage
- [ ] browser compatibility test
- [ ] UI test
- [ ] localization
- [ ] CI: another build by [AppVeyor](http://appveyor.com/)
- [ ] CI: browser testing by [testling](https://ci.testling.com/)
- [ ] CI: dependency checker by david-dm.org
- [ ] CI: another dependency checker by [Greenkeeper](https://greenkeeper.io/)
- [ ] Docker support
- [ ] update Firebase security rules
- [ ] code formatter by [Prettier](https://github.com/prettier/prettier)
- [ ] complete unit test
- [ ] increase coverage threshold

## Getting started
1. Install Node.js
2. Install global dependencies: `npm install -g yarn firebase-tools bower lighthouse`
3. Install dependencies: `yarn && bower install`
4. Start dev: `firebase serve`

```
Before commit please run command below to check
- `yarn validate`
- `lighthouse http://localhost:5000 --view`

and commit with `yarn commit` instead of git commit
```

## Getting started for owner
```
$ npm install -g semantic-release-cli
$ semantic-release-cli setup
$ firebase login
$ firebase init
$ firebase deploy # to deploy on Firebase hosting
```

## Reference
- [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [PWA Online Hackathon](https://pwa.online.hackathon.in.th/)
- [Firebase](https://firebase.google.com/)
- [Progressive Web Apps](https://developers.google.com/web/progressive-web-apps/)

## Reference tool
- [GoogleChrome/lighthouse](https://github.com/GoogleChrome/lighthouse)
- [GoogleChrome/workbox](https://github.com/googlechrome/workbox)
- [GoogleChrome/sw-toolbox](https://github.com/GoogleChrome/sw-toolbox)
