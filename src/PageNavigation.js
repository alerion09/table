import React from 'react'

const PageNavigation = ({moreHandler}) => {
    return (
        <div className="navigation-container page-navigation-container">
            <button onClick={()=> moreHandler()}>More..</button>
        </div>
    )
}

export default PageNavigation
