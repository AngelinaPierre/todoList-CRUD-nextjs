import React from 'react'

export default function TodoCard(props) {
    const { children, handleAddEdit, edit, editedValue, setEditedValue, todoKey, handleEditTodo, handleDelete } = props;

    return (
        <div className='flex relative items-stretch p-2 border boder-white boder-solid sm:p-3'>
            <div className='flex flex-1'>
                {!(edit === todoKey) ? (
                    <>{children}</>
                ) : (
                    <input
                        type="text"
                        className='bg-inherit text-white outline-none flex-1'
                        value={editedValue}
                        onChange={evt => setEditedValue(evt.target.value)}
                    />
                )}
                {/* {children} */}
            </div>
            <div className='flex items-center'>
                {(edit === todoKey) ? (
                    <i onClick={handleEditTodo} className='fa-solid fa-check px-2 duration-300 hover:scale-125 cursor-pointer'></i>
                ) : (
                    <i onClick={handleAddEdit(todoKey)} className='fa-solid fa-pencil px-2 duration-300 hover:rotate-45 cursor-pointer'></i>
                )}
                <i onClick={handleDelete(todoKey)} className='fa-solid fa-trash-can px-2 duration-300 hover:scale-125 cursor-pointer'></i>
            </div>
        </div>
    )
}
