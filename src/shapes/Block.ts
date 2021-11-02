import { Graphics } from "@pixi/graphics";
import { Direction } from "../common/Direction";
import { Settings } from "../common/Settings";

export class Block{
    public readonly graphics : Graphics = new Graphics();

    constructor(x: number, y: number, color: number){
        this.graphics.x = x;
        this.graphics.y = y;

        this.graphics.lineStyle(Settings.Block.borderWidth, Settings.Block.borderColor);
        this.graphics.beginFill(color);
        this.graphics.drawRect(0, 0, Settings.Block.size, Settings.Block.size);
        this.graphics.endFill();
    }

    public move(direction: Direction): void{
        this.graphics.x += direction.xMoveOffset;
        this.graphics.y += direction.yMoveOffset;
    }
}