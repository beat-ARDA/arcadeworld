import { EventBus } from "../EventBus";
import { Scene } from "phaser";

export class Game extends Scene {
  camera?: Phaser.Cameras.Scene2D.Camera;
  background?: Phaser.GameObjects.Image;
  gameText?: Phaser.GameObjects.Text;
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  player?: Phaser.Physics.Arcade.Sprite;

  constructor() {
    super("Game");
  }

  create() {
    this.background = this.add.image(512, 384, "background");

    const platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, "ground").setScale(2).refreshBody();

    platforms.create(600, 400, "ground");
    platforms.create(50, 250, "ground");
    platforms.create(750, 220, "ground");

    this.player = this.physics.add.sprite(100, 450, "dude");

    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    this.physics.add.collider(this.player, platforms);
    this.cursors = this.input.keyboard!.createCursorKeys();

    EventBus.emit("current-scene-ready", this);
  }

  update(time: number, delta: number): void {
    if (this.cursors!.left.isDown) {
      this.player!.setVelocityX(-160);

      this.player!.anims.play("left", true);
    } else if (this.cursors!.right.isDown) {
      this.player!.setVelocityX(160);

      this.player!.anims.play("right", true);
    } else {
      this.player!.setVelocityX(0);

      this.player!.anims.play("turn");
    }

    if (this.cursors!.up.isDown && this.player!.body!.touching.down) {
      this.player!.setVelocityY(-330);
    }
  }

  changeScene() {
    this.scene.start("GameOver");
  }
}
