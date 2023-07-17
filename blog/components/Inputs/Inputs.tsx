import { Todo as TodoInterface } from '../../models/interfaces/Todo'; 
import React from 'react';

interface DefaultProps { 
    labelTitle: string
    placeholder: string, 
    value: string, 
    required: boolean, 
  }
  
  interface InputProps extends DefaultProps { 
    executeChange: (e: React.ChangeEvent<HTMLInputElement>) => void 
  }
  
  interface TextAreaProps extends DefaultProps { 
    executeChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  }
  
  const InputElement = ({ labelTitle, placeholder, required, value, executeChange }: InputProps) => { 
    return ( 
      <>
        <label className = "input_label">
          <span className='mx-4 text-base my-0.5 font-medium font-satoshi'> { labelTitle } </span>
          <input 
            type="text" 
            required = { required }
            placeholder = { placeholder }
            className='form_input'
            value = { value }
            onChange = { (e) => { executeChange(e)}}
          /> 
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

export { TextAreaInput, InputElement}