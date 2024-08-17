export default class Preload extends Phaser.Scene {
    constructor() {
      super("preload");
    }

    preload() {
        this.load.image ("ball", "./public/assets/ball.png");
    }

    create() {
        // Ir a la escena principal (HelloWorldScene) después de cargar
        this.scene.start('hello-world');
      }

}
