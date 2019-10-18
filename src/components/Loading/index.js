import React from 'react';
import Spinkit from 'react-spinkit'
import './style.css'

 const Loading = () =>(
    <div className="loading">
        <div className='wrapper-loding'>
            <Spinkit  color="blue" />
        </div>
    </div>

 )
export default Loading;