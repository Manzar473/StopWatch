import React,{useState,useEffect} from 'react'




function StopWatch() {
    const [miliSecond,setMiliSecond]=useState(0)
    const [seconds,setSeconds]=useState(0)
    const [minutes,setMinutes]=useState(0)
    const [TimeOn,setTimerOn]=useState(false)
    const [lap,setlap]=useState([])
 
    
  
    useEffect(()=>{
      console.log('useEffect')
      
        let timer=null;
        // console.log('timein',TimeOn)
         if(TimeOn)
        {
          
         timer=setInterval(() => {
         setMiliSecond(prev=>prev+1);
          }, 10);
        }
      
       return ()=>
        {
console.log('this is called or not')
          // console.log('called',timer)
          clearInterval(timer)
        }
      

    },[TimeOn])
    
      
      if(miliSecond===99)
       {
        setSeconds(prev=>prev+1)
        setMiliSecond(0)
       }
       if(seconds===59)
       {
        setMinutes(prev=>prev+1)
        setSeconds(0)
       }

   const resetFunction=()=>{
    setMiliSecond(0)
    setMinutes(0)
    setSeconds(0)
     setTimerOn(false)
   }
 
const LapFun=()=>{
  let lapMili;
  let lapsec;
  let lapMin;
 (miliSecond<10)?lapMili="0"+miliSecond:lapMili=miliSecond;
 (seconds<10)?lapsec="0"+seconds:lapsec=seconds;
 (minutes<10)?lapMin="0"+minutes:lapMin=minutes;
  let lapTime=(lap.length+1+") "+lapMin+":"+lapsec+":"+lapMili)
  setlap((oldlaps)=>{
    return [...oldlaps,lapTime]
  })
}
   

  


 return (
    <div className='MainContain'>
       <div className='stopWatchcontain'>
        <h1 className='timer'>{minutes<10? "0"+minutes:minutes}:{seconds<10? "0"+seconds:seconds}:{miliSecond<10?"0"+miliSecond:miliSecond}</h1>
      
        {!TimeOn?<div><button className='StartBtn btn' onClick={()=>{setTimerOn(true)}}>Start</button>{miliSecond||seconds||minutes!==0?<button  className='resetBtn btn' onClick={()=>{resetFunction()}}>Reset</button>:""}</div> :<div><button className='stopBtn btn' onClick={()=>{setTimerOn(false)}}>Stop</button>
        <button className='resetBtn btn' onClick={()=>{resetFunction()}}>Reset</button>
        <button className='lapBtn btn' onClick={()=>{LapFun()}}>Lap</button></div>}
        
        {lap.length!==0?<div className='lapsDivMain'><h3 className='LapListTitle'>Laps List</h3><button onClick={()=>setlap([])} className='btn btnclear'>Clear</button></div>:""}
         
         <div className={lap.length>=10?"outFlow":""}>
        {lap.map((item)=>{
          return <div className='Lap-time'>{item}</div>
        })}
        </div>
        
        </div>
    </div>
    
  )
}

export default StopWatch