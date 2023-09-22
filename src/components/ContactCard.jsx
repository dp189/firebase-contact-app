import React from 'react'
import {HiOutlineUserCircle} from 'react-icons/hi'
import {LuEdit} from 'react-icons/lu';
import {FaTrash} from 'react-icons/fa';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';


const ContactCard = (props) => {
  const deleteContacts = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id))
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <div>
            {props.contacts.map((contact) =>{
              return <div key={contact.id} className="bg-yellow flex items-center justify-between rounded-lg p-2 mt-2">

                <div className="flex gap-1">
                  <HiOutlineUserCircle className="text-5xl text-dark-yellow "/>
                    <div className="flex flex-col">
                      <h1 className="text-l font-bold ml-2">{contact.name}</h1>
                      <p className="ml-2">{contact.email}</p>
                    </div>
                </div>
                <div className="flex items-center text-2xl gap-2">
                  <LuEdit />
                  <FaTrash className="text-[#5f00d9]" onClick={() => {deleteContacts(contact.id)}}/>
                </div>
              </div>
            })}
    </div>
  )
}

export default ContactCard;