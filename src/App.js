import './App.css';
import Header from './components/header'
import Footer from './components/footer'
import About from './components/About';
import { BrowserRouter as Router, Route } from 'react-router-dom/cjs/react-router-dom.min';
import Tasks from './components/Tasks'
import AddTask from './components/AddTask';

import {useState, useEffect } from 'react';



const App = () => {
  const [showAddTask, setShowAddTask ] = useState(false)
  const [tasks, setTask] = useState([])
   useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTask(tasksFromServer)
    }
     
    getTasks()
  }, [])

  //Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    console.log(data)
    return data
   }

   //Fetch Tasks
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    console.log(data)
    return data
   }




//ADD task
  const addTask = async (task) => {

    const res = await fetch('http://localhost:5000/tasks/', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task)
    })
    const data = await res.json()
    setTask([...tasks, data])

    //  const id = Math.floor(Math.random()* 10000) + 1
    //  const newTask = {id, ...task}
    //  setTask([...tasks, newTask])
  }




//dlete remkinder
const deleteTask = async (id) => {

  await fetch(`http://localhost:5000/tasks/${id}`,
   {method: 'DELETE'})
  setTask(tasks.filter((task) => task.id !== id  ) )
}

//Toggle reminder
const toggleReminder = async (id) => {
  const taskToToggle = await fetchTask(id)
  const updatedTask =  {...taskToToggle, reminder:!taskToToggle.reminder}
  const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updatedTask)
    })
    const data = await res.json()
  setTask(tasks.map((task) => task.id === id ?
  {...task, reminder:data.reminder} : task 

  ))
}



  return (
    <Router>
    
    <div className="container">
      
     <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
      
   
    
    
      <Route path='/'   exact render={(props) => (
        <>
        {showAddTask && <AddTask onAdd={addTask}/>}
 {tasks.length > 0 ? (<Tasks tasks={tasks}  onDelete={deleteTask} onToggle={toggleReminder}/>) :('No task to show' ) }
        </>
      )}/>
     <Route path='/about' component={About}/> 
     

    <Footer/>
    </div>
    
    </Router>
  );

 
}

export default App;
