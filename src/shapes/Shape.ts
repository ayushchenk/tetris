import { Container } from "@pixi/display";
import { Direction } from "../common/Direction";
import { Block } from "./Block";

export interface Shape {
    readonly container: Container;

    get bottom(): Block;
    get top(): Block;
    get left(): Block[];
    get right(): Block[];

    move(direction: Direction, shapes: Shape[]): boolean;
    rotate(): void;
}