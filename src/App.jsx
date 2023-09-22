import { useEffect, useState } from 'react';

import './App.css';
import NavBar from './components/NavBar';
import {collection, getDocs} from 'firebase/firestore';
import {db} from './config/firebase'
import SearchBar from './components/SearchBar';
import ContactCard from './components/ContactCard';
import useOpen from './hooks/useOpen';
import AddAndUpdateUser from './components/AddAndUpdateUser';




function App() {
  const [contacts, setContacts] = useState([]);
  const contactsRef = collection(db, "contacts");
  

  useEffect(() => {
    
    const getContacts = async () => {
    try{   
    const contactsCollection = await getDocs(contactsRef);
    const contactsArray = contactsCollection.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data()
      };
    });
    setContacts(contactsArray);
    console.log(contacts);
    
  }
  catch(error){
    console.log(error);
  }   
}

  getContacts();

}, [])
  

  return (
    <>
      <div className="max-w-[400px] m-auto">
        <NavBar />
        <SearchBar />

        <div className="flex flex-col mt-4">
          <ContactCard contacts={contacts}/>
        </div>
      </div>
    </>
  )
}

export default App
