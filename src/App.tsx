import React, { useEffect, useState } from "react"

type Props = {
  todos?: TodoItem[];
};

type TodoItem = {
  id: string | number;
  title: string;
  isDone?: boolean;
};

const App: React.FC<Props> = (props) => {
  const [todos, setTodos] = useState<TodoItem[]>(props.todos || [])
  const [filter, setFilter] = useState<string>("all")
  const [doneCount, setDoneCount] = useState(0)

  useEffect(() => {
    setFilter("all")
  }, [todos.length])

  const addTodo = (title: string = "") => {
    const newTodos = todos.slice();
    if (!title) {
      title = prompt("What to do?") || "";
      newTodos.push({
        id: Date.now(),
        title
      });
    }
    setTodos(newTodos)
  };

  const markAsDone = (todo: TodoItem) => {
    const newTodos = todos.slice().map(t => {
      if (t.id === todo.id) {
        t.isDone = true
      }
      return t
    })

    setTodos(newTodos)
    setDoneCount((oldValue) => ++oldValue)
  };

  const markAsUndone = (todo: TodoItem) => {
    const newTodos = todos.slice().map(t => {
      if (t.id === todo.id) {
        t.isDone = false
      }
      return t
    })

    setTodos(newTodos)
    setDoneCount((oldValue) => --oldValue)
  };

  const deleteTodo = (todo: TodoItem) => {
    const newTodos = todos.filter(t => t.id !== todo.id)
    setTodos(newTodos)
    if (!newTodos.length) {
      setDoneCount((oldValue) => --oldValue)
    }
  };

  const onFilterButtonClick = (filterType:string = '') => {
    if (filterType) {
      setFilter(filterType);
    }
  }

  return (
    <div>
      <p>{`${doneCount} / ${todos.length}`}</p>
      <ul>
        {todos
          .filter((todo) => (filter === "all" ? todo : !todo.isDone))
          .map((todo) => (
            <div key={`${todo.id}`}>
              <p>{`${todo.isDone ? "✅ " : ""}${todo.title}`}</p>
              <button onClick={() => !todo.isDone ? markAsDone(todo) : markAsUndone(todo)}>
                {"Done"}
              </button>
              <button onClick={() => deleteTodo(todo)}>{"Delete"}</button>
            </div>
          ))
        }
      </ul>
      <button onClick={() => addTodo()}>{"Add"}</button>
      <button onClick={() => onFilterButtonClick((filter === "all") ? "undone" : "all")}>
        {`Show ${filter === 'undone' ? 'all' : 'undone'} todos`}
      </button>
      <MemodFuncExpensiveTree />
    </div>
  );
};

function ExpensiveTree() {
  let now = performance.now();
  
  while (performance.now() - now < 1000) {
  // Artificial delay — do nothing for 1000ms
  }
  
  return null;
}

const MemodFuncExpensiveTree = React.memo(ExpensiveTree)

export default App;
