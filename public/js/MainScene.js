import Snake from './Snake.js'

export default class MainScene extends Phaser.Scene {
    constructor(){
        super('MainScene');
    }

    create(){
        this.gameStarted = false
        this.startMessage = this.add.text(this.game.config.width/6, this.game.config.height/2-50, 'press any key to start!', {
			fontFamily: 'Quicksand',
			fontSize: '48px',
			color: '#EBAFF5',
			fontStyle: 'normal',
			stroke: '#000000',
			strokeThickness: 4,
			shadow: { offsetY: 4, offsetX: 4, blur: 6, color: '#A05C5C', fill: true, stroke: false },
			maxLines: 1
		})
        // this.snake = new Snake(this);
        this.input.keyboard.on("keydown", (event)=> {
            if (!this.gameStarted) {
                this.startMessage.destroy();
                this.startGame();
                this.gameStarted = true;
            }
        });

        
    }


    update(time){

        if(this.gameStarted){
            this.snake.update(time)
        }
        
    }

    startGame(time){
        this.snake = new Snake(this);
        this.gameStarted = true;
    }
}