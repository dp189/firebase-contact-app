import { useEffect, useState } from 'react';

import './App.css';
import NavBar from './components/NavBar';
import {collection, getDocs, onSnapshot} from 'firebase/firestore';
import {db} from './config/firebase'
import SearchBar from './components/SearchBar';
import ContactCard from './components/ContactCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NoContactsFound from './components/NoContactsFound';




function App() {
  const [contacts, setContacts] = useState([]);
  // const [searchValue, setSearchValue] = useState("")
  

  useEffect(() => {
    
    const getContacts = async () => {
    try{   
    const contactsRef = collection(db, "contacts");
    onSnapshot(contactsRef, (snapshot) => {
      const contactsArray = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data()
        };
      });
      setContacts(contactsArray);
      console.log(contacts);
      return contactsArray;
    })
    
    
  }
  catch(error){
    console.log(error);
  }   
}

  getContacts();

}, [])
  
  const filteredContacts = (value) => {  
      const contactsRef = collection(db, "contacts");
      onSnapshot(contactsRef, (snapshot) => {
        const contactsArray = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data()
          };
        });
        const searchValue = value;

        const filteredArray = contactsArray.filter( contact => {
          return contact.name.toLowerCase().includes(searchValue.toLowerCase());
        })
        
        setContacts(filteredArray);
        return filteredArray;
      })
       
    }
      
  return (
    <>
      <div className="max-w-[400px] m-auto">
        <NavBar />
        <SearchBar  filteredContacts={filteredContacts}/>
        <div className="flex flex-col mt-4">
          {contacts.length <= 0 ? <NoContactsFound />:contacts.map((contact) =>{
             return <ContactCard key={contact.id} contact={contact}/>
            })
          }
          
        </div>
        <ToastContainer position="bottom-center" autoClose="2000"/>
      </div>
    </>
  )
}

export default App
