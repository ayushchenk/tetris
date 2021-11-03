import { Container } from "@pixi/display";
import { Direction } from "../common/Direction";
import { Block } from "./Block";

export interface Shape {
    readonly container: Container;
    readonly blocks: Block[];

    get bottom(): Block;
    get top(): Block;
    get left(): Block[];
    get right(): Block[];

    move(direction: Direction, blocks: Block[]): boolean;
    rotate(blocks: Block[]): void;
}