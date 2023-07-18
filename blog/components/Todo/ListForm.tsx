'use client'

import React, { useState, useEffect } from 'react'; 
import {  Todo as  TodoInterface } from '../../models/interfaces/Todo'; 
import { InputElement, EditInputElement } from '../Inputs/Inputs';
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
                <BsPencil className = 'hover:scale-150 cursor-pointer transition-all duration-300' onClick = { onShowEditor } /> 
                <RiDeleteBin7Line className = 'hover:scale-150 cursor-pointer transition-all duration-300'  onClick = { onDelete } /> 
            </div>
        </article>
    )
}

const ListForm = ({ todo, setTodo, listLength }: Props) => {
    const [ inputEls, setInputEls ] = useState <boolean []> ([]); //true for input open - false for input closed
    const [ newTodoText, setNewTodoText ] = useState <string> (""); 
    const [ editText, setEditText ] = useState <string> (""); 
    const [ identifyDelete, setIdentifyDelete ] = useState <boolean> (false); 
    
    useEffect( () => {
        let updateEls = []; 
        const length = todo.list?.length || 0; 
        for(let i = 0; i < length; i++) { 
            updateEls.push(false); 
        }

        setInputEls(updateEls); 
     }, [todo.list])

     useEffect( () => {
        let updateInputs = []; 
        for(let i = 0; i < inputEls.length - 1; i++) { 
            updateInputs.push(false); 
        }

        setInputEls(updateInputs); 
     }, [identifyDelete]); 

    const addElement = (text: string) => { 
        console.log("Add Element"); 
        if(newTodoText == "")  { 
            alert("Your task should not be empty."); 
        } else { 
            setNewTodoText(""); 
            let newList = todo.list || []; 
            newList.push({ text: text, done: false }); 
            setTodo({ ...todo, list: newList }); 
    
            let updateInputs = inputEls; 
            updateInputs.push(false); 
            setInputEls(updateInputs); 
        }

        console.log({ todo }); 
    }

    const editElement = (text: string, index: number) => { 
        console.log("Edit Element")
        let list = []; 
        if(text === "") {
            alert("Your task should not be empty.")
        } else { 
            setEditText("") //reset the text editor
            if(todo.list != undefined && todo.list[index] != undefined) { 
                list = todo.list; 
            } else { 
                console.log("Something went wrong with the index."); 
                return; 
            }
    
            list[index].text = text 
            setTodo({ ...todo, list: list }) //modify the text in the todo object 
            
            let updateInputs = inputEls; 
            updateInputs[index] = false; 
            setInputEls(updateInputs) //close the editor
        }
    }

    const deleteElement = (index: number) => { 
        console.log("Delete Element")
        if(todo.list != undefined && todo.list[index] != undefined ) { //typescript check
            setIdentifyDelete((x) => !x); 

            let list = []; 
            for(let i = 0; i < todo.list.length; i++) { 
                if(i != index) { 
                    list.push(todo.list[i]); 
                } 
            }

            setTodo({ ...todo, list: list }) //delete the task from the list
            setEditText(""); 

            console.log({ list }); 
        } else { 
            alert("Cannot delete the item due to an error"); 
            return;     
        }
    }

    const showEditor = (index: number) => { 
        console.log("Show Editor")
        let textFromList = ""; 

        if(todo.list != undefined && todo.list[index] != undefined) { 
            textFromList = todo.list[index].text; 
        }
        else { 
            console.log("Something went wrong"); 
            return; 
        }

        setEditText(textFromList); 
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
                                        <EditInputElement 
                                            labelTitle='Edit Task'
                                            placeholder = '...new task'
                                            required = { false }
                                            value = { editText }
                                            executeChange= { (e) => { setEditText(e.target.value); console.log({ editText }) }}
                                            executeEdit = { () => { editElement(editText, index) }}
                                        /> 
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

                <div>
                    <InputElement 
                        labelTitle='new Task'
                        placeholder = '...new task'
                        required = { false }
                        value = { newTodoText }
                        executeChange= { (e) => { setNewTodoText(e.target.value) }}
                        executeFunction = { () => addElement(newTodoText) }
                    /> 
                </div>
            </>
        </label>
    </>
  )
}

export default ListForm; 
