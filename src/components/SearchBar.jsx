import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { BsFillPlusCircleFill } from "react-icons/bs";

import Modal from "./modal/Modal";
import AddAndUpdateUser from "./AddAndUpdateUser";
import useOpen from "../hooks/useOpen";

const SearchBar = (props) => {
  const { isOpen, onOpen, onClose } = useOpen(); 

  return (
    <>
      <div className="flex relative items-center ">
        <BiSearch className="text-white text-xl ml-2 absolute" />
        <input
          type="text"
          placeholder="Search Contacts..."
          className="h-10 rounded-md border bg-transparent border-white flex-grow pl-8 text-white"
          onChange={e => {
            props.filteredContacts(e.target.value);}}
        />
        <BsFillPlusCircleFill
          onClick={onOpen}
          className="text-[40px] text-white ml-2 cursor-pointer"
        />
      </div>

      <AddAndUpdateUser isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default SearchBar;
