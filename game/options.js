//Constants
GRV = {
    zero: 0,
    micro: 0.0001,
    low:0.0004,
    moon:0.0007,
    normal:0.0014,
    earth:0.0016,
    heavy:0.0018,
    lead:0.0024
}
colors = {
    white: '0xFFFFFF',
    black: '0x000000',
    blue: '0x268ECB',
    dkBlue: '0x14546f',
    teal: '0xC8FDFE',
    deepBlue: '0x114FFF',
    orange: '0xFE9208',
    lightOrange: '0xFED59B',
    yellow: '0xFFC102'
};

//Setup
cursors = [];
brushes = [];
numPlanets = 120; // 160 is about max with decent performance
paused = false;

restrictedColors = ['deepBlue','orange','lightOrange','yellow'];
entityColors = [colors.blue,colors.dkBlue,colors.white];

gravityStrength = GRV.zero;