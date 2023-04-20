# Integrate SuperViz into Open Source IFC viewer. React DEMO


<p align="center">
   <a href="https://superviz.com/" target="blank"><img src="https://avatars.githubusercontent.com/u/56120553?s=200&v=4" width="120" alt="SuperViz Logo" /></a>
</p>

## Dependencies

* Node.js v16.x
* Yarn / NPM

## Quick start

Clone the project repository:

```bash
git@github.com:SuperViz/sdk-demo.git

GitHub CLI
gh repo clone SuperViz/sdk-bldrsai-threejs-demo-react

Ssh
git@github.com:SuperViz/sdk-bldrsai-threejs-demo-react.git

Https
https://github.com/SuperViz/sdk-bldrsai-threejs-demo-react.git


From the project root, run `yarn` or `npm` to install the dependencies:

Using yarn
```bash
yarn
```

Using npm
```bash
npm install
```

To properly use this project, you will need to open supervizInitialize.js and change the value SUPERVIZ_DEVELOPER_TOKEN to your developer token

After that, the demo is ready to be used. To run the development environment, from root, run:

Using yarn
```bash
yarn serve-share
```

Using npm
```bash
npm run serve-share
```

## Initializing the demo

To start the demo you must fill in the fields below:

* Room id: id of the room that the user will enter;
* Participant id: id of the user who will enter the meeting;
* Participant name: name of the user who will enter the meeting;
* Avatar scale: the scale of the model;
* Avatar height: the Y position of the avatar inside the tour;
* Is host candidate: determines whether the user is allowed to receive the host role;
* Enable Avatars: enable or disable avatar creation;
* Enable Pointers: enable or disable pointer (if avatars are disabled, `isPointersEnabled` is forced to false);



### Example:

![image](https://user-images.githubusercontent.com/49524331/202759577-562ed255-49fd-4dd8-826d-2babb2b59522.png)


# BLDRS:

<img width="1430" alt="image" src="https://user-images.githubusercontent.com/2480879/209037130-43d1d04e-d943-452c-93fc-2d556c4f17be.png">

Share is a web-based BIM & CAD integration environment from [bldrs.ai](https://bldrs.ai/).

- *Open* any IFC model on github by pasting into the searchbar, or uploading from your local desktop.
- *View* the model, *navigate* its structure and use *cut planes* to view inside.
- *Search* the model's elements and properties.
- *Collaborate* with teammates by commenting on model parts and properties (in development).
- *Share* with teammates, using permalinks to model parts with exact camera views.
- *Extend* our platform with your Apps. (in development)

# Contributing
Please join in creating Bldrs!  Come chat with us at the [Bldrs Discord](https://discord.gg/apWHfDtkJs).

If you have ideas or issues, please file them in our GitHub [issues](https://github.com/bldrs-ai/Share/issues) page, or mail info@bldrs.ai.

## Donations 
If you use Bldrs for private hosting, please contribute to the [Bldrs Open Collective project](https://opencollective.com/bldrs).

## Development
Bldrs is open source and we'd appreciate your help.
- [Projects](https://github.com/orgs/bldrs-ai/projects?query=is%3Aopen&type=beta)
- [Design Doc](https://github.com/bldrs-ai/Share/wiki/Design)
- [Developer Guide](https://github.com/bldrs-ai/Share/wiki/Dev:-Guide)
