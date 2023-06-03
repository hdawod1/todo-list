import React from 'react'
import './App.css'
import Header from './components/Header'
import TodoView from './features/task/TodoView'
import Todos from './components/Todos'

const App: React.FC = () => {
  return (
    <div className='container'>
      <Header />
      <div className='hidden lg:grid lg:grid-cols-12'> 
        <span className='col-start-1 col-end-9'><Todos /></span>
        <span className='mt-5'><TodoView /></span>
      </div>
      <div className='lg:hidden mr-4 w-auto'> 
        <TodoView />
        <Todos />
      </div>
    </div>
  )
}

export default App
