'use client'

import React, { useState, useEffect } from 'react'; 
import {  Todo as  TodoInterface } from '../../models/interfaces/Todo'; 
import { InputElement } from '../Inputs/Inputs';
import { BsPencil } from 'react-icons/bs'; 
import { RiDeleteBin7Line } from 'react-icons/ri';

interface Props { 
    todo: Partial<TodoInterface> 
    setTodo: React.Dispatch<React.SetStateAction<Partial<TodoInterface>>>
    listLength: number, 
}

interface ItemProps { 
    text: string, 
    onShowEditor: () => void, 
    onDelete: () => void
}

const FormItem = ({ text, onShowEditor, onDelete }: ItemProps) => { 
    return ( 
        <article className = 'mx-4 flex justify-between bg-slate-300 px-2 py-1 shadow-md rounded-sm my-2'>
            <p> { text } </p>
            <div className = 'flex gap-x-2 items-center'>
                <BsPencil className = 'hover:scale-150 transition-all duration-300' onClick = { onShowEditor } /> 
                <RiDeleteBin7Line className = 'hover:scale-150 transition-all duration-300'  onClick = { onDelete } /> 
            </div>
        </article>
    )
}

const ListForm = ({ todo, setTodo, listLength }: Props) => {
    const [ inputEls, setInputEls ] = useState <boolean []> ([]); //true for input open - false for input closed
    const [ newTodoText, setNewTodoText ] = useState <string> (""); 
    const [ editText, setEditText ] = useState <string> (""); 
    
    useEffect( () => {
        let updateEls = []; 
        const length = todo.list?.length || 0; 
        for(let i = 0; i <= length; i++) { 
            updateEls.push(true); 
        }

        setInputEls(updateEls); 
     }, [todo.list])

    const addElement = (text: string, index: number) => { 
        if(newTodoText == "")  { 
            alert("Your task should not be empty."); 
        } else { 
            setNewTodoText(""); 
            let newList = todo.list || []; 
            newList.push({ text: text, done: false }); 
            setTodo({ ...todo, list: newList }); 
    
            let updateInputs = inputEls; 
            updateInputs[index] = false; 
            inputEls.push(true); 
            setInputEls(updateInputs); 
            console.log(todo); 
        }
    }

    const editElement = (text: string, index: number) => { 

    }

    const deleteElement = (index: number) => { 

    }

    const showEditor = (index: number) => { 
        console.log({ index }); 
        let updateInputs = []; 
        for(let i = 0; i < inputEls.length; i++) { 
            updateInputs.push(false); 
        }

        updateInputs[index] = true; 

        console.log(updateInputs); 
        setInputEls(updateInputs); 
    }
  return (
    <>
        <label className = 'input_label'>
            <>
                <span className='mx-4 text-base my-0.5 font-medium font-satoshi'> Add new tasks here </span>
                { 
                    inputEls.map((x, index) => { 
                        const text = todo.list === undefined ? "" : todo.list[index] === undefined ? "" : todo.list[index].text 
                        return ( 
                            <>
                                { x ? 
                                    ( 
                                        <>
                                            <InputElement 
                                                labelTitle='new Task'
                                                placeholder = '...new task'
                                                required = { false }
                                                value = { newTodoText }
                                                executeChange= { (e) => { setNewTodoText(e.target.value) }}
                                            /> 
            
                                            <button onClick = { () => addElement(newTodoText, index) }> + </button>
                                        </>
                                    ) : ( 
                                        <>
                                            <FormItem 
                                                text = { text }
                                                onShowEditor = { () => { showEditor(index)}}
                                                onDelete = { () => { deleteElement(index)}}
                                            /> 
                                        </>
                                    )
                                }
                            </>
                        )
                    })
                }
            </>
        </label>
    </>
  )
}

export default ListForm; 
