import React from 'react'
import { useState } from 'react'
import Modal from './Modal.js'
import {useGlobalContext} from './context'
import { AiFillEdit,AiFillDelete} from "react-icons/ai"
import { GiSave } from "react-icons/gi"
import DatePicker from "react-datepicker";
import * as moment from 'moment'

const Person = ({people,chosenPerson}) => {
    let {setChosenPerson} = useGlobalContext();
    let index = chosenPerson
    const {openModal} = useGlobalContext()
    const {setPeople} = useGlobalContext()
    const {showAlert} = useGlobalContext()
    const [editID,setEditID] = useState()
    const [editnickname,setEditNickname] = useState('')
    const [editfirstname,setEditFirstname] = useState('')
    const [editlastname,setEditLastname] = useState('')
    const [editbirthDate, setEditBirthDate] = useState(new Date())
    const [editstatus, setEditStatus] = useState('single')
    const [editcountry,setEditCountry] = useState('')
    const [editimgLink,setEditImgLink] = useState('')
    let {isEditing,setIsEditing} = useGlobalContext()
    // useEffect(() => {
    //     const timeout = setTimeout(()=>{
    //         setChosenPerson(index)
    //       },1000)
    //       return () => clearTimeout(timeout)
    //   }, [index])
    
    const editPerson = (_id) => {
        const specificItem = people.find((item)=> item._id === _id)
        // const specificItem2 = people.find((item)=> {
        //     console.log(" editing " + _id + " item id: " + item._id)
        // } )
        
        let birthdayNew = new Date()
        setIsEditing(!isEditing)
        setEditID(_id)
        setEditNickname(specificItem.nickname)
        setEditFirstname(specificItem.firstname)
        setEditLastname(specificItem.lastname)
        //console.log( "birth + " + moment(specificItem.birthday).format('MM/DD/YYYY'))
        //console.log( "editbirth + " + editbirthDate)
        birthdayNew = new Date(specificItem.birthday)
        //console.log( "editbirth + " + birthdayNew)
        setEditBirthDate(birthdayNew)
        //console.log( "birth + " + moment(specificItem.birthday).format('MM/DD/YYYY'))
        setEditImgLink(specificItem.img)
        setEditStatus(specificItem.status)
        setEditCountry(specificItem.country)
      }

    // Fetch People for edit
    const fetchPeople = async (_id) => {
        const res = await fetch(`https://dalelanto-people.herokuapp.com/people/${_id}`)
        const data = await res.json()
        //console.log(data)
        return data
    }
    // edit Person
    const editPersonServer = async (_id) => {
        const personToChange = await fetchPeople(_id)
        const updPerson = { ...personToChange,
                nickname:editnickname,
                firstname:editfirstname,
                lastname:editlastname,
                img:editimgLink,
                birthday:moment(editbirthDate).format('MM/DD/YYYY'),
                status:editstatus,
                country:editcountry
                //hobbies:hobbies
             }
        const res = await fetch(`https://dalelanto-people.herokuapp.com/people/${_id}`,{
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(updPerson)
        })

        //const data = await res.json()
        await res.json()
        
        setPeople(people.map((person)=>{
        if(person._id === editID){
            return {...person,
                nickname:editnickname,
                firstname:editfirstname,
                lastname:editlastname,
                img:editimgLink,
                birthday:moment(editbirthDate).format('MM/DD/YYYY'),
                status:editstatus,
                country:editcountry
                //hobbies:hobbies 
            }
        }
        return person
        }))
        //console.log('doubleClick',_id)
    }

    const editSubmit = (e) => {
        e.preventDefault()
        if(isEditing){
            //setPage('')
            editPersonServer(editID)
            setEditID(null);
            setIsEditing(false);
            showAlert(true,'success','Information Saved')
            console.log("editing saved")
        }else{
            console.log("no changes saved")
        }
        
    }
    const removePerson = async (_id) => {
        await fetch(`https://dalelanto-people.herokuapp.com/people/${_id}`,{
        method: 'DELETE',
        })
        showAlert(true,'danger','person removed')
        setPeople(people.filter((person)=> person._id !== _id ))
        // if(people.length >= 2){
        //     index= people.length - 2
        //     //console.log("remove Person " + index)
        //     setChosenPerson(index)
        // }    
        setChosenPerson(0)
    }

    return (
        
        <div>
            
            {people.filter(person => person._id === index).map((filteredperson)=>{
                const {_id,nickname,firstname,lastname,birthday,status,
                    country,img} = filteredperson
                return (
                    <div className="" key={_id}>
                        <form className="row" onSubmit={editSubmit}>
                            <div className="column">
                                {(img.includes('http://') || img.includes('https://')) && (img.includes('.jpg') || img.includes('.png')) 
                                ? <img src={img} title="click to zoom" alt={nickname} className="chosen-img" onClick={openModal}/>
                                : <img src="https://cdn.pixabay.com/photo/2016/11/14/17/39/person-1824147_960_720.png"
                                title="click to zoom" alt={nickname} className="chosen-img" onClick={openModal}/>
                                }
                                
                            </div>
                            <div className="column">
                                <div className="chosen-info">
                                    <div className={isEditing ? "chosen-date edit-up" : "chosen-data"}>
                                        <p className="chosen-name">Nickname: {isEditing 
                                            ? <input className="edit-input" type="text" value={editnickname} onChange={(e)=>setEditNickname(e.target.value)} size="10" required/>
                                            : nickname}
                                        </p>
                                        {isEditing 
                                        ? 
                                        <p className="chosen-name">
                                            <label className="edit-label"> First Name: </label>
                                            <input className="edit-input name" type="text" value={editfirstname} onChange={(e)=>setEditFirstname(e.target.value)} size="10" required/>
                                            <label className="edit-label"> Last Name: </label>
                                            <input className="edit-input name" type="text" value={editlastname} onChange={(e)=>setEditLastname(e.target.value)} size="10" required/>
                                            <label className="edit-label"> Image Link: </label>
                                            <input className="edit-input name" type="text" value={editimgLink} onChange={(e)=>setEditImgLink(e.target.value)} size="10" required/>
                                        </p>
                                        :
                                        <p className="chosen-name">Fullname: {firstname + " " + lastname}</p>
                                        }
                                        <div className="chosen-name">Birthday: {isEditing 
                                            ? <DatePicker className="edit-birthday birthday" selected={editbirthDate} onChange={date => setEditBirthDate(date)} />
                                            : birthday}
                                        </div>
                                        <p className="chosen-name">Status: {isEditing 
                                            ? <select className="edit-birthday status" value={editstatus} onChange={(e)=>setEditStatus(e.target.value)}>
                                                    <option value="single">Single</option>
                                                    <option value="married">Married</option>
                                                    <option value="widowed">Widowed</option>
                                                </select> 
                                            : status}
                                        </p>
                                        <p className="chosen-name">Country: {isEditing 
                                            ? <input className="edit-input country" type="text" value={editcountry} onChange={(e)=>setEditCountry(e.target.value)} size="10" required/>
                                            : country}
                                        </p>
                                        
                                        <Modal img={img} />
                                    </div>
                                    <div className="chosen-btn"> 
                                        {isEditing && <button className="save-btn" type="submit"><GiSave className="chosen-icon blue"/></button>}
                                        <AiFillEdit className={isEditing ? "chosen-icon red" : "chosen-icon blue" } onClick={()=>editPerson(_id)}/>
                                        <AiFillDelete className="chosen-icon" onClick={()=>removePerson(_id)}/>
                                        
                                    </div>
                                </div>
                            </div>
                        </form>  
                    </div>
                );
            })}
            
        </div>
    )
}

export default Person
