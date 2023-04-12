export default class Snake{

    

    constructor(scene) {
        this.scene = scene;
        this.__bodySize = 16;
        this.__score = 0;
        this.lastMoveTime = 0;
        this.moveTimeInterval = 100;
        this.direction = Phaser.Math.Vector2.RIGHT;
        this.apple = this.scene.add.circle(0, 0, this.__bodySize/2, 0xff0000).setOrigin(0)
        this.appleLeaf = this.scene.add.rectangle(0, 0, 4, 4, 0x00ff00)
        this.setAppleLocation()
        this.body = []
        this.body.push(this.scene.add.rectangle(Math.floor(this.scene.game.config.width/2), Math.floor(this.scene.game.config.height/2), this.__bodySize, this.__bodySize, 0x0000ff).setOrigin(0))
        this.scoreText = this.scene.add.text(this.scene.game.config.width-40, 10, `${this.__score}`, {
			fontFamily: 'Quicksand',
			fontSize: '20px',
			color: '#EBAFF5',
			fontStyle: 'normal',
			stroke: '#000000',
			strokeThickness: 4,
			shadow: { offsetY: 4, offsetX: 4, blur: 6, color: '#A05C5C', fill: true, stroke: false },
			maxLines: 1
		})
        this.scene.input.keyboard.on("keydown", e=>this.keyDown(e))
    }

    setAppleLocation(){
        this.apple.x = Math.floor(Math.random() * this.scene.game.config.width / this.__bodySize) * this.__bodySize;
        this.apple.y = Math.floor(Math.random() * this.scene.game.config.height / this.__bodySize) * this.__bodySize;
        this.appleLeaf.x = this.apple.x + this.__bodySize/2
        this.appleLeaf.y = this.apple.y + this.__bodySize/2
    }

    keyDown(event){
        switch(event.keyCode){
            case 37: //left
                if(this.direction !== Phaser.Math.Vector2.RIGHT)
                    this.direction = Phaser.Math.Vector2.LEFT
                break;
            case 38: //up
                if(this.direction !== Phaser.Math.Vector2.DOWN)
                    this.direction = Phaser.Math.Vector2.UP
                break;
            case 39: //right
                if(this.direction !== Phaser.Math.Vector2.LEFT)
                    this.direction = Phaser.Math.Vector2.RIGHT
                break;
            case 40: //down
                if(this.direction !== Phaser.Math.Vector2.UP)
                    this.direction = Phaser.Math.Vector2.DOWN
                break;
        }
    }

    update(time){
        if(time >= this.lastMoveTime + this.moveTimeInterval){
            this.lastMoveTime = time;
            this.move();
        }
    }


    move(){
        let newX = this.body[0].x + this.direction.x *  this.__bodySize
        let newY = this.body[0].y + this.direction.y * this.__bodySize

        this.checkSnakeAppleCollision(newX, newY)
        this.checkSnakeCollision(newX, newY)
        for(let i=this.body.length-1; i>0;i--){
            this.body[i].x = this.body[i-1].x
            this.body[i].y = this.body[i-1].y
        }
        this.body[0].x = newX
        this.body[0].y = newY

        
    }


    checkSnakeAppleCollision(x, y){
        if(x === this.apple.x && y === this.apple.y){
            this.body.push(this.scene.add.rectangle(0, 0, this.__bodySize, this.__bodySize, 0x00DDff).setOrigin(0))
            this.setAppleLocation();
            this.__score++
            this.scoreText.destroy()
            this.scoreText = this.scene.add.text(this.scene.game.config.width-40, 10, `${this.__score}`, {
                fontFamily: 'Quicksand',
                fontSize: '20px',
                color: '#EBAFF5',
                fontStyle: 'normal',
                stroke: '#000000',
                strokeThickness: 4,
                shadow: { offsetY: 4, offsetX: 4, blur: 6, color: '#A05C5C', fill: true, stroke: false },
                maxLines: 1
            })
        }
    }

    checkSnakeCollision(x, y){

        if(x < 0 || x >= this.scene.game.config.width || y < 0 || y >= this.scene.game.config.height){
            this.scene.scene.restart()
        }
        let tail = this.body.slice(1)
        if(tail.some(t => t.x === this.body[0].x && t.y === this.body[0].y)){
            this.scene.scene.restart();
        }
    }


}