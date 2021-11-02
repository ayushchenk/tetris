export class Settings {
    static Colors = class {
        public static readonly red: number = 0xff0000;
        public static readonly green: number = 0x00ff00;
        public static readonly blue: number = 0x0000ff;
        public static readonly yellow: number = 0xffff00;
        public static readonly black: number = 0x0;
    }

    static Block = class {
        public static readonly size: number = 20;
        public static readonly borderWidth: number = 1;
        public static readonly borderColor: number = Settings.Colors.black;
    }

    static App = class {
        public static readonly xAxis: number = Math.floor(window.innerWidth / 2 / Settings.Block.size) * Settings.Block.size;
        public static readonly height: number = Math.floor(window.innerHeight / Settings.Block.size) * Settings.Block.size;
        public static readonly columns: number = 10;
        public static readonly rows: number = 20;
        public static readonly FPS: number = 1;
    }
}