export type PlayerType = 'player' | 'AI';

export type Move = {
    from: [number, number];
    to: [number, number];
}

export type GameStatusType = 'active' | 'ended'

// 0 = empty, 1 = player men, 2 = AI men, 3 = player king, 4 = AI king
export type PieceType = 0 | 1 | 2 | 3 | 4;

export type BoardType = PieceType[][];

export type GameState = {
    board: BoardType;
    turn: PlayerType;
    status?: GameStatusType;
}
