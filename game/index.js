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

function streak(board, first, ...rest) {
  const player = board.getIn(first)
  if (!player) return null
  for (let c of rest) {
    if (board.getIn(c) !== player) return null
  }
  return player
}

export function winner(board) {
  let i = 3; while (--i >= 0) {
    let row = streak(board, [0, i], [1, i], [2, i])
    if (row) return row
    let col = streak(board, [i, 0], [i, 1], [i, 2])
    if (col) return col
  }

  let diagDown = streak(board, [0, 0], [1, 1], [2, 2])
  if (diagDown) return diagDown
  
  const diagUp = streak(board, [2, 0], [1, 1], [0, 2])
  if (diagUp) return diagUp
  
  // Any spaces mean we're still playing
  let r = 3; while (--r >= 0) {
    let c = 3; while (--c >= 0)
      if (!board.hasIn([r, c])) return null
  }

  // Otherwise, it's a draw.
  return 'draw'
}

const ongoing = Map()
  .setIn([0, 0], 'X')
  .setIn([1, 0], 'O')
  .setIn([0, 1], 'X')
  .setIn([1, 1], 'O')

const xWins = ongoing
  .setIn([0, 2], 'X')

const oWins = ongoing
  .setIn([0, 0], 'O')
  .setIn([1, 1], 'O')
  .setIn([2, 2], 'O')


console.log('null?', winner(ongoing))
console.log('X?', winner(xWins))
console.log('O?', winner(oWins))


export default function reducer(state = {}, action) {
  return {
    board: board(state.board, action),
    turn: turn(state.turn, action)
  }
}