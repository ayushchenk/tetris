import { Container } from "@pixi/display";
import { Direction } from "../common/Direction";
import { Settings } from "../common/Settings";
import { Block } from "./Block";
import { Shape } from "./Shape";

export class BaseShape implements Shape {
    public readonly blocks: Block[];

    public readonly container: Container;

    constructor() {
        this.blocks = [];
        this.container = new Container();
        this.container.width = window.innerWidth;
        this.container.height = window.innerHeight;
    }

    public get bottom(): Block {
        let bottom = this.blocks[0];

        this.blocks.forEach(block => {
            if (block.graphics.y > bottom.graphics.y) {
                bottom = block;
            }
        });

        return bottom;
    }

    public get top(): Block {
        let top = this.blocks[0];

        this.blocks.forEach(block => {
            if (block.graphics.y < top.graphics.y) {
                top = block;
            }
        });

        return top;
    }

    public get left(): Block[] {
        let left = this.blocks[0];

        this.blocks.forEach(block => {
            if (block.graphics.x < left.graphics.x) {
                left = block;
            }
        });

        return this.blocks.filter(block => block.graphics.x == left.graphics.x);
    }

    public get right(): Block[] {
        let right = this.blocks[0];

        this.blocks.forEach(block => {
            if (block.graphics.x > right.graphics.x) {
                right = block;
            }
        });

        return this.blocks.filter(block => block.graphics.x == right.graphics.x);;
    }

    public rotate(allBlocks: Block[]): void { }

    //true if can move
    public move(direction: Direction, blocks: Block[]): boolean {
        const canMove = this.checkDirection(direction, blocks);

        if (canMove) {
            this.blocks.forEach(block => block.move(direction));
        }

        return canMove;
    }

    private checkDirection(direction: Direction, blocks: Block[]): boolean {
        switch (direction) {
            case Direction.Down:
                return this.checkDown(blocks);
            case Direction.Right:
                return this.checkRight(blocks);
            case Direction.Left:
                return this.checkLeft(blocks);
        }
    }

    private checkDown(blocks: Block[]): boolean {
        const y = this.getHigestObstacleUnderShape(blocks);

        return this.bottom.graphics.y != y;
    }

    private checkLeft(blocks: Block[]): boolean {
        let canMove = true;

        blocks.forEach(otherBlock => {
            this.left.forEach(thisLeftBlock => {
                if (thisLeftBlock.graphics.y == otherBlock.graphics.y && thisLeftBlock.graphics.x - Settings.Block.size == otherBlock.graphics.x) {
                    canMove = false;
                }
            })
        });

        return canMove;
    }

    private checkRight(blocks: Block[]): boolean {
        let canMove = true;

        blocks.forEach(otherBlock => {
            this.right.forEach(thisRightBlock => {
                if (thisRightBlock.graphics.y == otherBlock.graphics.y && thisRightBlock.graphics.x + Settings.Block.size == otherBlock.graphics.x) {
                    canMove = false;
                }
            })
        });

        return canMove;
    }

    private getHigestObstacleUnderShape(blocks: Block[]): number {
        const curBotY = this.bottom.graphics.y;
        const curLeftX = this.left[0].graphics.x;
        const curRightX = this.right[0].graphics.x;

        const blocksBeneath = blocks.filter(block => ((curLeftX <= block.graphics.x && curLeftX >= block.graphics.x) || (curRightX <= block.graphics.x && curRightX >= block.graphics.x)) && block.graphics.y >= curBotY + Settings.Block.size);

        if (blocksBeneath.length == 0) {
            return Settings.App.height - Settings.Block.size;
        }

        let highest = blocksBeneath[0];

        blocksBeneath.forEach(block => {
            if (block.graphics.y < highest.graphics.y) {
                highest = block;
            }
        });

        return highest.graphics.y - Settings.Block.size;
    }
}