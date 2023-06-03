import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { AiFillEdit } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';
import { IoMdCheckmark } from 'react-icons/io';
import { deleteTodo, updateTodoDescription, updateTodoTitle } from '../features/task/todoSlice';

interface Todo {
  id: string;
  title: string;
  description: string;
}

const Tasks: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todo.todos)
  const [previousTodoTitle, setPreviousTodoTitle] = useState<string>('')
  const [previousTodoDescription, setPreviousTodoDescription] = useState<string>('')
  const [todoID, setTodoID] = useState<string>('')
  const dispatch = useDispatch()

  const [editModeMap, setEditModeMap] = useState<{ [todoId: string]: boolean }>({})
  const titleEditRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if(editModeMap) titleEditRef.current?.focus()
  }, [editModeMap])



  const handleCancelEdit = (todo: Todo) => {
    dispatch(updateTodoTitle({ id: todoID, title: previousTodoTitle }));
    dispatch(updateTodoDescription({ id: todoID, description: previousTodoDescription }))
    setEditModeMap((prevState) => ({
      ...prevState,
      [todo.id]: false,
    }));
  };

  const handleSetEditMode = (todo: Todo) => {
    setEditModeMap((prevState) => ({
      ...prevState,
      [todo.id]: true,
    }));
  };

  const handleSetTodo = (todo: Todo) => {
    setEditModeMap((prevState) => ({
      ...prevState,
      [todo.id]: false,
    }));
  };

  const todoList = todos.map((todo: Todo) => {
    const isEditMode = editModeMap[todo.id] || false;

    return (
            <div key={todo.id} className='bg-slate-100 m-5 p-4 w-[85%] rounded-2xl'>
                {isEditMode ? (
                        <div className="lg:flex lg:justify-between p-3 w-auto m-auto mt-3">
                            <div className='flex flex-col'>
                                <input
                                    className="text-xl font-semibold outline-none bg-transparent"
                                    value={todo.title}
                                    onChange={e => {
                                        setPreviousTodoTitle(todo.title);
                                        setTodoID(todo.id);
                                        dispatch(updateTodoTitle({ id: todo.id, title: e.target.value }))
                                    }}
                                    ref={titleEditRef}
                                />
                                <textarea
                                    className="bg-transparent outline-none mt-3"
                                    value={todo.description}
                                    onChange={e => {
                                        setPreviousTodoDescription(todo.description);
                                        setTodoID(todo.id);
                                        dispatch(updateTodoDescription({ id: todo.id, description: e.target.value }))
                                    }}
                                ></textarea>
                            </div>
                            <div className="lg:flex lg:mx-0 w-auto lg:items-start my-3">
                                <button onClick={() => handleSetTodo(todo)}>Set Todo</button>
                                <button onClick={() => handleCancelEdit(todo)} className="mx-3">Cancel</button>
                            </div>
                        </div>
                    ) : (
                        <div className='flex items-center justify-between bg-slate-100 p-3 w-[85%] m-auto mt-3 rounded-lg'>
                            <div>
                                <h1 className='text-xl font-semibold break-words'>{todo.title}</h1>
                                <p className='text-sm mt-3 h-fit w-fit break-all'>{todo.description}</p>
                            </div>
                            <div className='mx-5 flex flex-col items-center mt-2'>
                                <IoMdCheckmark class="cursor-pointer" onClick={() => dispatch(deleteTodo({...todo, id: todo.id}))} />
                                <AiFillEdit class="lg:mx-3 my-2 cursor-pointer" 
                                onClick={() => handleSetEditMode(todo)} />
                                <BsFillTrashFill
                                class="cursor-pointer"
                                onClick={() => dispatch(deleteTodo({...todo, id: todo.id}))} />
                            </div>
                        </div>
                    )}
            </div>
        )
    })

    return (
        <> 
            {todos.length > 0 ? todoList : <p className='text-cyan-700 lg:text-xl lg:mt-4 text-center mr-[50px] mt-6 md:mr-[80px]'>No Todos</p>} 
        </>
    )
}

export default Tasks