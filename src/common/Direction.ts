import { Settings } from "./Settings";

export class Direction {
    private constructor(
        // public readonly xDrawOffset: number,
        // public readonly yDrawOffset: number,
        public readonly xMoveOffset: number,
        public readonly yMoveOffset: number,
        public readonly keyCode: string) { }

    public static readonly Right: Direction = new Direction(Settings.Block.size, 0, "ArrowRight");
    public static readonly Left: Direction = new Direction(-Settings.Block.size, 0, "ArrowLeft");
    public static readonly Down: Direction = new Direction(0, Settings.Block.size, "ArrowDown");

    public static readonly AllDirections: Direction[] = [Direction.Right, Direction.Left, Direction.Down];
}
