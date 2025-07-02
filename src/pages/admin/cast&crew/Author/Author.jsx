import React, { useState } from 'react';
import AdminHeader from '../../../../components/admin/AdminHeader';
import ModalAuthor from './ModalAuthor';
import { addDocument, updateDocument } from '../../../../services/firebaseResponse';
import TableAuthor from './TableAuthor';
const inner  = {name: "", description: ""}
function Author() {
    const [author, setAuthor] = useState(inner)
    const [open, setOpen] = useState(false)
    const [error, setError] = useState(inner)
    const [search, setSearch] = useState("");
    const handleOpen = () => {
        setOpen(true)
        setAuthor(inner)
        setError(inner)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const handleSave = async () => {
        if (!validationForm()) {
            console.log("hello");
            
            return;
        }
        if(author.id){
            console.log(author);
            
            await updateDocument("Author", author);
        }else{
            await addDocument("Author", author);

        }
        handleClose();
    };

    const validationForm = () => {
        const newError = {};
        newError.name = author.name ? "" : "Enter author name";
        newError.description = author.description ? "" : "Enter description";
        setError(newError);
        return Object.values(newError).every((e) => e === "");
    };
    const handleSearch = (e) => {
        setSearch(e.target.value);
    }
    return (
        <div>
            <AdminHeader handleOpen={handleOpen} title={"List Author"} name={"Add Author"} handleSearch={handleSearch}  />
            <ModalAuthor author={author} handleSave={handleSave} setAuthor={setAuthor} open={open} setOpen={setOpen} handleClose={handleClose} error={error}/>
            <TableAuthor handleOpen={handleOpen} setAuthor={setAuthor} author={author} search={search} />
        </div>
    );
}

export default Author;