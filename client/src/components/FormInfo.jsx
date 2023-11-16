import React from 'react'

const FormInfo = ({ classForm, title, type, value, setEmail }) => {
    return(
        <div className={classForm}>
            <div>{title}</div>
            <input
                type={type}
                value={value}
                onChange={(e) => setEmail(e.target.value)}
            />
        </div>
    )
}

export default FormInfo