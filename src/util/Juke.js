export default class Juke {

    constructor(scene) {
        this.scene = scene;
    }

    play(sfx) {

        const max = 3;
        let key = sfx.key;
        let config = sfx.config;
        
        if (config.music) {
            this.stop(key);
        }

        let instances = this.scene.sound.getAll(key);
        if (instances.length < max)
            this.scene.sound.play(key, config);
    }

    stop(sfx) {
        let key = sfx.key;
        this.scene.sound.stopByKey(key);
    }
}