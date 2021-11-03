import { Settings } from "../common/Settings";
import { BaseShape } from "./BaseShape";
import { Block } from "./Block";

export class ShapeI extends BaseShape {
    private state: boolean = true;

    constructor(
        x: number = Settings.App.xAxis,
        color: number = Settings.Colors.cyan,
        length: number = Settings.ShapeI.count
    ) {
        super();

        for (let i = 0; i < length; i++) {
            this.blocks.push(new Block(x, i * Settings.Block.size, color));
        }

        this.blocks.forEach(block => this.container.addChild(block.graphics));
    }

    public rotate(allBlocks: Block[]): void {
        if (!this.canRotate(allBlocks)) {
            return;
        }

        const base = this.blocks[0];

        this.blocks.filter(block => block !== base).forEach((block, index) => {
            if (this.state) {
                block.graphics.y = base.graphics.y;
                block.graphics.x = base.graphics.x + ((index + 1) * Settings.Block.size);
            } else {
                block.graphics.x = base.graphics.x;
                block.graphics.y = base.graphics.y + ((index + 1) * Settings.Block.size);
            }
        });

        this.state = !this.state;
    }

    private canRotate(allBlocks: Block[]): boolean {
        const base = this.blocks[0];

        const obstacles: Block[] = [];

        if (this.state) {
            const blocksOnSameY = allBlocks.filter(block => block.graphics.y == base.graphics.y);

            for (let i = 1; i < this.blocks.length; i++) {
                obstacles.push(blocksOnSameY.find(block => block.graphics.x == base.graphics.x + Settings.Block.size * i));
            }
        } else {
            const blocksOnSameX = allBlocks.filter(block => block.graphics.x == base.graphics.x);

            for (let i = 1; i < this.blocks.length; i++) {
                obstacles.push(blocksOnSameX.find(block => block.graphics.y == base.graphics.y + Settings.Block.size * i));
            }
        }

        return obstacles.every(obst => obst != undefined);
    }
}