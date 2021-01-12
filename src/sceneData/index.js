import Start from './Start'
import House from './House'
let CONFIG = {
    Start,
    House
}

class EventData {
    constructor (eventData, scene) {
        this.data = eventData;
        if (this.data == null) {
            this.data = {}
        }
        this.scene = scene;

        return this;
    }

    aiSettings () {
        return this.data.aiSettings;
    }

    getProperties () {
        return this.data.properties;
    }

    beforeAction () {
        console.log(this)
        if (this.data.beforeAction) {
            return this.data.beforeAction.bind(window.GlobalConfig)();
        }

        return true;
    }

    onInteract () {
        if (this.data.onInteract) {
            return this.data.onInteract.bind(window.GlobalConfig)();
        }
    }

    onWin (score) {
        if (this.data.onWin) {
            return this.data.onWin.bind(window.GlobalConfig)();
        }
    }

    onLose (score) {
        if (this.data.onLoss) {
            return this.data.onLose.bind(window.GlobalConfig)();
        }
    }
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
        return new EventData(this.events[evtName], this.scene)
        if (this.events[evtName]) {
            return this.events[evtName];
        } else {
            return {}
        }
    }
}
