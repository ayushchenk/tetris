import { Container } from "@pixi/display";
import { Direction } from "../common/Direction";
import { Settings } from "../common/Settings";
import { Block } from "./Block";
import { Shape } from "./Shape";

export class BaseShape implements Shape {
    private  readonly blocks: Block[];
    
    public readonly container: Container;

    constructor() {
        this.blocks = [];
        this.container = new Container();
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

    public rotate(): void { }

    //true if can move
    public move(direction: Direction, shapes: Shape[]): boolean {
        const canMove = this.checkDirection(direction, shapes);

        if (canMove) {
            this.blocks.forEach(block => block.move(direction));
        }

        return canMove;
    }

    private checkDirection(direction: Direction, shapes: Shape[]): boolean {
        switch (direction) {
            case Direction.Down:
                return this.checkDown(shapes);
            case Direction.Right:
                return this.checkRight(shapes);
            case Direction.Left:
                return this.checkLeft(shapes);
        }
    }

    private checkDown(shapes: Shape[]): boolean {
        const y = this.getHigestObstacleUnderShape(shapes);

        return this.bottom.graphics.y != y;
    }

    private checkLeft(shapes: Shape[]): boolean {
        let canMove = true;

        shapes.forEach(otherShape => {
            otherShape.right.forEach(otherRightBlock => {
                this.left.forEach(thisLeftBlock => {
                    if (thisLeftBlock.graphics.y == otherRightBlock.graphics.y && thisLeftBlock.graphics.x - Settings.Block.size == otherRightBlock.graphics.x) {
                        canMove = false;
                    }
                })
            });
        });

        return canMove;
    }

    private checkRight(shapes: Shape[]): boolean {
        let canMove = true;

        shapes.forEach(otherShape => {
            otherShape.left.forEach(otherLeftBlock => {
                this.right.forEach(thisRightBlock => {
                    if (thisRightBlock.graphics.y == otherLeftBlock.graphics.y && thisRightBlock.graphics.x + Settings.Block.size == otherLeftBlock.graphics.x) {
                        canMove = false;
                    }
                })
            });
        });

        return canMove;
    }

    private getHigestObstacleUnderShape(shapes: Shape[]): number {
        const curBotY = this.bottom.graphics.y;
        const curLeftX = this.left[0].graphics.x;
        const curRightX = this.right[0].graphics.x;

        const shapesBeneath = shapes.filter(shape => ((curLeftX <= shape.right[0].graphics.x && curLeftX >= shape.left[0].graphics.x) || (curRightX <= shape.right[0].graphics.x && curRightX >= shape.left[0].graphics.x)) && shape.top.graphics.y >= curBotY + Settings.Block.size);

        if (shapesBeneath.length == 0) {
            return Settings.App.height - Settings.Block.size;
        }

        let highest = shapesBeneath[0];

        shapesBeneath.forEach(shape => {
            if (shape.top.graphics.y < highest.top.graphics.y) {
                highest = shape;
            }
        });

        return highest.top.graphics.y - Settings.Block.size;
    }
}