import { useState, useEffect } from 'react'
import React from 'react'

const People = ({people}) => {
    
    const clickImage = (id) => {
        console.log(id)
        //setIsEditing(true)
        //setEditID(id)
    }
    return (
        <div>
            <header>Registered List</header>
            <ul className="row-people img-boxes">
            {people.map((person)=>{
                const {id,nickname,firstname,lastname,birthday,status,
                    country,img,hobby ,likes} = person
                return (
                    <li className="column-people person-box" key={id} >
                        <img src={img} alt={nickname} className="img-list" onClick={()=>clickImage(id)}/>
                        <p className="img-name">{nickname}</p>
                    </li>
                );
            })}
            </ul>
        </div>
    )
}

export default People
