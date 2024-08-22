import React, { useState,useEffect } from 'react';
import './App.css';
import Home from './components/home/home';
import { TelegramContext } from './utils/store';
import { SERVER_URL,BOT_USERNAME ,IMAGE_URL} from "./utils/constants"
import { getCurrentDate } from './utils/currentDate';



export default function App(){

  const TelegramWebApp = window?.Telegram?.WebApp;
    const [start,setStart] = useState(false)
    const [rndom,setRandom] = useState(1)
    const [user, setUser] = useState({});
    const [tguser, setTgUser] = useState({});
    const [status,setStatus]=useState()
    const [tg,setTg]= useState();

    const createRefLink = (id)=>{
      return  `https://t.me/${BOT_USERNAME}/start=${id}`;

    }
   const createUser =(user)=>{
    console.log("user come from tgapp ->",user);
    fetch(`${SERVER_URL}/api/v1/users/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'ngrok-skip-browser-warning': 'true'
      },
      body: JSON.stringify({
        telegramUsername: user?.username||"fer" ,
        tgId: user?.id||1456,
        referralLink: createRefLink(user.id),
        joiningDate: getCurrentDate(),
        numberOfReferrals: 0,
        bubblePoints: 1000
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log("Success:", data)
        setUser(data)
      })
      .catch(error => {console.error("Error:", error)
       
    });
    
   }
   const checkUserExist=(user)=>{
    fetch(`${SERVER_URL}/api/v1/users/get/${user.id||1456}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        'ngrok-skip-browser-warning': 'true'
      },
    })
      .then(res => res.json())
      .then(data => {console.log("Success:", data)
  
        setUser(data)
        console.log("user got it");

    })
      .catch(error => {console.error("Error:", error)
      console.log("No user exist");
      createUser(user)
  });
    
   }
   function getRandomOneOrTwo() {
     setRandom(Math.floor(Math.random() * 2) + 1);
}

    useEffect(() => {
      getRandomOneOrTwo();
      if (TelegramWebApp?.initData) {
        const user = TelegramWebApp?.initDataUnsafe?.user;
        console.log(user);
         setTg(TelegramWebApp?.initDataUnsafe?.start_param);
         setTgUser(user)
        if (user) {
         // Get the user ID
         
         checkUserExist(user)
           
        }
      }
      else {
        checkUserExist(user)
      }
     

      TelegramWebApp.expand();
    }, []);

     setTimeout(()=>{
       setStart(true);
     },8000)
         
  return (
     <>
       { !start ? <div className='w-full h-screen bg-slate-900 flex justify-center items-center '><div className="  ">
        <div>
          { rndom==1?
            <img  src={IMAGE_URL + "v1724328943/1000031391_1_2_utqnhj.png"}alt="logo" className='w-44 h-44  ' />
           :
           <img  src={IMAGE_URL + "v1724330153/1000031460-removebg-preview_ykootj.png"}alt="logo" className='w-44 h-44  ' />
          }
          </div> 
       

        <div className="w-full h-44 text-slate-50 "> {tg}</div>   
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