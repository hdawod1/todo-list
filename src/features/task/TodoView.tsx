import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from './todoSlice'
import { nanoid } from 'nanoid'

const TaskView: React.FC = () => {

    const dispatch = useDispatch()

    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')

    const handleAddTodo= (e: React.FormEvent) => {
        e.preventDefault()
        if (title && description){
            dispatch(addTodo({id: nanoid(), title, description}))
        }
    }

    return(
        <div className='w-[26%] lg:w-[150px] mt-3 lg:mt-0 relative left-5'>
            <form onSubmit={handleAddTodo}>
                <h1 className='text-cyan-700 w-[120px] text-xl'>Add a Todo</h1>
                <div className='block'>
                    <div className='my-4'>
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title"     id="title"
                            onChange={e => setTitle(e.target.value)} 
                            className='bg-gray-100 outline-none rounded-lg p-1 text-sm w-[320%] lg:w-[300px]' style={{caretColor: 'black'}} 
                        />
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <textarea name="description"id="description"
                            onChange={e => setDescription(e.target.value)}
                            className='bg-gray-100 w-[320%] lg:w-[300px] text-md outline-none rounded-lg p-1 text-sm'
                            style={{caretColor: 'black'}}
                        ></textarea>
                    </div>
                </div>
                <div className='bg-cyan-100 text-center mt-5 p-3 rounded-2xl w-[320%] lg:w-[170px]'>
                    <button className='outline-none'>Add Todo</button>
                </div>
            </form>
        </div>
    )
}

export default TaskView