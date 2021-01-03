import Start from './Start'
import House from './House'
let CONFIG = {
    Start,
    House
}

export default class SceneData {
    constructor (scene) {
        this.data = CONFIG[scene.mapName];
        this.scene = scene;

        if (this.data) {
            this.events = this.data.events;
            this.config = this.data.config;
        } else {
            this.events = {}
            this.config = {}
        }
    }

    getData (evtName) {
        if (this.events[evtName]) {
            return this.events[evtName];
        } else {
            return {}
        }
    }

    getProperties (evt) {
        return this.getData(evt.name).properties;
    }

    beforeAction (evt) {
        if (this.getData(evt.name).beforeAction) {
            return this.getData(evt.name).beforeAction({
                scene: this.scene,
                zone: this.evt
            });
        }

        return true;
    }

    onInteract (evt) {
        if (this.getData(evt.name).onInteract) {
            return this.getData(evt.name).onInteract({
                scene: this.scene,
                zone: this.evt
            })
        }

    }
}
