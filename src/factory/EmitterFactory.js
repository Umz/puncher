export default class EmitterFactory {

    constructor(scene) {
        this.scene = scene;
        this.emitters = {};
    }

    createEmitter(name, config) {

        let particle = this.scene.add.particles(config.atlas, config.frame);
        particle.setDepth(config.depth);

        let emitter = particle.createEmitter(config.emitterConfig);
        emitter.stop();

        this.emitters[name] = {
            particle: particle,
            emitter: emitter
        }
    }

    get(name) {
        return this.emitters[name].emitter;
    }

    getParicle(name) {
        return this.emitters[name].particle;
    }
}