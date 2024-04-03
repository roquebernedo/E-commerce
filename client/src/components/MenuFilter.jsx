import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/MenuFilter.scss'

const MenuFilter = ({ handleFilter, setOpenMenu, categories, selected, handleMain }) => {
  // setOpenMenu(false)
  return (
    <div className='menu-Responsive'>
        <div className='buttonsResponsive'>
          {
            categories.map(category =>
              <Link className='buttonResponsive' key={category.id}>
                <div className='container-name-arrow-res' onClick={() => handleFilter(category.name, category.id)}>
                  <div>{category.name}</div>
                  <svg viewBox="0 0 24 24" focusable="false" className='buttonResponsive-icon'><path fill="currentColor" d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path></svg>
                </div>
                <div className={selected === category.id ? 'sub-category-items-show-res' : 'sub-category-items-res'}>
                  {category.categories.map((category, id) => 
                    <div key={id} className='mini-category-res' onClick={() => {handleMain(category); setOpenMenu(false)}}>{category}</div>
                  )}
                </div>
              </Link>
            )
          }
        </div>
    </div>
  )
}

export default MenuFilter