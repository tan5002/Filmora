import React, { useState } from 'react';
import AdminHeader from "../../../../components/admin/AdminHeader"
import ModalPlans from './ModalPlans'
import { addDocument, updateDocument } from '../../../../services/firebaseResponse';
import TablePlans from './TablePlans';

const inner  = {level: "", priceMonth: "", title: "" }
function Plans() {
    const [open, setOpen] = useState(false);
    const [plan, setPlan] = useState(inner)
    const [error, setError] = useState(inner)
    const handleOpen = () => {
        setOpen(true)
        setPlan(inner)
        setError(inner)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const handleSave  = async () => {
        if(!validationForm()){
            return
        };
        if(plan.id){
            await updateDocument("Plans", plan)
        }else{
            await addDocument("Plans", plan)
        }
        handleClose();
    }
    const validationForm = () => {
        const newError = {};
        newError.level = plan.level ? "" : "Enter level";
        newError.priceMonth = plan.priceMonth ? "": "Enter price month";
        newError.title = plan.title ? "" : "Enter title";
        setError(newError)
        return Object.values(newError).every((e) => e === "")
    }
    return (
        <div>
            <AdminHeader title={"List Plans"} name={"Add Plan"} handleOpen={handleOpen}/>
            <ModalPlans open={open} handleClose={handleClose} plan={plan} setPlan={setPlan} error={error} handleSave={handleSave} />
            <TablePlans handleOpen={handleOpen} setPlan={setPlan} plan={plan}/>
        </div>
    );
}

export default Plans;