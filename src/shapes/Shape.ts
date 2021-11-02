import { Container } from "@pixi/display";
import { Direction } from "../common/Direction";
import { ILiteEvent } from "../common/LiteEvent";
import { Block } from "./Block";

export interface Shape {
    readonly container: Container;
    readonly blocks: Block[];

    get bottom(): Block;
    get top(): Block;
    get left(): Block;
    get right(): Block;

    get onMove(): ILiteEvent<void>;

    move(direction: Direction): void;
    rotate(): void;
}