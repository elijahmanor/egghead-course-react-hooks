import React, {
    Fragment,
    useState,
    useEffect,
    useReducer,
    useRef
  } from "react";
  
  /*
  *Add State to a React Function Component with the useState Hook** - Historically, you had to use a React Class Component in order to maintain state in a component. However, with Hooks, you can now add state to a Function Component using the useState hook. In this lesson, we will explain how to use this API and then convert a portion of an existing Class Component to a Function Component.
    - useState to capture input text (text) - display length countdown
    - useState to toggle input element (boolean)
    - Switch toggle boolean to use Functional Updater with prevState
    - Convert to combine the two values into an object useState
    - Demonstrate that it will not deep merge
    - Show simple work-around `setState(prevState => { return {..prevState, ...updatedValues}; });`
    - Show useLegacyState Hook that will merge (if needed)
    - Explain React Team's recommendation to "split state into multiple state variables based on which values tend to change together" --[Hooks FAQ](https://reactjs.org/docs/hooks-faq.html#should-i-use-one-or-many-state-variables)
  */
  
  const useTodoList = () => {
    const nextTodoId = useRef(0);
    return useReducer((state, action) => {
      switch (action.type) {
        case "ADD_TODO":
          return [
            ...state,
            {
              id: nextTodoId.current++,
              text: action.data
            }
          ];
        default:
          return state;
      }
    }, []);
  };
  
  function getColor(value) {
    // http://jsfiddle.net/jongobar/sNKWK/
    //value from 0 to 1
    var hue = ((1 - value) * 120).toString(10);
    return ["hsl(", hue, ",100%,50%)"].join("");
  }
  
  function TodoList() {
    const inputRef = useRef();
    const [todos, dispatch] = useTodoList([]);
    const [color, setColor] = useState("");
    useEffect(() => {
      const handleKeyDown = e => {
        setColor(getColor(e.which / 100));
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    });
    useEffect(() => {
      setColor("#" + Math.floor(Math.random() * 16777215).toString(16));
    }, []);
    const handleSubmit = e => {
      e.preventDefault();
      dispatch({
        type: "ADD_TODO",
        data: inputRef.current.value
      });
      inputRef.current.value = "";
    };
    return (
      <div style={{ backgroundColor: color }}>
        <form onSubmit={handleSubmit}>
          <input autofocus ref={inputRef} />
          <ul>
            {todos.map(todo => (
              <li key={todo.id}>
                <input type="checkbox" />
                <span>
                  {todo.id} - {todo.text}
                </span>
                <button onClick={() => dispatch("TOGGLE_TODO")}>x</button>
              </li>
            ))}
          </ul>
        </form>
      </div>
    );
  }
  