import React, { useEffect } from 'react'

export default function Timer({dispatch,secondRemaining}) {

    const mins = Math.floor(secondRemaining / 60);
    const seconds = secondRemaining % 60;

// if we use the useEffect without a return cleanup function
// then we'll observe that each time the secondRemaining
// will decrease faster than before. This happens 
// becouse the setInterval is not destroyed when the componet unmounts

    /*

    // the wrong way to do this :

    useEffect(function (){
        setInterval( function() {
            dispatch({type: 'tick'})
        },1000)
    },[dispatch]);

    */

    useEffect(function (){
     const id = setInterval( function() {
            dispatch({type: 'tick'})
        },1000);
    
     return function cleanUp() {
        clearInterval(id); // clean up the interval when the component unmounts
     };

    },[dispatch]);

  return (
    <div className='timer'>{mins < 10 && 0}{mins}:{seconds<10 && 0}{seconds}</div>
  )
}
