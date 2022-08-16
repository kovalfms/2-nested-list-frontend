import React, {useContext} from 'react';
import {CustomContext} from "../Context";

const NotesListItem = () => {
    const {auth} = useContext(CustomContext)
    return (
        <div>
            {auth?.user?.notesList.map(item => <h2 key={item.id}>{item.text}</h2>)}
        </div>
    );
};

export default NotesListItem;