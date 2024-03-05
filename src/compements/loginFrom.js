import { useEffect } from 'react';
import '../CSS/login.css'
import{useNavigate} from "react-router-dom"

const LoginF=()=>{
    const gameNav =useNavigate();
    function starting(){
        gameNav("/games");
    }
    useEffect(()=>{
        document.title="欢迎"
    },[])
    return (
            <div className="thewideBox">
                <meta title='start'/>
                <div className="loginBox">
                    <button  onClick={starting} className='start'>click</button>
                </div>
            </div>      
    )
};
export default LoginF;
