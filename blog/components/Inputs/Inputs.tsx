import { Todo as TodoInterface } from '../../models/interfaces/Todo'; 
import { MdOutlineDownloadDone } from 'react-icons/md'; 
import React from 'react';

interface DefaultProps { 
    labelTitle: string
    placeholder: string, 
    value: string, 
    required: boolean, 
  }
  
  interface InputProps extends DefaultProps { 
    executeChange: (e: React.ChangeEvent<HTMLInputElement>) => void 
    executeFunction?: () => void 
  }

  interface EditProps extends DefaultProps { 
    executeChange: (e: React.ChangeEvent<HTMLInputElement>) => void 
    executeEdit: () => void
  }
  
  interface TextAreaProps extends DefaultProps { 
    executeChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  }
  
  const InputElement = ({ labelTitle, placeholder, required, value, executeChange, executeFunction }: InputProps) => { 
    return ( 
      <>
        <label className = "input_label">
          <span className='mx-4 text-base my-0.5 font-medium font-satoshi'> { labelTitle } </span>

          { (executeFunction != undefined || executeFunction != null) && 
            <div className = 'flex mr-6'>
              <input 
                type="text" 
                required = { required }
                placeholder = { placeholder }
                className='form_input w-full'
                value = { value }
                onChange = { (e) => { executeChange(e)}}
              /> 
              <button type = 'button'
                className = 'rounded-full bg-slate-300 px-3 hover:bg-slate-400 hover:scale-150 text-sm flex justify-center items-center transition-all duration-300'
                onClick = { executeFunction }> + </button>
            </div>
          }

          { (executeFunction == undefined || executeFunction == null) && 
              <input 
              type="text" 
              required = { required }
              placeholder = { placeholder }
              className='form_input'
              value = { value }
              onChange = { (e) => { executeChange(e)}}
            /> 
          }
        </label>
      </>
    )
  }
  
  const TextAreaInput =({labelTitle, placeholder, required, value, executeChange }: TextAreaProps) => { 
    return ( 
      <>
        <label className = 'input_label'>
          <span className='mx-4 text-base my-0.5 font-medium font-satoshi'> { labelTitle }: </span>
          <textarea 
              required = { required }
              value = { value }
              placeholder =  { placeholder }
              className='form_input h-40'
              onChange = { (e) => executeChange(e) }  
            />
        </label>
      </>
    )
}

const EditInputElement = ({ labelTitle, placeholder, required, value, executeChange, executeEdit }: EditProps) => { 
  return ( 
    <div  >
      <label className = "input_label">
        <span className='mx-4 text-base my-0.5 font-medium font-satoshi'> { labelTitle } </span>
        <div className = 'flex mr-2'>
          <input 
            type="text" 
            required = { required }
            placeholder = { placeholder }
            className='form_input w-full'
            value = { value }
            onChange = { (e) => { executeChange(e)}}
          /> 
          <div className = 'bg-green-200 flex w-fit p-1 m-1 rounded-full hover:bg-green-300 cursor-pointer hover:scale-150 transition-all duration-300'>
            <MdOutlineDownloadDone onClick = { executeEdit } width = { 24 } height = { 24 }  /> 
          </div>
        </div>
      </label>
    </div>
  )
}

export { TextAreaInput, InputElement, EditInputElement}