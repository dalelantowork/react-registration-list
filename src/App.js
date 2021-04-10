import { useState, useEffect } from 'react'
import './App.css'
import People from './People.js'
import Person from './Person.js'
import AddPerson from './AddPerson.js'
import { AiFillPlusCircle,AiFillCloseCircle } from "react-icons/ai"
import {AppContext, useGlobalContext} from './context'
import Alert from './Alert'
import { IoPerson } from "react-icons/io5";
function App() {
  //const [people,setPeople] = useState([])
  const {people,setPeople,addEffect} = useGlobalContext()
  let {chosenPerson,setChosenPerson} = useGlobalContext()
  let {isEditing,setIsEditing} = useGlobalContext()
  const [isAdding,setIsAdding] = useState(false)
  const {alert,setAlert,showAlert} = useGlobalContext()
  // useEffect(() => {
  //   const fetchPeople = async () => {
  //     const res = await fetch('http://localhost:5000/people')
  //     const data = await res.json()
  //     setPeople(data)
  //     //console.log(data)
  //   }

  //   fetchPeople()
  // }, [])

  const clickImage = (id) => {
    console.log(id)
    setChosenPerson(id)
    setIsEditing(false)
    //setEditID(id)
  }

  /* add person clicked */
  const addPerson = () => {
    //console.log()
    setIsAdding(!isAdding)
    //setIsEditing(true)
    //setEditID(id)
  }

  
  // useEffect(()=>{
  //   let slider = setInterval(()=>{
  //     setIndex(index + 1)
  //   },3000) 
  //   return () => clearInterval(slider)
  // }, [index])

  return (
    <div className="App">
      <div className="div-form">
        <div className="reg-form">
          <div className="header-div">
            {alert.show
              ? <Alert {...alert} removeAlert={showAlert} people={people}/>
              : 
              <header className="reg-header">
              COVID-19 Vaccine
              </header>
              } 
            
            {isAdding === false 
            ? <AiFillPlusCircle className="add-btn blue" onClick={()=>addPerson()}/>
            : <AiFillCloseCircle className="add-btn red" onClick={()=>addPerson()}/>
            }
          </div>
          <div className="div-person"> 
            <div className="chosen-person" >
              {isAdding === false 
              ? <Person people={people} chosenPerson={chosenPerson}/>  
              : <AddPerson/>
              }
              </div>
          </div>

          <div className="div-people"> 
          <header>List of Registered People</header>
          
            <ul className="row-people img-boxes ">
            {people.map((person)=>{
                const {id,nickname,firstname,lastname,birthday,status,
                    country,img,hobby ,likes} = person
                return (
                    <li className="column-people person-box" key={id} >
                        {(img.includes('http://') || img.includes('https://')) && (img.includes('.jpg') || img.includes('.png')) 
                        ? <img src={img} title="click to view" alt={nickname} className="img-list" onClick={()=>clickImage(id)}/>
                        : <img src="https://cdn.pixabay.com/photo/2016/11/14/17/39/person-1824147_960_720.png"
                         title="click to view" alt={nickname} className="img-list" onClick={()=>clickImage(id)}/>
                        }
                        
                        <p className="img-name">{nickname}</p>
                    </li>
                );
            })}
            </ul>
          </div>


        </div>
      </div>
    </div>
  );
}

export default App;
