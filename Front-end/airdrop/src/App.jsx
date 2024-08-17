import React, { useState,useEffect } from 'react';
import './App.css';
import Home from './components/home/home';
import { TelegramContext } from './utils/store';



export default function App(){
  const TelegramWebApp = window?.Telegram?.WebApp;
    const [start,setStart] = useState(false)
    const [user, setUser] = useState({});
    useEffect(() => {
      if (TelegramWebApp?.initData) {
        const user = TelegramWebApp?.initDataUnsafe?.user;
         console.log("user=",user);
        if (user) {
          setUser(user); // Get the user ID
        }
      }
  

      TelegramWebApp.expand();
    }, []);
     setTimeout(()=>{
       setStart(true);
     },4000)
         
  return (
     <>
       { !start ? <div className='w-full h-screen bg-slate-900 flex justify-center items-center '><div className="  ">
        <div><img  src="/sticker.png" alt="logo" className='w-36 h-36  ' /></div>
       
 
        <div className="w-full h-44 text-slate-50 "> </div>   
    </div>
        </div>:
           
        <div className="home  bg-slate-900 w-full h-screen ">
            <div className="container bg-slate-900 w-full h-full">
              <TelegramContext.Provider value={{user:user}}>
              <Home/>




              </TelegramContext.Provider>
           
                
              
              
              </div>
        </div>
       }

         {/* <div className='w-full h-screen flex justify-center align-middle'>

         </div> */}
    
     
     </>
  )
}