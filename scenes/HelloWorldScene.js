// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class HelloWorldScene extends Phaser.Scene {
  constructor() {
    super("hello-world");
  }

  create() {

    // Agregar el fondo y ajustar su escala
    this.background = this.add.image(400, 300, 'sky');
    this.background.setScale(1.3);

    // Inicializar el puntaje
    this.score = 0;

    // Crear un texto para mostrar el puntaje
    this.scoreText = this.add.text(10, 10, 'Score: 0', { fontSize: '20px', fill: '#fff' });

    // Crear pala como rectángulo
    this.paddle = this.add.rectangle(400, 500, 100, 20, 0x6666ff);
    this.physics.add.existing(this.paddle);
    this.paddle.body.setImmovable(true);
    this.paddle.body.setCollideWorldBounds(true);

    // Crear bola como sprite utilizando la imagen cargada
    this.ball = this.add.sprite(400, 300, "ball");
    this.ball.setScale(0.06);
    this.physics.add.existing(this.ball);
    this.ball.body.setCollideWorldBounds(true);
    this.ball.body.setBounce(1, 1);
    this.ball.body.setVelocity(200, 200);

    // Activar colisiones con los límites del mundo para la pelota
    this.ball.body.onWorldBounds = true;

    // Crear un contenedor para los obstáculos
    this.obstacleContainer = this.add.container();

    // Añadir múltiples obstáculos al contenedor en una cuadrícula
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 7; col++) {
        let x = 120 + col * 80;
        let y = 100 + row * 40;
        let obstacle = this.add.rectangle(x, y, 60, 20, 0x66ff66);
        this.physics.add.existing(obstacle);
        obstacle.body.setImmovable(true);
        this.obstacleContainer.add(obstacle);
      }
    }

    // Configurar para que la pala no sea afectada por la gravedad
    this.paddle.body.setAllowGravity(false);

    // Agregar colisiones
    this.physics.add.collider(this.paddle, this.ball, null, null, this);
    this.physics.add.collider(this.obstacleContainer.list, this.ball, this.handleCollision, null, this);

    // Colisión de la pelota con el límite inferior
    this.physics.world.on("worldbounds", (body, up, down, left, right) => {
      if (down && body.gameObject === this.ball) {
        console.log("hit bottom");
        this.gameOver();
      }
    });

    // Crear cursor
    this.cursor = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.cursor.right.isDown) {
      this.paddle.x += 10;
    } else if (this.cursor.left.isDown) {
      this.paddle.x -= 10;
    }
  }

  handleCollision(obstacle, ball) {
    console.log("collision");
    obstacle.destroy();

    // Incrementar el puntaje y actualizar el texto
    this.score += 10;
    this.scoreText.setText('Score: ' + this.score);
  }

  gameOver() {
    console.log("Game Over");
    // Pasar el puntaje a la escena de Game Over
    this.scene.start("GameOverScene", { finalScore: this.score });
  }
}








