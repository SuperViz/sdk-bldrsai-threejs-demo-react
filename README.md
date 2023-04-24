# Integrate SuperViz into Open Source IFC viewer. React DEMO


<p align="center">
   <a href="https://superviz.com/" target="blank"><img src="https://avatars.githubusercontent.com/u/56120553?s=200&v=4" width="120" alt="SuperViz Logo" /></a>
</p>

## Dependencies

* Node.js v16.x
* Yarn / NPM

## Quick start

Clone the project repository:

GitHub CLI
```bash
gh repo clone SuperViz/sdk-bldrsai-threejs-demo-react
```
Ssh
```bash
git@github.com:SuperViz/sdk-bldrsai-threejs-demo-react.git
```
Https
```bash
https://github.com/SuperViz/sdk-bldrsai-threejs-demo-react.git
```

From the project root, run `yarn` or `npm` to install the dependencies:

Using yarn
```bash
yarn
```

Using npm
```bash
npm install
```

To properly use this project, you will need to open 
```bash
/public/static/js/superviz/supervizInitialize.js
```
and change the value SUPERVIZ_DEVELOPER_TOKEN to your developer token

After that, the demo is ready to be used. To run the development environment, from root, run:

Using yarn
```bash
yarn serve-share
```

Using npm
```bash
npm run serve-share
```

### Example BLDRS:

Share is a web-based BIM & CAD integration environment from [bldrs.ai](https://bldrs.ai/).

- *Open* any IFC model on github by pasting into the searchbar, or uploading from your local desktop.
- *View* the model, *navigate* its structure and use *cut planes* to view inside.
- *Search* the model's elements and properties.
- *Collaborate* with teammates by commenting on model parts and properties (in development).
- *Share* with teammates, using permalinks to model parts with exact camera views.
- *Extend* our platform with your Apps. (in development

Visit [bldrs.ai](https://bldrs.ai/) for more info.
