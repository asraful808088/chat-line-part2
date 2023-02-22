import React from "react";
import style from './style.module.css'
export default function Button({name='button'}){
    return <button value={name} className={
        style.base
    }>
    {name}
    
    </button>
}