import React from "react";
import { useDrag } from "react-dnd";
import { TYPES } from "./types";
export const Task = ({id,nome}) =>{
    
    const [{isDragging},drag] = useDrag(()=>({
        type:TYPES.TASK,
        item:{id:id},
        collect: (monitor)=>({
            isDragging: !!monitor.isDragging(),
        })
    }))
    
    return <div ref={drag} style={{backgroundColor: isDragging ? "white" : "",color: isDragging ?"black":""}}>{nome}</div>
}