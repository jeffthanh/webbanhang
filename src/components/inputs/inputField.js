import React from 'react'

const InputField = ({ value, setValue, nameKey, type, invaliFields, setInvalidFieds }) => {
    return (
        <div className='w-full'>
            {value.trim() !== '' && <label htmlFor='{namekey}'>{nameKey?.slice(0, 1).toUpperCase() + nameKey.slice(1)}</label>}
            <input type={type || 'text'}
                className='px-4 py-2 rounded-sm border w-full my-2 placeholder:text-sm placeholder:italic '
                placeholder={nameKey?.slice(0, 1).toUpperCase() + nameKey.slice(1)}
                value={value}
                onChange={e => setValue(prev => ({ ...prev, [nameKey]: e.target.value }))}
            />
        </div>
    )
}

export default InputField