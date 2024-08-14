import { collect_images_main } from './collect_images';

function main() {
    // hello world
    var message = 'Hello World';
    console.log(message);
}

// main();
    
collect_images_main();

class bla {
    private _num: number;
    public get num(): number {
        return this._num;
    }
    public set num(value: number) {
        this._num = value;
    }
    constructor(num: number) {
        this.num = num;
    }

}
