import React, { useState } from 'react';

const Form = (props) => {
    const [newTask, setNewTask] = useState("");
    const [tasks,setTasks] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(newTask === ""){
            return
        }

        const taskItem = {
            text : newTask,
            complete : false
        }
        setTasks([...tasks,taskItem])
        setNewTask('')
    }

    const handleDelete = (deleteIdx) =>{
        const filterTask = tasks.filter((tasks,i) => {
            return i !== deleteIdx
        })
        setTasks(filterTask)
    }

    const handleComplete = (idx) =>{
        const updatedTask = tasks.map((task,i) => {
            if(idx === i){
                task.complete = !task.complete
            }
            return task
        })
        setTasks(updatedTask)
    }

    return(
        <div>
            <form onSubmit={(e) => {
                handleSubmit(e)
            }}>
                    <input onChange={(e) =>{
                        setNewTask(e.target.value)
                    }} type="text" value={newTask}></input>
                    <button type='submit'>Add</button>
            </form >
            <div>
                        {tasks.map((task,i)=> {
                            const taskClasses =[]
                            if(task.complete){
                                taskClasses.push("taskDone")
                            }

                            return  <div key={i}>
                                <span className={taskClasses.join("")}>{task.text}</span>
                                <input onChange={(e)=>{
                                    handleComplete(i)
                                }} checked={task.complete} type="checkbox"/>
                                <button onClick={(e) => {
                                    handleDelete(i)
                                }}>Delete</button>
                            </div>
                        })}
            </div>
        </div>
    )
}

export default Form