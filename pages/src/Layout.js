import React from 'react'

const LayOut = ({ children }) => {
    return (
        <div>
            <header></header>
            {children}
            <footer></footer>
        </div>
    )
}

export default LayOut