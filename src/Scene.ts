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
        this.currentShape.onMove.on(this.shapeMove.bind(this));
        this.addChild(this.currentShape.container);

        Ticker.shared.minFPS = 1;
        Ticker.shared.maxFPS = Settings.App.FPS;
        Ticker.shared.add(this.tick, this);
    }

    private handleKeyDown(e: KeyboardEvent): void {
        if (Direction.AllDirections.filter(dir => dir.keyCode == e.code).length > 0) {
            const direction = Direction.AllDirections.find(dir => dir.keyCode == e.code);
            
            this.currentShape.move(direction);
        }
    }

    private tick(): void {
        this.currentShape.move(Direction.Down);
    }

    private getHigestObstacleUnderShape(): number {
        const curLeftX = this.currentShape.left.graphics.x;
        const curRightX = this.currentShape.right.graphics.x;

        const shapesBeneath = this.placedShapes.filter(shape => (curLeftX <= shape.right.graphics.x && curLeftX >= shape.left.graphics.x) || (curRightX <= shape.right.graphics.x && curRightX >= shape.left.graphics.x));

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

    private shapeMove() {
        const y = this.getHigestObstacleUnderShape();
        console.log("moved: " + y + "  " + this.currentShape.bottom.graphics.y);
        
        if(this.currentShape.bottom.graphics.y == y){
            this.currentShape.onMove.off();

            this.placedShapes.push(this.currentShape);

            this.currentShape = new Square(Settings.App.xAxis, Settings.Colors.yellow);
            this.currentShape.onMove.on(this.shapeMove.bind(this));
            this.addChild(this.currentShape.container);
        }
    }
}
