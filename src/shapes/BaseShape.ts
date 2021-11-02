import { Container } from "@pixi/display";
import { Direction } from "../common/Direction";
import { ILiteEvent, LiteEvent } from "../common/LiteEvent";
import { Block } from "./Block";
import { Shape } from "./Shape";

export class BaseShape implements Shape {
    protected readonly _onMove: LiteEvent<void>;

    public readonly blocks: Block[];
    public readonly container: Container;

    constructor() {
        this.blocks = [];
        this.container = new Container();
        this._onMove = new LiteEvent<void>();
    }

    get bottom(): Block {
        let bottom = this.blocks[0];

        this.blocks.forEach(block => {
            if (block.graphics.y > bottom.graphics.y) {
                bottom = block;
            }
        });

        return bottom;
    }

    get top(): Block {
        let top = this.blocks[0];

        this.blocks.forEach(block => {
            if (block.graphics.y < top.graphics.y) {
                top = block;
            }
        });

        return top;
    }

    get left(): Block {
        let left = this.blocks[0];

        this.blocks.forEach(block => {
            if (block.graphics.x < left.graphics.x) {
                left = block;
            }
        });

        return left;
    }

    get right(): Block {
        let right = this.blocks[0];

        this.blocks.forEach(block => {
            if (block.graphics.x > right.graphics.x) {
                right = block;
            }
        });

        return right;
    }

    get onMove(): ILiteEvent<void> {
        return this._onMove.expose();
    }

    move(direction: Direction): void {
        this.blocks.forEach(block => block.move(direction));
        this._onMove.trigger(null);
    }

    rotate(): void { }
}