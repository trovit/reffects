import { toggleTodoReducer } from './mutations'

describe('mutations', () => {
  test('toggleTodoReducer toggles a completed todo', () => {
    const state = {
      todos: [
        { id: 1, done: false },
        { id: 2, done: true }
      ],
      other: 'state'
    }

    const result = toggleTodoReducer(state, 2)

    expect(result).toStrictEqual({
      todos: [
        { id: 1, done: false },
        { id: 2, done: false }
      ],
      other: 'state'
    })
  })

  test('toggleTodoReducer toggles a uncompleted todo', () => {
    const state = {
      todos: [
        { id: 1, done: false }
      ],
      other: 'state'
    }

    const result = toggleTodoReducer(state, 1)

    expect(result).toStrictEqual({
      todos: [
        { id: 1, done: true }
      ],
      other: 'state'
    })
  })
})