import React from 'react'; 

interface ContentInterface { 
    likes: number, 
    comments: number, 
}

interface Props { 
    onCancel: () => void, 
    content: ContentInterface, 
    profileStatus: boolean, 
    hasExecute: boolean
    onExecute: () => void, 
}

const Alert = ({ onCancel, content, profileStatus, onExecute, hasExecute }: Props) => {
    return (
      <dialog open className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-20 py-2  
           font-satoshi font-normal bg-light-green rounded-xl'>
          { profileStatus && 
              <div>
                  <p className='text-center'>
                      <span>Likes Count: </span> { content.likes }
                  </p>
                  <p className='text-center'>
                      <span>Comments Count: </span> { content.comments }
                  </p>
              </div>
          }
  
          { !hasExecute && 
              <button 
                  type = 'button' 
                  onClick = { onCancel }
                  className='rounded-xl font-satoshi flex mx-auto my-2 bg-normal-green py-0.5 px-1 transition-all 
                      duration-300 hover:rounded-3xl hover:text-xl hover:font-bold hover:text-white'
              
              > Cancel </button>
          }
  
          {  hasExecute && 
              <article className='flex'>
                  <button 
                      type = 'button' 
                      onClick = { onCancel }
                      className='rounded-xl font-satoshi flex mx-auto my-2 bg-normal-green py-0.5 px-1 transition-all 
                          duration-300 hover:rounded-3xl hover:text-xl hover:font-bold hover:text-white'
                  
                  > Yes </button>
  
                  <button 
                      type = 'button' 
                      onClick = { onCancel }
                      className='rounded-xl font-satoshi flex mx-auto my-2 bg-light-purple py-0.5 px-1 transition-all 
                          duration-300 hover:rounded-3xl hover:text-xl hover:font-bold hover:text-white'
                  
                  > Cancel </button>
              </article>
          }
      </dialog>
    )
  }
export default Alert