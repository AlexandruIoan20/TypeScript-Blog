'use client'; 

import { useState, useEffect } from 'react'; 
import { FaComment } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import { IconContext } from "react-icons";


const CustomComment = ({ color }: { color: string }) => { 
  return ( 
      <IconContext.Provider value = {{ size: '20', color: `${color}`}}>
          <FaComment /> 
      </IconContext.Provider>
  )
};


const CustomLike = ({ color }: { color: string }) => { 
  return ( 
      <IconContext.Provider value = {{ size: '20', color: `${color}`}}>
          <AiFillHeart /> 
      </IconContext.Provider>
  )
}; 


export function CommentButton({ executeFunction }: { executeFunction: () => void }) {
  const [ clicked, setClicked ] = useState(false); 
  
  useEffect( () => { 
      setTimeout(function () { setClicked(false)}, 300); 
  }, [clicked]); 

  return (
      <button
          onClick  = { () => { executeFunction(); setClicked(true) }}
      >
          <CustomComment  color = { clicked ? '#421869' : '#BF99F2'  }/> 
      </button>
  );
}; 

export function LikeButton ({ executeFunction, liked }: { executeFunction: () => void, liked?: boolean }) { 
  const [clicked, setClicked] = useState(liked);
  return ( 
      <button
      onClick  = { () => { executeFunction(); setClicked((cl) => !cl) }}
      >
          <CustomLike color = { clicked ? '#421869' : '#BF99F2'  }/> 
      </button>
  )
}