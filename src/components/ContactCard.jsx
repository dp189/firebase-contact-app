import React from 'react'
import {HiOutlineUserCircle} from 'react-icons/hi'
import {LuEdit} from 'react-icons/lu';
import {FaTrash} from 'react-icons/fa';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import useOpen from '../hooks/useOpen';
import AddAndUpdateUser from './AddAndUpdateUser';
import { toast } from 'react-toastify';


const ContactCard = (props) => {

  const {isOpen,onOpen,onClose} = useOpen()
  const deleteContacts = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id))
      toast.success("Contact Deleted Successfully✌🏻")
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <div>
            
               <div key={props.contact.id} className="bg-yellow flex items-center justify-between rounded-lg p-2 mt-2">

                <div className="flex gap-1">
                  <HiOutlineUserCircle className="text-5xl text-dark-yellow "/>
                    <div className="flex flex-col">
                      <h1 className="text-l font-bold ml-2">{props.contact.name}</h1>
                      <p className="ml-2">{props.contact.email}</p>
                    </div>
                </div>
                <div className="flex items-center text-2xl gap-2">
                  <LuEdit className="cursor-pointer" onClick={onOpen}/>
                  <FaTrash className="text-[#5f00d9] cursor-pointer" onClick={() => {deleteContacts(props.contact.id)}}/>
                </div>
              </div>
            <AddAndUpdateUser contact={props.contact} isUpdate isOpen={isOpen} onClose={onClose}/>
    </div>
  )
}

export default ContactCard;