import Phaser from "phaser";

import Preloader from "./scenes/Preloader";
import Game from "./scenes/Game";
import GameUI from "./scenes/GameUI"
import MainMenu from "./scenes/MainMenu";
import Orientation from "./scenes/Orientation";
import Credits from "./scenes/Credits";

export default new Phaser.Game({
  type: Phaser.AUTO,
  scene: [Preloader, Orientation, MainMenu, Game, GameUI, Credits],
  pixelArt: true,
  backgroundColor: '#0E2FFF',
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },

  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 400,
    height: 250,
  },

  zoom: 1,
  antialias: true,


  title: 'XXX - 404',
  banner: {
    text: '#ffffff',
    background: [
      '#0E2FFF',
    ],
    hidePhaser: true
  },

});



