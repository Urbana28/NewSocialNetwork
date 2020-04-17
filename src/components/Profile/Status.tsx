import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {setStatus, updateStatus} from "../../store/reducers/profileReducers";


interface IProps {
    status: string,
    isOwner: string
}

const Status:React.FC<IProps> = ({status, isOwner}) => {

    const [editMode, setEditMode] = useState(false)
    let dispatch = useDispatch();
    const [statusChanged, changeStatus] = useState(status)

    let onStatusUpdate = (value:string) => {
            changeStatus(value)
    };

    let resetStatus = () => {
        setEditMode(false);
        dispatch(updateStatus(statusChanged))
    };


    return (
        <div>

            {!editMode && <span onDoubleClick={() => setEditMode(true)}>{status ? status : 'изменить статус'}</span>}
            {editMode && <input type="text" value={statusChanged} autoFocus={true} onBlur={resetStatus}
                                onChange={(e) => {onStatusUpdate(e.currentTarget.value)}}/>}
        </div>
    )
}

export default Status;