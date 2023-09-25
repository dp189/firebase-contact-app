import { Field, Form, Formik } from "formik";
import Modal from "./modal/Modal";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import * as Yup from "yup";

const FormSchema = Yup.object().shape({
  name: Yup.string().required("Name is required."),
  email: Yup.string().email("Invalid Email").required("Email is required."),
});

const AddAndUpdateUser = ({ isOpen, onClose, isUpdate, contact }) => {
  const addContact = async (contact) => {
    try {
      const contactRef = collection(db, "contacts");
      await addDoc(contactRef, contact);
      toast.success("Contact Added Successfully✌🏻");
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async (contact, id) => {
    try {
      const contactRef = doc(db, "contacts", id);
      await updateDoc(contactRef, contact);
      toast.success("Contact Updated Successfully✌🏻");
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Formik
        initialValues={
          isUpdate
            ? {
                name: contact.name,
                email: contact.email,
              }
            : {
                name: "",
                email: "",
              }
        }
        validationSchema={FormSchema}
        onSubmit={(values) => {
          console.log(values);
          isUpdate ? updateUser(values, contact.id) : addContact(values);
        }}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-bold">
                Name
              </label>
              <Field
                id="name"
                name="name"
                placeholder="Enter Name..."
                className="border h-10 p-2"
              />
              {errors.name && touched.name ? (
                <div className="text-red-700 text-lg">{errors.name}</div>
              ) : null}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-bold">
                Email
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="Enter Email..."
                className="border h-10 p-2"
              />
              {errors.email && touched.email ? (
                <div className="text-red-700 text-lg">{errors.email}</div>
              ) : null}
            </div>
            <button
              type="submit"
              className="bg-orange px-2 py-4 self-end border rounded-md font-bold"
            >
              {isUpdate ? "Update" : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddAndUpdateUser;
