import { Settings } from "../common/Settings";
import { BaseShape } from "./BaseShape";
import { Block } from "./Block";

export class ShapeO extends BaseShape {
    constructor(x: number = Settings.App.xAxis, color: number = Settings.Colors.yellow) {
        super();

        const block1 = new Block(x, 0, color);
        this.blocks.push(block1);

        const block2 = new Block(x + Settings.Block.size, 0, color);
        this.blocks.push(block2);

        const block3 = new Block(x, Settings.Block.size, color);
        this.blocks.push(block3);

        const block4 = new Block(x + Settings.Block.size, Settings.Block.size, color);
        this.blocks.push(block4);

        this.blocks.forEach(block => this.container.addChild(block.graphics));
    }
}