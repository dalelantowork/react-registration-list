import React, { useState, useContext, useEffect  } from 'react'

const AppContext = React.createContext()

const AppProvider = ({children}) => {
    const [isModalOpen,setIsModalOpen] = useState(false)
    const [people,setPeople] = useState([])
    const addEffect = useState(true)
    const [alert,setAlert] = useState({
        show:false, msg:'sucessfully added', type:'success'
    })
    //let lastPerson = people.length; 
    const [chosenPerson,setChosenPerson] = useState(0)
    const [isEditing,setIsEditing] = useState(false)
    // {lastPerson.map( last => {
    //     
    // })}
    //console.log("people " + people)
    //console.log(people.length);
    useEffect(() => {
        const fetchPeople = async () => {
          const res = await fetch('https://dalelanto-people.herokuapp.com/people')
          const data = await res.json()
          setPeople(data)
          //console.log("data " + people)
        }
    
        fetchPeople()
      }, [])

    
    const showAlert = (show=false,type="",msg="")=>{
        setAlert({show:show,type,msg})
    }

    const openModal = () => {
        setIsModalOpen(true)
    }
    const closeModal = () => {
        setIsModalOpen(false)
    }
    return <AppContext.Provider 
        value={{
            isModalOpen,
            people,
            addEffect,
            alert,
            chosenPerson,
            isEditing,
            openModal,
            closeModal,
            setPeople,
            setAlert,
            showAlert,
            setChosenPerson,
            setIsEditing,
        }}
    >{children}</AppContext.Provider>
}
// custom hook
export const useGlobalContext = () => {
    return useContext(AppContext)
}
export {AppContext, AppProvider}