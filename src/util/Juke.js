export default class Juke {

    constructor(scene) {
        this.scene = scene;
    }

    play(sfx) {

        const max = 3;
        let key = sfx.key;
        let config = sfx.config;
        
        let instances = this.scene.sound.getAll(key);
        if (instances.length < max)
            this.scene.sound.play(key, config);

        //  Check to try and play music
    }
}