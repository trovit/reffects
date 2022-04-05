export function toggleTodoReducer(state, todoId) {
  const { todos } = state
  const todoIndex = todos.findIndex(
    ({ id }) => id === todoId
  )
  const todo = todos[todoIndex]

  return {
    ...state,
    todos: [
      ...todos.slice(0, todoIndex),
      {
        ...todo,
        done: !todo.done
      },
      ...todos.slice(todoIndex + 1)
    ]
  }
}