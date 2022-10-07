import Phaser from 'phaser'
import { sceneEvents } from '../events/EventsCenter';

export const checkOrientation = (orientation) => {
    if (orientation === Phaser.Scale.PORTRAIT) {
        if (window.innerWidth < 900) {
            sceneEvents.emit('setMessageVisible')
        }
    }
    else if (orientation === Phaser.Scale.LANDSCAPE) {
        sceneEvents.emit('setMessageInvisible')
    }
}
