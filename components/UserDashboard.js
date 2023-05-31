import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext';
import TodoCard from '../components/TodoCard';
import { doc, setDoc, deleteField } from 'firebase/firestore';
import { db } from '../firebase'
import useFetchTodos from '../hooks/fetchTodos';

export default function UserDashboard() {
    const { currentUser } = useAuth();
    const [todo, setTodo] = useState('');
    const [edit, setEdit] = useState(null);
    const [editedValue, setEditedValue] = useState('');

    const { todos, loading, error, setTodos } = useFetchTodos();

    async function handleAddTodo() {
        if (!todo) { return }
        const newKey = Object.keys(todos).length === 0 ? 1 : Math.max(...Object.keys(todos)) + 1
        setTodos({ ...todos, [newKey]: todo })
        const userRef = doc(db, 'users', currentUser.uid)
        await setDoc(userRef, {
            'todos': {
                [newKey]: todo
            }
        }, { merge: true })
        setTodo('')
    }

    function handleAddEdit(todoKey) {
        return () => {
            setEdit(todoKey);
            setEditedValue(todos[todoKey]);
        };
    }

    async function handleEditTodo() {
        if (!editedValue) { return }
        const newKey = edit
        setTodos({ ...todos, [newKey]: editedValue })
        const userRef = doc(db, 'users', currentUser.uid)
        await setDoc(userRef, {
            'todos': {
                [newKey]: editedValue
            }
        }, { merge: true })
        setEdit(null)
        setEditedValue('')
    }

    function handleDelete(todoKey) {
        return async () => {
            const tempObj = { ...todos }
            delete tempObj[todoKey]

            setTodos(tempObj)
            const userRef = doc(db, 'users', currentUser.uid)
            await setDoc(userRef, {
                'todos': {
                    [todoKey]: deleteField()
                }
            }, { merge: true })
        }
    }
    return (
        <div className='w-full max-w-[65ch] mx-auto flex flex-col flex-1 gap-3 sm:gap-5 text-xs sm:text-sm'>
            <div className='flex items-stretch'>
                <input
                    type="text"
                    placeholder='Enter todo'
                    value={todo}
                    onChange={evt => setTodo(evt.target.value)}
                    className='outline-none p-3 text-base sm:text-lg text-slate-900 flex-1'
                />
                <button onClick={handleAddTodo} className='w-fit px-4 sm:px-6 py-2 sm:py-3 bg-amber-400 text-white font-medium text-base duration-300 hover:opacity-40'>ADD</button>
            </div>
            {/* loading state icon */}
            {(loading) && (<div className='flex-1 grid place-items-center'>
                <i className="fa-solid fa-spinner animate-spin text-6xl"></i>
            </div>)}
            {(!loading) && (
                <>
                    {Object.keys(todos).map((todo, index) => {
                        return (
                            <TodoCard
                                key={index}
                                handleAddEdit={handleAddEdit}
                                edit={edit}
                                editedValue={editedValue}
                                setEditedValue={setEditedValue}
                                handleEditTodo={handleEditTodo}
                                handleDelete={handleDelete}
                                todoKey={todo}
                            >
                                {todos[todo]}
                            </TodoCard>
                        )
                    })}
                </>
            )}
            {/* {!addTodo && <button onClick={() => setAddTodo(true)} className='text-cyan-300 border boder-solid border-cyan-300 py-2 text-center uppercase text text-lg duration-300 hover:opacity-30'>add todo</button>} */}
        </div>
    )
}
