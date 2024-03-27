import React from 'react'
import { Link } from 'react-router-dom'

const FormInfo = ({ classForm, title, type, value, setItem  }) => {
    return(
        <div className={classForm}>
            <div>{title}</div>
            <input
                type={type}
                value={value}
                onChange={(e) => setItem(e.target.value)}
            />
        </div>
    )
}

export default FormInfo