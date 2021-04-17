import { useState } from 'react'
import './App.css'
import Person from './Person.js'
import AddPerson from './AddPerson.js'
import { AiFillPlusCircle,AiFillCloseCircle } from "react-icons/ai"
import { useGlobalContext} from './context'
import Alert from './Alert'
import loading from './images/loading.gif'
import waterdrop from './images/waterdrop.gif'

function App() {
  //const [people,setPeople] = useState([])
  const {people} = useGlobalContext()
  let {chosenPerson,setChosenPerson} = useGlobalContext()
  let {setIsEditing} = useGlobalContext()
  const [isAdding,setIsAdding] = useState(false)
  const {alert,showAlert} = useGlobalContext()
  // useEffect(() => {
  //   const fetchPeople = async () => {
  //     const res = await fetch('http://localhost:5000/people')
  //     const data = await res.json()
  //     setPeople(data)
  //     //console.log(data)
  //   }

  //   fetchPeople()
  // }, [])
  //console.log(chosenPerson)
  const clickImage = (_id) => {
    //console.log(_id)
    setChosenPerson(_id)
    setIsEditing(false)
  }

  /* add person clicked */
  const addPerson = () => {
    //console.log()
    setIsAdding(!isAdding)
    if(chosenPerson===0){
      setChosenPerson(chosenPerson+1)
    } else if(chosenPerson===1){
      setChosenPerson(chosenPerson-1)
    }
    
    //setIsEditing(true)
  }



  return (
    <div className="App">
      <div className="div-form">
        <div className="reg-form">
          <div className="header-div">
            {alert.show
              ? <Alert {...alert} removeAlert={showAlert} people={people}/>
              : 
              <header className="reg-header">
              Most Famous People
              </header>
              } 
            
            {isAdding === false 
            ? <AiFillPlusCircle className="add-btn blue" onClick={()=>addPerson()}/>
            : <AiFillCloseCircle className="add-btn red" onClick={()=>addPerson()}/>
            }
          </div>
          <div className="div-person"> 
            <div className="chosen-person" >
            {chosenPerson === 0
              ? (
                <>
                <img src={waterdrop} alt="loading" className="img-waterdrop" /><br></br>
                <span> Click Below </span>
                </>
              )
              : isAdding === false 
              ? <Person people={people} chosenPerson={chosenPerson}/>  
              : <AddPerson/>
            } 
              </div>
          </div>

          <div className="div-people"> 
          <header>List of Registered People</header>
          
            <ul className="row-people img-boxes ">
            {!people.length ? <img src={loading} alt="loading" className="img-loading" /> 
            :
            (
              <>
              {people.map((person)=>{
                const {_id,nickname,img} = person
                return (
                    <li className="column-people person-box" key={_id} >
                        {(img.includes('http://') || img.includes('https://')) && (img.includes('.jpg') || img.includes('.png')) 
                        ? <img src={img} title="click to view" alt={nickname} className="img-list" onClick={()=>clickImage(_id)}/>
                        : <img src="https://cdn.pixabay.com/photo/2016/11/14/17/39/person-1824147_960_720.png"
                         title="click to view" alt={nickname} className="img-list" onClick={()=>clickImage(_id)}/>
                        }
                        
                        <p className="img-name">{nickname}</p>
                    </li>
                );
            })}
              </>
            )

            }
            
            </ul>
          </div>


        </div>
      </div>
    </div>
  );
}

export default App;
