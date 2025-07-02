import React, { useState } from 'react';
import AdminHeader from '../../../../components/admin/AdminHeader';
import ModalCharacter from './ModalCharacter';
import TableCharacter from './TableCharacter';
import { addDocument, updateDocument } from '../../../../services/firebaseResponse';
import LOGO from "../../../../assets/logo.png";


const inner = {name: "", description: "", imgUrl: LOGO , oldImgUrl: ""}
function Character() {
    const [character, setCharacter] = useState(inner);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(inner);
    const [search, setSearch] = useState("")
    const handleOpen = () => {
        setOpen(true);
        setCharacter(inner);
        setError(inner);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleSave = async () => {
        if(!validationForm()){
            return;
        }
        if(character.id){           
            await updateDocument("Characters", character);
        }else{
            await addDocument("Characters", character);
        }
        handleClose();
    };
    const validationForm = () => {
        const newError = {};    
        newError.name = character.name ? "" : "Enter character name";
        newError.description = character.description ? "" : "Enter description";
        setError(newError);
        return Object.values(newError).every((e) => e === "");
    };
    const handleSearch = (e) => {
        setSearch(e.target.value);
    }
    return (
        <div>
            <AdminHeader handleOpen={handleOpen} title="List Character" name="Add Character" handleSearch={handleSearch} />
            <ModalCharacter open={open} setOpen={setOpen} error={error} handleOpen={handleOpen} handleClose={handleClose} character={character} setCharacter={setCharacter} handleSave={handleSave} />
            <TableCharacter handleOpen={handleOpen} setCharacter={setCharacter} character={character} search={search}  />
        </div>
    );
}

export default Character;