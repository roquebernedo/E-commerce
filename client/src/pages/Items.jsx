import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Items = () => {
    const categories = [
        {
            name: "Videojuegos",
            id: 0
        },
        {
            name: "Celulares",
            id: 1
        },
        {
            name: "Computadoras",
            id: 2
        },
        {
            name: "Tablets",
            id: 3
        },
        {
            name: "Audio",
            id: 4
        },
        {
            name: "Consolas",
            id: 5
        }
    ]
    
    const [products, setProducts] = useState([])
    const [show, setShow] = useState(false)
    const [name, setName] = useState()
    const [filter, setFilter] = useState([])
    const { userInfo } = useSelector((state) => state.auth)

    useEffect(() => {
        const fetchAllProducts = async () => {
            try{
                const res = await axios.get("https://ecommerce-moez.onrender.com/")
                setProducts(res.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchAllProducts()
    }, [])
    console.log(products)

    useEffect(() => {
        if(products.length > 0){ // Sale error sino se usa un condicional, porque al momento de devolver los valores, se demora un poco y es por eso el error
            const filtered = products.filter(person => 
                name === 'Videojuegos' 
                    ? person.category === 'Videojuegos'
                    : name === 'Celulares'
                        ? person.category === 'Celulares'
                        : name === 'Computadoras'
                            ? person.category === 'Computadoras'
                            : name === 'Tablets'
                                ? person.category === 'Tablets'
                                : name === 'Audio'
                                    ? person.category === 'Audio'
                                    : person.category === 'Consolas'
            );
            setFilter(filtered)
            console.log(name)
        }
    }, [products, name]);
    console.log(filter)

    const handleFilter = (category) => {
        console.log(category)
        setShow(true)
        setName(category)
    }
  
    return (
        <section className='container-filter'>
            <div className='type-products' id='type-products'>
                <div className='type-right'>
                    {
                        userInfo ? (
                            <Link className='addnew' to="/add">Add new Product</Link>
                        ):(
                            <div></div>
                        )
                    }
                </div>
            </div>

            <div className='container-main-filter'>
                <section className='container-filterer'>
                    <div className='container-categories'>
                        <div className='container-category'>
                            <div className='container-filtered-word'>
                                <div className='name-word'>{name && name + ' ->'}</div>
                            </div>
                            <div className='container-category-inside'>
                                {categories.map(category => 
                                    <div className='category-items' onClick={() => handleFilter(category.name)}>{category.name}</div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
                <section className='container-items'>
                    <div className='container-items-list'>
                        <div className='container-items-main'>
                            {!show ? (products.map(product => 
                                <Link to={`/product/${product._id}`} className='news-list-games' key={product._id}>
                                <div className='news-img'><img alt='' src={product.image} /></div>
                                <div className='news-info'>
                                    <div className='news-info-main'>
                                        <div className='news-description'>
                                            <div className='description'>{product.title}</div>
                                        </div>
                                        <div className='news-date'>
                                            <div className='date'>{product.date}</div>
                                        </div>
                                        <div className='available'>
                                            <div className='available-main'>Disponible</div>
                                        </div>
                                        <div className='price'>
                                            <div className='price-main'>S/ {parseFloat(product.price).toFixed(2)}</div>
                                        </div>
                                        <div className='brand'>
                                            <div className='brand-blank'></div>
                                            <div className='brand-main'>{product.brand}</div>
                                        </div>
                                    </div>
                                </div>
                            </Link> ))
                            : (filter.map(product => 
                                <Link to={`/product/${product._id}`} className='news-list-games' key={product._id}>
                                <div className='news-img'><img alt='' src={product.image} /></div>
                                <div className='news-info'>
                                    <div className='news-info-main'>
                                        <div className='news-description'>
                                            <div className='description'>{product.title}</div>
                                        </div>
                                        <div className='news-date'>
                                            <div className='date'>{product.date}</div>
                                        </div>
                                        <div className='available'>
                                            <div className='available-main'>Disponible</div>
                                        </div>
                                        <div className='price'>
                                            <div className='price-main'>S/ {parseFloat(product.price).toFixed(2)}</div>
                                        </div>
                                        <div className='brand'>
                                            <div className='brand-blank'></div>
                                            <div className='brand-main'>{product.brand}</div>
                                        </div>
                                    </div>
                                </div>
                            </Link> ))
                        
                            }
                        </div>
                    </div>
                </section>
            </div>
        </section>
  )
}
    

export default Items