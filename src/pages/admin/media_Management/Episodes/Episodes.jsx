import React, { useState } from 'react';
import AdminHeader from "../../../../components/admin/AdminHeader"
import ModalEpisode from './ModalEpisode';
import { addDocument, updateDocument } from '../../../../services/firebaseResponse';
import TableEpisodes from "./TableEpisode"
const inner = {episodeNumber: "", episodeUrl: "", idMovie: ""}
function Episodes() {
    const [open, setOpen] = useState(false);
    const [episode, setEpisode] = useState(inner)
    const [error, setError] = useState(inner)
    const [search, setSearch] = useState("")
    const handleOpen = () => {
        setOpen(true);
        setEpisode(inner);
        setError(inner);
    }
    const handleClose = () => {
        setOpen(false)
    }
    const handleSave = async () => {
        if(!validationForm()){
            console.log("Looigs");
            return
        }
        
        if(episode.id){
            await updateDocument("Episodes", episode)
        }else{
            await addDocument("Episodes", episode)
        }
        handleClose()
    }
    const validationForm = () => {
        const newError = {}
        newError.episodeNumber = episode.episodeNumber ? "" : "Enter episodes number";
        newError.episodeUrl = episode.episodeUrl ? "" : "Enter episodes URL";
        newError.idMovie = episode.idMovie ? "" : "Enter id Movie";
        setError(newError);
        return Object.values(newError).every((e) => e === "");
    }
    const handleSearch = (e) => {
        setSearch(e.target.value)
    }
    return (
        <div>
             <AdminHeader title={" List Episodes"} name={"Add Episodes"} handleOpen={handleOpen} handleSearch={handleSearch}/>
             <ModalEpisode open={open} episode={episode} setEpisode={setEpisode} handleClose={handleClose} handleSave={handleSave} error={error} />
            <TableEpisodes handleOpen={handleOpen} setEpisodes={setEpisode} episodes={episode} search={search} />
        </div>
    );
}

export default Episodes;