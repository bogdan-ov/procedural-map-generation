class Keyboard {
    constructor() {

        this.data = {};
        this.key = null;
        this.keys = {};
        this.down = false;

        onkeypress = e=> {

            this.down = true;
            this.key = e.code[e.code.length - 1 ];
            this.keys[this.key] = true;
            this.data = e;

        }
        onkeyup = e=> {

            this.down = false;
            this.data = e;
            
            delete this.keys[e.code[e.code.length - 1 ]];

        }

    }

    keyDown(key) {

        return (this.keys[key] || false);

    }
}
export default new Keyboard;