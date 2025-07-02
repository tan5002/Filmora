import React, { useState } from 'react';
import AdminHeader from "../../../../components/admin/AdminHeader"
import ModalFeature from './ModalFeature';
import {updateDocument, addDocument} from "../../../../services/firebaseResponse"
import TableFeature from './TableFeature';

const inner = {text : "", planId: "", available: ""}
function Feature() {
    const [open, setOpen] = useState(false);
    const [feature, setFeature] = useState(inner) 
    const [error, setError] = useState(inner)
    const handleOpen = () => {
        setOpen(true)
        setError(inner)
        setFeature(inner)
    }
    const handleClose = () => {
        setOpen(false)
    
    }
    const handleSave = async () => {
        if(!validationForm){
            return
        }
        if(feature.id){
            await updateDocument("Features", feature)
        }else{
            await addDocument("Features", feature)
        }
        handleClose()
    }

    const validationForm = () => {
        const newError = {}
        newError.text = feature.text ? "": "Enter text";
        newError.planId = feature.planId ? "" : "Enter PLan";
        setError(newError);
        return Object.values(newError).every((e) => e === "")
    }
    return (
        <div>
            <AdminHeader title={"List Feature"} name={"Add Feature"} handleOpen={handleOpen}/>
            <ModalFeature open={open}  handleClose={handleClose} feature={feature} setFeature={setFeature} handleSave={handleSave}error={error} />
            <TableFeature feature={feature} setFeature={setFeature} />
        </div>
    );
}

export default Feature;