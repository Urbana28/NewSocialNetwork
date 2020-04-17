import React from 'react';
import {useForm} from "react-hook-form";
import {updateProfileInfo} from "../../store/reducers/profileReducers";
import {IProfile} from "../../types/profileTypes";
import {useDispatch} from "react-redux";
import '../../styles/profile.scss';


interface IProps {
    setEditMode: (value: boolean) => void,
    profile: IProfile
}

const EditUserInfo: React.FC<IProps> = ({setEditMode, profile}) => {
    const {handleSubmit, register, errors} = useForm();
    let dispatch = useDispatch();
    const onSubmit = (data: any) => {
        console.log(data)
        dispatch(updateProfileInfo(data))
        setEditMode(false)
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='editForm'>
                <div className='editForm__field'>
                    Имя Фамилия: <input name='fullName' ref={register} type="text" />
                </div>
                <div className='editForm__field'>
                    О себе: <input name='aboutMe' type="text" ref={register({
                    required: true
                })}/>
                </div>
                <div className='editForm__field'>
                    Ищу работу: <input name='lookingForAJob' type="text" ref={register({
                    required: true
                })}/>
                </div>
                <div className='editForm__field'>
                    Желаемая должность: <input name='lookingForAJobDescription' type="text" ref={register({
                    required: true
                })}/>
                </div>
                <div className='editForm__contacts'>
                    Contacts {Object.keys(profile.contacts).map(key => {
                    return <div key={key} className='editForm__contacts--contact'>
                        {key}: <input name={'contacts.' + key} type="text" ref={register({

                    })}/>
                    </div>
                })}
                </div>
                <button type='submit'>Save</button>
                <button onClick={() => setEditMode(false)}>Cancel</button>
            </div>
        </form>
    )
}

export default EditUserInfo;