'use client'; 
import React from "react";

const GradesList = ({ gradesArray }: { gradesArray: string []}) => { 
  return ( 
    <>
          { gradesArray.map(st => { 
          console.log(st); 
          if(st === 'User') { 
            return ( 
              <article className='flex flex-row shadow-xl bg-gray-100 px-4 py-1'>
                  <div className='flex justify-center items-center mr-2'>
                      <div className = { `rounded-3xl bg-gray-400 w-2 h-2`}></div>
                  </div>
                  <p className='flex content-center justify-center'> { st } </p>
              </article>
            )
          }

          else if(st === 'Member') { 
            return ( 
              <article className='flex flex-row shadow-xl bg-gray-100 px-4 py-1'>
                  <div className='flex justify-center items-center mr-2'>
                      <div className = { `rounded-3xl bg-dark-purple w-2 h-2`}></div>
                  </div>
                  <p className='flex content-center justify-center'> { st } </p>
              </article>
            )
          }

          else if(st === 'Admin') { 
            return ( 
              <article className='flex flex-row shadow-xl bg-gray-100 px-4 py-1'>
                  <div className='flex justify-center items-center mr-2'>
                      <div className = { `rounded-3xl bg-light-green w-2 h-2`}></div>
                  </div>
                  <p className='flex content-center justify-center'> { st } </p>
              </article>
            )
          }

          else if(st === 'Owner') { 
            return ( 
              <article className='flex flex-row shadow-xl bg-gray-100 px-4 py-1'>
                  <div className='flex justify-center items-center mr-2'>
                      <div className = { `rounded-3xl bg-red-600 w-2 h-2`}></div>
                  </div>
                  <p className='flex content-center justify-center'> { st } </p>
              </article>
            )
          }
        }) } 
    </>
  )
}; 

export default GradesList;