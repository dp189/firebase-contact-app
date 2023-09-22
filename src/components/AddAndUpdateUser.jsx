import { Field, Form, Formik } from "formik";
import Modal from "./modal/Modal";
import { addDoc, collection } from "firebase/firestore";
import {db} from "../config/firebase"
import useOpen from "../hooks/useOpen";

const AddAndUpdateUser = ({ isOpen, onClose }) => {
    
    const addContact = async (contact) => {
        try {
            const contactRef = collection(db, "contacts");
            await addDoc(contactRef,contact);
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Formik
      initialValues={{
        name: "",
        email: ""
      }}
      onSubmit={(values) => {
        console.log(values);
        addContact(values);
        onClose();
      }}>
        <Form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-bold">Name</label>
            <Field id="name" name="name" placeholder="Enter Name..." className="border h-10 p-2"/>
          </div>
          <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-bold">Email</label>
          <Field id="email" name="email" placeholder="Enter Email..." className="border h-10 p-2"/>
          </div>
          <button type="submit" className="bg-orange px-2 py-4 self-end border rounded-md font-bold">
            Submit
          </button>
        </Form>
      </Formik>
    </Modal>
  );
};

export default AddAndUpdateUser;
