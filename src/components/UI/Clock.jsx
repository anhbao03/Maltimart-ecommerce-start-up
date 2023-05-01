import React, {useState, useEffect} from 'react'

const Clock = () => {
    const [days, setDays] = useState();
    const [hours, setHours] = useState();
    const [minutes, setMinutes] = useState();
    const [seconds, setSeconds] = useState();

    let Interval;
    const countdown = () => {
        const destination = new Date('Dec 24, 2022').getTime()

        Interval = setInterval(() => {
           const now = new Date().getTime()
           const differnt = destination - now
           const days = Math.floor(differnt / (1000 * 60 * 60 * 24))
           const hours = Math.floor( differnt % ( 1000 * 60 * 60 * 24)/(1000 * 60 * 60) ) 
           const minutes = Math.floor( differnt % (1000 * 60 * 60 )/(1000 * 60) ) 
           const seconds = Math.floor( differnt % (1000 * 60)/1000 )  

           if (destination < 0) {
            clearInterval(Interval.current)
           } else {
                setDays(days)
                setHours(hours)
                setMinutes(minutes)
                setSeconds(seconds)
           }
        });
    }

    useEffect(() => {
        countdown();
    },);
    
  return (
    <div className="clock_wrapper d-flex align-items-center gap-5">
        <div className="clock_data d-flex align-items-center gap-3">
            <div>
                <h1 className='text-white fs-3'>{days}</h1>
                <h5 className='text-white fs-6'>Days</h5>
            </div>
            <span className='text-white fs-3'>:</span>
        </div>

        <div className="clock_data d-flex align-items-center gap-3">
            <div>
                <h1 className='text-white fs-3'>{hours}</h1>
                <h5 className='text-white fs-6'>Hours</h5>
            </div>
            <span className='text-white fs-3'>:</span>
        </div>

        <div className="clock_data d-flex align-items-center gap-3">
            <div>
                <h1 className='text-white fs-3'>{minutes}</h1>
                <h5 className='text-white fs-6'>Minutes</h5>
            </div>
            <span className='text-white fs-3'>:</span>
        </div>

        <div className="clock_data d-flex align-items-center gap-3">
            <div>
                <h1 className='text-white fs-3'>{seconds}</h1>
                <h5 className='text-white fs-6'>Seconds</h5>
            </div>

        </div>
    </div>
  )
}

export default Clock
