# Ceres - Frontend for the MyKitchen app

## Project setup

### Install Dependencies
```
npm install
```
### Setup VSCode to auto lint on save
* Go to File > Preferences > Settings
* Search `eslint`
* Scroll to `Eslint > Code actions on save : Rules`
* Click `Edit in settings.json`

Now paste the following lines into `settings.json`:
```
"editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
},
"eslint.validate": [
    "javascript"
],
```

## Compiles and hot-reloads for development
```
npm run serve
```

## Compiles and minifies for production
```
npm run build
```

## Run your unit tests
```
npm run test:unit
```

## Lints and fixes files
```
npm run lint
```

## Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Development Tips

### Contribution
Make new branches off of main. Coordinate with the team and check the trello board to decide what to work on next. Make sure there are no breaking changes in your branch before merging back to main.

### Using util.js
util.js contains global stateless helper methods. Be sure to look there when handling stateless logic, and add to it if you anticipate using something multiple times.