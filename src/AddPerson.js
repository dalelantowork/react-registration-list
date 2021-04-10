import { useState, useEffect } from 'react'
import React from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as moment from 'moment'
import {AppContext, useGlobalContext} from './context'
import Alert from './Alert'

const AddPerson = () => {
    const [nickname,setNickname] = useState('')
    const [firstname,setFirstname] = useState('')
    const [lastname,setLastname] = useState('')
    const [birthDate, setBirthDate] = useState(new Date())
    const [status, setStatus] = useState('single')
    const [country,setCountry] = useState('')
    const [hobbies,setHobbies] = useState([])
    const [imgLink,setImgLink] = useState('')
    const {people,setPeople,lastPerson} = useGlobalContext()
    const {alert,setAlert,showAlert} = useGlobalContext()
    // const convertDate = (date) => {
    //     //setBirthDate(moment(date).format('MMMM Do YYYY'))
    //     console.log(birthDate)
    // }

    // Add person submit
    const addPersonSubmit = async (newItem) => {
        const res = await fetch(`http://localhost:5000/people`,
        {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'

        },
        body: JSON.stringify(newItem)
        })

        const data = await res.json()
        console.log(newItem)
        setPeople([...people, data])
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!nickname){
            console.log("empty submitted")
        }else{
            const newItem = {
                id: lastPerson,
                nickname:nickname,
                firstname:firstname,
                lastname:lastname,
                img:imgLink,
                birthday:moment(birthDate).format('MM/DD/YYYY'),
                status:status,
                country:country,
                hobbies:hobbies,
            }
            addPersonSubmit(newItem);
            setNickname('')
            setFirstname('')
            setLastname('')
            setImgLink('')
            setStatus('single')
            setCountry('')
            setHobbies([])
            showAlert(true,'success', 'Added Successfully')
            //console.log(newItem)
        }
        
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <header className="add-header">
                    Fill up the form to Register
                </header>
                <div className="add-info">
                    <div className="add-row">
                        <label className="add-label"> Nickname : </label>
                        <input className="add-input" type="text" value={nickname} onChange={(e)=>setNickname(e.target.value)} size="30" required/>
                    </div>
                    <div className="add-row">
                        <label className="add-label"> First Name: </label>
                        <input className="add-input" type="text" value={firstname} onChange={(e)=>setFirstname(e.target.value)} size="30" required/>
                    </div>
                    <div className="add-row">
                        <label className="add-label"> Last Name: </label>
                        <input className="add-input" type="text" value={lastname} onChange={(e)=>setLastname(e.target.value)} size="30" required/>
                    </div>
                    <div className="add-row">
                        <label className="add-label"> Image Link: </label>
                        <input className="add-input" type="text" value={imgLink} onChange={(e)=>setImgLink(e.target.value)} size="30" required/>
                    </div>
                    <div className="add-row">
                        <label className="add-label"> Birthday: </label>
                        <DatePicker className="add-birthday" selected={birthDate} onChange={date => setBirthDate(date)} />
                    </div>
                    <div className="add-row">
                    <label className="add-label"> Status: </label>
                        <select className="add-birthday" value={status} onChange={(e)=>setStatus(e.target.value)}>
                            <option value="single">Single</option>
                            <option value="married">Married</option>
                            <option value="widowed">Widowed</option>
                        </select>
                    </div>
                    <div className="add-row">
                        <label className="add-label"> Country: </label>
                        <input className="add-input" type="text" value={country} onChange={(e)=>setCountry(e.target.value)} size="30" required/>
                    </div>
                    <div className="add-row">
                        <label className="add-label"> Hobbies: </label>
                        <input className="add-input" type="text" value={hobbies} onChange={(e)=>setHobbies(e.target.value)} size="30"/>
                    </div>
                </div>
                <div className="add-submit-btn">
                    <button type="submit" className="add-submit" onClick={()=>console.log("submit clicked")}>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default AddPerson
