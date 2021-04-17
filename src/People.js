import React from 'react'

const People = ({people}) => {
    
    const clickImage = (_id) => {
        console.log(_id)
        //setIsEditing(true)
        //setEditID(_id)
    }
    return (
        <div>
            <header>Registered List</header>
            <ul className="row-people img-boxes">
            {people.map((person)=>{
                const {_id,nickname,img} = person
                return (
                    <li className="column-people person-box" key={_id} >
                        <img src={img} alt={nickname} className="img-list" onClick={()=>clickImage(_id)}/>
                        <p className="img-name">{nickname}</p>
                    </li>
                );
            })}
            </ul>
        </div>
    )
}

export default People
