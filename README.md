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

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
