import React, { useState,useEffect } from "react";
import { Task } from "./Task";
import { useDrop } from "react-dnd";
import { TYPES } from "./types";
import axios from 'axios'

export const Main = () => {
    
    const [{isOver}, drop] = useDrop(()=>({
        accept:TYPES.TASK,
        drop: (item)=>addTask(item.id),
        collect: (monitor)=>({
            isOver: !!monitor.isOver(),
        })
    }))
    

    const addTask = (id) =>{
        const tasklist = Tasks.filter((task)=> id === task.id);
        setWork((Work)=>[...Work, tasklist[0]]);
    }
    const [Work,setWork] = useState([])
    const [Tasks,setTasks] = useState([]) 

    
    const style ={
        margin:"10px",
        padding:"10px",
        width:"200px",
        color:"white",
        backgroundColor:"black"
    }
    const dropStyle ={
        border:isOver ? "solid 3px red":"",
        margin:"10px",
        padding:"10px",
        width:"200px",
        color:"white",
        backgroundColor:"black"
    }

    useEffect(()=>{
        const load = async()=>{
            const r = await axios.get('http://127.0.0.1:8000/api/tasks/1');
            setTasks(r.data)
        }
        load();
    },[])

    console.log(Tasks)
    return(
        <div style={{display:'flex'}}>
            <div className="SideBar" style={style}>
                {
                    Tasks.map(({id,nome})=> <Task key={id} taskName={nome} id={id}/>)
                }
            </div>

            <div ref={drop}
            className="WorkSpace" style={dropStyle}>
              {
                Work.map(({id,nome})=><Task key={id} taskName={nome} id={id}/>)
              }
            </div>
        </div>   
    );
} 