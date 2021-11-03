import { Container, Ticker } from "pixi.js";
import { Direction } from "./common/Direction";
import { Settings } from "./common/Settings";
import { ShapeI } from "./shapes/ShapeI";
import { Shape } from "./shapes/Shape";
import { ShapeO } from "./shapes/ShapeO";
import { Block } from "./shapes/Block";
import { ShapeL } from "./shapes/ShapeL";

export class Scene extends Container {
    private readonly placedShapes: Shape[] = [];
    private currentShape: Shape;

    private get allBlocks(): Block[] {
        const allBlocks: Block[] = [];

        this.placedShapes.forEach(shape => {
            allBlocks.push(...shape.blocks);
        });

        return allBlocks;
    }

    constructor() {
        super();

        document.addEventListener("keydown", this.handleKeyDown.bind(this));

        this.spawnNewShape();

        Ticker.shared.minFPS = 1;
        Ticker.shared.maxFPS = Settings.App.FPS;
        Ticker.shared.add(this.tick, this);
    }

    private handleKeyDown(e: KeyboardEvent): void {
        switch (e.code) {
            case Direction.Left.keyCode:
                return this.moveShape(Direction.Left);
            case Direction.Right.keyCode:
                return this.moveShape(Direction.Right);
            case Direction.Down.keyCode:
                return this.moveShape(Direction.Down);
            case Direction.Up.keyCode:
                return this.currentShape.rotate(this.allBlocks);
        }
    }

    private tick(): void {
        this.moveShape(Direction.Down);
    }

    private moveShape(direction: Direction): void {
        const canMove = this.currentShape.move(direction, this.allBlocks);

        if (!canMove && this.currentShape.top.graphics.y <= 0) {
            Ticker.shared.stop();
            alert("Game over");
            return;
        }

        if (!canMove && direction == Direction.Down) {
            this.spawnNewShape();
        }
    }

    private spawnNewShape(): void {
        if (this.currentShape) {
            this.placedShapes.push(this.currentShape);
        }

        this.currentShape = this.generateRandomShape();

        this.addChild(this.currentShape.container);
    }

    private generateRandomShape(): Shape {
        const randomNumber = Math.round(Math.random() * 2);

        switch (randomNumber) {
            case 0: return new ShapeO();
            case 1: return new ShapeI();
            case 2: return new ShapeL();
        }
    }
}
