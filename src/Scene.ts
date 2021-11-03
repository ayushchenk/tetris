import { Container, Ticker } from "pixi.js";
import { Direction } from "./common/Direction";
import { Settings } from "./common/Settings";
import { Block } from "./shapes/Block";
import { Shape } from "./shapes/Shape";
import { Square } from "./shapes/Square";

export class Scene extends Container {
    private readonly placedShapes: Shape[] = [];
    private currentShape: Shape;

    constructor() {
        super();

        document.addEventListener("keydown", this.handleKeyDown.bind(this));

        this.currentShape = new Square(Settings.App.xAxis, Settings.Colors.yellow);
        this.addChild(this.currentShape.container);

        Ticker.shared.minFPS = 1;
        Ticker.shared.maxFPS = Settings.App.FPS;
        Ticker.shared.add(this.tick, this);
    }

    private handleKeyDown(e: KeyboardEvent): void {
        if (Direction.AllDirections.filter(dir => dir.keyCode == e.code).length > 0) {
            const direction = Direction.AllDirections.find(dir => dir.keyCode == e.code);

            this.moveShape(direction);
        }
    }

    private tick(): void {
        this.moveShape(Direction.Down);
    }

    private moveShape(direction: Direction) {
        const canMove = this.currentShape.move(direction, this.placedShapes);

        if (!canMove && direction == Direction.Down) {
            this.spawnNewShape();
        }
    }

    private spawnNewShape() {
        this.placedShapes.push(this.currentShape);
        this.currentShape = new Square(Settings.App.xAxis, Settings.Colors.yellow);
        this.addChild(this.currentShape.container);
    }
}
