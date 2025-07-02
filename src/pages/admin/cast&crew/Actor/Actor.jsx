import React, { useState } from 'react';
import AdminHeader from '../../../../components/admin/AdminHeader';
import ModalActor from './ModalActor';
import TableActor from './TableActor';
import { addDocument, updateDocument } from '../../../../services/firebaseResponse';
import LOGO from "../../../../assets/logo.png";

const inner = {name: "", description: "", imgUrl: LOGO , oldImgUrl: ""}

function Actor() {
    const [actor, setActor] = useState(inner);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(inner)
    const [search, setSearch] = useState("");
    const handleSearch = (e) => {
        setSearch(e.target.value);
    }
    const handleOpen = () => {
        setOpen(true);
        setActor(inner);
    };

    const handleClose = () => setOpen(false);

    const handleSave = async () => {
        if(!validationForm()){
            return;
        }
        if(actor.id){
            await updateDocument("Actors", actor);
        }else{
            await addDocument("Actors", actor);
        }
        handleClose();
    };
    const validationForm = () => {
        const newError = {};
        newError.name = actor.name ? "" : "Enter actor name";
        newError.description = actor.description ? "" : "Enter description";
        setError(newError);
        return Object.values(newError).every((e) => e === "");
    };
    return (
        <div>
            <AdminHeader handleOpen={handleOpen} title="List Actor" name="Add Actor" handleSearch={handleSearch} />
            <ModalActor  open={open} setOpen={setOpen} error={error} handleOpen={handleOpen} handleClose={handleClose} actor={actor} setActor={setActor} handleSave={handleSave}  />
            <TableActor handleOpen={handleOpen} setActor={setActor} actor={actor} search={search} />
        </div>
    );
}

export default Actor;