import React, { useState } from 'react';
import AdminHeader from '../../../components/admin/AdminHeader';
import ModalCategory from './ModalCategory';
import{ addDocument, updateDocument } from "../../../services/firebaseResponse"
import TableCategory from './TableCategory';
const inner = {name: "", description: ""} ;
function Categories() {
    const [category, setCategory] = useState(inner);
    const [error, setError] = useState(inner);
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const handleClose = () => {
        setOpen(false)
    }
    const handleOpen = () => {
        setOpen(true);
        setCategory(inner);
        setError(inner);
    }

    const handleSave = async  () => {
        if(!validationForm()){
            return ;
        }
        if(category.id) {
            await updateDocument("Categories", category);
        }else {
            await addDocument("Categories", category);
        }
       handleClose();
    }

    const validationForm = () => {
        const newError = {}
        newError.name = category.name ? "" : "Enter name category";
        newError.description = category.description ? "" : "Enter description";
        setError(newError);
        return Object.values(newError).every((e) => e === "")
    }
    const handleSearch = (e) => {
        setSearch(e.target.value);
    }
    return (
        <div>
            <AdminHeader handleOpen={handleOpen} title={"List Categories"} name={"Add Category"} handleSearch={handleSearch} />
            <ModalCategory error={error} open={open} handleClose={handleClose} category={category} handleSave={handleSave} setCategory={setCategory} />
            <TableCategory handleOpen={handleOpen} setCategory={setCategory} category={category} search={search} onSearch={handleSearch} />
        </div>
    );
}

export default Categories;