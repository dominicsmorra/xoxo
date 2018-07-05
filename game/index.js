import { Map } from 'immutable'

export const MOVE = 'MOVE';

export const move = (player, coord) => ({
  type: MOVE,
  player,
  coord
})

function turn (current = 'X', action) {
  if (action.type === MOVE) {
    return current === 'X' ? 'O' : 'X'
  }
  return current
}

function board (board = Map(), {type, coord, player}) {
  if (type === MOVE) {
    return board.setIn(coord, player)
  }
  return board
}


export default function reducer(state = {}, action) {
  return {
    board: board(state.board, action),
    turn: turn(state.turn, action)
  }
}