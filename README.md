# GoRPG

## Structure


- `src/`
  - `classes/`
    - `ActionArea.js`: Generic action area (extension of Zone). This also contains interactions between the action areas and the player
    - `DOM.js`: Helper Class for creating the DOM Element required for rendering the board and associated tutorials
    - `Player.js`: Player Character
  - `components/`: Vue components
    - `Base.vue`: Base Vue layout
    - `Tutorial.vue`: Component to render Tutorial
  - `scenes/`: Phaser Scenes
    - `BoardScene.js`: Scene associated with the board
    - `BootScene.js`: Boot Scene
    - `GameScene.js`: Scene for all maps. Renders all action areas within the map
    - `MenuScene.js`: Scene to show the menu
  - `actionAreas.js`: This contains the configuration for all the action areas
  - `store.js`: Vuex store (with Vuex-persist, this takes care of saving and persisting the current state


## Creating Maps

I'm currently using Tiled to generate maps. The way I have structured `GameScene` is that it assumes everything is rendered off the same tilemap (`assets/base.png` / `assets/base.tsx`).

Each Tiled map can have the following components:
- `Spawn`: These are spawn points. Generally, only the `Start` map will have a Spawn point called `PlayerStart`. Every other spawn point in every other map will be associated with a `Portal`. The spawn point will specify where the user will start after the user comes out of the `Portal`. The name of the spawn point must be the same as the name of the `Portal`.
- `Portal`: This specifies a portal through which the user will go into a new map. The name of the portal should be equal to the name of the map.
- `Interaction`: This opens `BoardScene` and sets up the DOM.
- `Notification`: This shows a notification on the screen for the user.

Of these components, the `Portal`, `Interaction`, and `Notification` components need to be rectangular objects. These are converted into `ActionArea`s by `GameScene`.
