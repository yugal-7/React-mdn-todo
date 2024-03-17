import Form from "./components/Form";
import Todo from "./components/Todo";
import FilterButton from "./components/FilterButton";
import { useState } from "react";
import { nanoid } from "nanoid";


function App(props) {
  const [tasks, setTasks] = useState(props.tasks);

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      if(task.id === id){
        return {...task, completed: !task.completed}
      }
      return task;
    })
    setTasks(updatedTasks);
  }  

  function deleteTask(id) {
    const updatedTasks = tasks.filter((task) => task.id != id);
    setTasks(updatedTasks);
  }
  

  const taskList = tasks?.map(
    (task) => 
    <Todo 
        id={task.id} 
        name={task.name} 
        completed={task.completed} 
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={ deleteTask }
    />);
    function addTask(name){
      const obj = { id: `todo-${nanoid()}`, name, completed:false, key: `todo-${nanoid()}` };
      setTasks([...tasks, obj]);
      console.log(obj);
    }
    const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
    const headingText = `${taskList.length} ${tasksNoun} remaining`;


  return (
    <div className="todoapp stack-large">
      <h1>TodoApp</h1>
      <Form addTask={ addTask }/>
      <div className="filters btn-group stack-exception">
        <FilterButton />
        <FilterButton />
        <FilterButton />
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
          { taskList }
      </ul>
    </div>
  );
}

export default App;
