import { Scene } from "phaser";
import { AnimConfig } from "./intefaces";

export class Actor extends Phaser.Physics.Arcade.Sprite {
  constructor(
    scene: Scene,
    x: number,
    y: number,
    spriteKey: string,
    frameKey: string
  ) {
    // Llama al constructor de la clase padre (Sprite)
    super(scene, x, y, spriteKey, frameKey);

    // Habilita el cuerpo de física y añade el objeto a la escena
    scene.physics.add.existing(this);
    scene.add.existing(this);
  }

  setSettings() {
    this.setBounce(0.1);
    this.setCollideWorldBounds(true);
  }

  setAnims(anims: AnimConfig[]) {
    for (const anim of anims) {
      this.anims.create(anim);
    }
  }
}
