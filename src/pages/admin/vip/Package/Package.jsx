import React, { useState } from 'react';
import AdminHeader from "../../../../components/admin/AdminHeader"
import ModalPackage from './ModalPackage';
import TablePackage from './TablePackage';
import { addDocument, updateDocument } from '../../../../services/firebaseResponse';

const inner = {time : "", discount : "", planId: ""}

function Package() {
    const [open, setOpen] = useState(false);
    const [isPackage, setIsPackage] = useState(inner);
    const [error, setError] = useState(inner)
    const handleOpen  = () => {
        setOpen(true)
        setIsPackage(inner)
        setError(inner)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const validationForm = () => {
        const newError = {};
        newError.time = isPackage.time ? "" : "Enter time";
        newError.planId = isPackage.planId ? "" : "Select  a plan "
        setError(newError)
        return Object.values(newError).every((e) => e === "");
    }
    const handleSave = async () => {
        if(!validationForm()){
            return
        }
        if(isPackage.id){
            await updateDocument("Packages", isPackage);
        }else{
            await addDocument("Packages", isPackage)
        }
        handleClose();

    }
    return (
        <div>
            <AdminHeader title={"List Package"} name={"Add Package"} handleOpen={handleOpen}/>
            <ModalPackage open={open} handleClose={handleClose} isPackage={isPackage} setIsPackage={setIsPackage} handleSave={handleSave} error={error} />
            <TablePackage handleOpen={handleOpen} setIsPackage={setIsPackage} isPackage={isPackage}  />
        </div>
    );
}

export default Package;