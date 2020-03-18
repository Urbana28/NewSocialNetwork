import React from 'react' ;
import preloader from '../../img/preload.gif';
import '../../styles/friends.scss'

let Preloader = () => {
    return (
        <div className='preloaderContainer'>
            <div className='preloaderContainer__loader'>
                <img src={preloader} alt=""/>
            </div></div>
    )
}

export default Preloader;