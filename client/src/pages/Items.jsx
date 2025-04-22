import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import '../styles/Filter.scss'
import { css } from '@emotion/react';
import { CircleLoader } from 'react-spinners';
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { BiMenuAltRight } from "react-icons/bi";
import MenuFilter from '../components/MenuFilter'
import { addingToList, removeFavorite } from '../slices/authSlice'
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart, FaHeartBroken } from "react-icons/fa";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Items = ({ filterProducts, buttonsMain }) => {
    const categories = [
        {
            name: "Juegos",
            id: 0,
            categories: ["Consolas", "Videojuegos", "Accesorios para Consolas"]
        },
        {
            name: "Celulares",
            id: 1,
            categories: ["Samsung", "Apple", "Xiaomi", "Huawei"]
        },
        {
            name: "Computadoras",
            id: 2,
            categories: ["Notebooks", "PC", "Mouse", "Teclado"]
        },
        {
            name: "Tablets",
            id: 3,
            categories: ["Apple", "Xiaomi", "Lenovo", "Samsung"]
        },
        {
            name: "Audio",
            id: 4,
            categories: ["Televisores", "Audio"]
        }
    ]
    
    const [products, setProducts] = useState([])
    // eslint-disable-next-line no-unused-vars
    const [list, setList] = useState([])
    const [userWishList, setUserWishList] = useState([]) 
    const [show, setShow] = useState(false)
    const [name, setName] = useState()  
    const [nameMain, setNameMain] = useState()
    const [filter, setFilter] = useState([])
    const [filterMain, setFilterMain] = useState([])
    const { userInfo } = useSelector((state) => state.authReducer)
    const [filterBar, setFilterBar] = useState(filterProducts)
    // color eslint cuando antes, pendiente *****
    // eslint-disable-next-line no-unused-vars
    const [isLoading, setIsLoading ] = useState(false)
    const [newName, setNewName] = useState(buttonsMain)
    const [openMenu, setOpenMenu] = useState(false)
    const [selected, setSelected] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchAllProducts = async () => {
            try{
                const res = await axios.get("https://e-commerce-f1fr.onrender.com")
                setProducts(res.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchAllProducts()
    }, [])
    console.log(products)
    useEffect(() => {
        const fetchAllProducts = async () => {
            try{
                const res = await axios.get("https://e-commerce-f1fr.onrender.com/api/wishlist/list")
                setList(res.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchAllProducts()
    }, [])
    //console.log(list)
    //const userList = list.find(item => item.user.find(user => user.id === userInfo.id));

    useEffect(() => {
        if(userInfo && userInfo.wishlist){
            const userListProducts = userInfo.wishlist?.map(item => item.products.map(pro => pro._id))
            const flatUserList = userListProducts.flat()
            setUserWishList(flatUserList)
            console.log(userListProducts)
            //console.log(userWishList)
            
            // const userList = list.find(item => item.user.find(user => user.id === userInfo.id));
            // if (userList) {
            //     setUserWishList(userList)
            //     console.log('Usuario encontrado:', userList);
            // } else {
            //     console.log('Usuario no encontrado');
            // }
        }else{
            console.log("salio error")
        }
    }, [userInfo])
    console.log(userWishList)
    //console.log(userInfo.id)
    // Sirve para mostrar los items que se obtienen por las categorias
    useEffect(() => {
        if(products.length > 0){ // Sale error sino se usa un condicional, porque al momento de devolver los valores, se demora un poco y es por eso el error
            const filtered = products.filter(person => 
                name === 'Juegos' 
                    ? person.category === 'Consolas y Videojuegos'
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
        }
    }, [products, name]);
    
    useEffect(() => {
        if(products.length > 0){
                //const filteredProducts = productsMain.filter(person => person.category === 'Consolas y Videojuegos')
                const filteredMain = filter.filter(person => (
                    nameMain === 'Consolas' 
                        ? person.mainCategory === 'Consolas'
                        : nameMain === 'Videojuegos'
                            ? person.mainCategory === 'Videojuegos'
                            : nameMain === 'Accesorios para Consolas'
                                ? person.mainCategory === 'Accesorios para Consolas'
                                : nameMain === 'Samsung'
                                    ? person.mainCategory === 'Samsung'
                                    : nameMain === 'Apple'
                                        ? person.mainCategory === 'Apple'
                                        : nameMain === 'Xiaomi'
                                            ? person.mainCategory === 'Xiaomi'
                                            : nameMain === 'Huawei'
                                                ? person.mainCategory === 'Huawei'
                                                : nameMain === 'Lenovo'
                                                    ? person.mainCategory === 'Lenovo'
                                                    : nameMain === 'Televisores'
                                                        ? person.mainCategory === 'Televisores'
                                                        : nameMain === 'Audio'
                                                            ? person.mainCategory === 'Audio'
                                                            : nameMain === 'Notebooks'
                                                                ? person.mainCategory === 'Notebooks'
                                                                : nameMain === 'PC'
                                                                    ? person.mainCategory === 'PC'
                                                                    : nameMain === 'Mouse'
                                                                        ? person.mainCategory === 'Mouse'
                                                                        : nameMain === 'Teclado'
                                                                            ? person.mainCategory === 'Teclado'
                                                                            : ""
                                
                ))
                setFilterMain(filteredMain)
        }
    }, [nameMain, products, filter])

    // Sirve para mostrar los productos provenientes del buscador del header
    useEffect(() => {
        if(filterProducts.length > 0){
            setNewName([])
            setFilterBar(filterProducts)
        }
    }, [filterProducts])
    
    const handleFilter = (category, i) => {
        setNewName([])
        setNameMain([])
        setFilterBar([])
        setFilterMain([])
        setShow(true)
        setName(category)
        if(selected === i){
            return setSelected(null)
        }
        setSelected(i)
    }

    const handleMain = (category) => {
        setNameMain(category)
    }
  
    const handleMenu = () => {
        if(openMenu === true){
          setOpenMenu(false)
        }else{
          setOpenMenu(true)
        }
    }

    const favorites = (e, id, content) => {
        e.preventDefault()
        //e.stopPropagation()
        console.log(id, content)
        dispatch(addingToList(id, content))
        
    }

    const removeFavoritee = (e, id, content) => {
        e.preventDefault()
        console.log(id)
        console.log(content)
        dispatch(removeFavorite(id, content))
    }
  
    return (
        <section className='container-filter'>
            {
                userInfo && (
                    <div className='type-products' id='type-products'>
                        <div className='type-right'> 
                            <Link className='addnew' to="/add">Add new Product</Link>
                        </div>
                    </div>
                )
            }

            <div className='container-main-filter'>
                {products.length === 0 ?
                    <div className='loader'>
                        <CircleLoader color={'#157dc2'} loading={true} css={override} size={75} />
                    </div> 
                 :
                    <>
                    <section className='container-filterer'>
                        <div className='container-categories'>
                            <div className='container-category'>
                                <div className='container-filtered-word'>
                                    <div className='name-word'>
                                        {name ?
                                            <>
                                                <svg viewBox="0 0 16 16" focusable="false" className='icon-cancel'>
                                                    <path d="M9.41 8l2.29-2.29c.19-.18.3-.43.3-.71a1.003 1.003 0 0 0-1.71-.71L8 6.59l-2.29-2.3a1.003 1.003 0 0 0-1.42 1.42L6.59 8 4.3 10.29c-.19.18-.3.43-.3.71a1.003 1.003 0 0 0 1.71.71L8 9.41l2.29 2.29c.18.19.43.3.71.3a1.003 1.003 0 0 0 .71-1.71L9.41 8z" fillRule="evenodd" fill="currentColor"></path>
                                                </svg>  
                                                <div className='icon-container'>
                                                    <div className='icon-name-container'>{name}</div>
                                                    <MdKeyboardDoubleArrowRight className='icon-arrow' />
                                                    <div className='icon-nameMain-container'>
                                                        <div>{nameMain}</div>
                                                    </div>
                                                </div>
                                            </>
                                            : <div className='shadow'>Categorias</div>
                                        }
                                    </div>
                                </div>
                                <div className='container-category-inside'>
                                    {categories.map(category => 
                                        <div key={category.id} className='category-items'>
                                            <div className='container-name-arrow' onClick={() => handleFilter(category.name, category.id)}>
                                                <div className='category-name'>{category.name}</div>
                                                <div className='arrow-container'>
                                                    <svg viewBox="0 0 24 24" focusable="false" className='category-arrow'><path fill="currentColor" d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path></svg>
                                                </div>
                                            </div>
                                            <div className={selected === category.id ? 'sub-category-items-show' : 'sub-category-items'}>
                                                {category.categories.map((category, id) => 
                                                    <div key={id} className='mini-category' onClick={() => handleMain(category)}>{category}</div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className='buttons' onClick={handleMenu}>
                                    <BiMenuAltRight className='menu-responsive'/>
                                </div>
                            </div>
                        </div>
                    </section>
                    {openMenu && <MenuFilter handleFilter={handleFilter} setOpenMenu={setOpenMenu} categories={categories} selected={selected} handleMain={handleMain}/>}
                    <section className='container-items'>
                        <div className='container-items-list'>
                            <div className='container-items-main'>
                            { 
                                (newName.length > 0 ? 
                                    newName.map(product => 
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
                                                        <div className='price-main'>$ {parseFloat(product.price).toFixed(2)}</div>
                                                    </div>
                                                    <div className='brand'>
                                                        <div className='brand-blank'></div>
                                                        <div className='brand-main'>{product.brand}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link> 
                                    )
                                    : 
                                
                                filterBar.length > 0 ? 
                                    (filterBar.map(product => 
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
                                                        <div className='price-main'>$ {parseFloat(product.price).toFixed(2)}</div>
                                                    </div>
                                                    <div className='brand'>
                                                        <div className='brand-blank'></div>
                                                        <div className='brand-main'>{product.brand}</div>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </Link> 
                                    ))
                                : !show  ? 
                                    (products.map(product => 
                                        // onClick={() => favorites(product._id, product)} 
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
                                                        <div className='price-main'>$ {parseFloat(product.price).toFixed(2)}</div>
                                                    </div>
                                                    <div className='brand'> 
                                                        <div className='brand-left-blankmain'>
                                                            <div className='brand-blank'></div>
                                                            <div className='brand-main'>{product.brand}</div>
                                                        </div>
                                                        {userInfo && 
                                                            <div className='heart-pick'>
                                                                {userWishList.includes(product._id) 
                                                                    ?   <div onClick={(e) => removeFavoritee(e, product._id, product)} className='heart-broken-div'><FaHeartBroken className='icon-broken'/><FaHeart className='heart-broken'/></div>
                                                                    :   <div onClick={(e) => favorites(e, product._id, product)} className='heart-products-div'><FaRegHeart className='heart-products' /></div>
                                                                }
                                                            </div>
                                                        }                                                     
                                                    </div>
                                                    {/* <button onClick={() => removeFavoritee(product._id, product)}  >eliminar</button> */}
                                                </div>
                                            </div>
                                        </Link> 
                                    ))
                                :  filter.length > 0 && filterMain.length === 0 ?
                                (filter.map(product => 
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
                                                        <div className='price-main'>$ {parseFloat(product.price).toFixed(2)}</div>
                                                    </div>
                                                    <div className='brand'> 
                                                        <div className='brand-left-blankmain'>
                                                            <div className='brand-blank'></div>
                                                            <div className='brand-main'>{product.brand}</div>
                                                        </div>
                                                        {userInfo && 
                                                            <div className='heart-pick'>
                                                                {userWishList.includes(product._id) 
                                                                    ?   <div onClick={(e) => removeFavoritee(e, product._id, product)} className='heart-broken-div'><FaHeartBroken className='icon-broken'/><FaHeart className='heart-broken'/></div>
                                                                    :   <div onClick={(e) => favorites(e, product._id, product)} className='heart-products-div'><FaRegHeart className='heart-products' /></div>
                                                                }
                                                            </div>
                                                        }                                                     
                                                    </div>
                                                </div>
                                            </div>
                                        </Link> 
                                    )) :filter.length > 0 && filterMain.length > 0 ? 
                                    (filterMain.map(product => 
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
                                                        <div className='price-main'>$ {parseFloat(product.price).toFixed(2)}</div>
                                                    </div>
                                                    <div className='brand'> 
                                                        <div className='brand-left-blankmain'>
                                                            <div className='brand-blank'></div>
                                                            <div className='brand-main'>{product.brand}</div>
                                                        </div>
                                                        {userInfo && 
                                                            <div className='heart-pick'>
                                                                {userWishList.includes(product._id) 
                                                                    ?   <div onClick={(e) => removeFavoritee(e, product._id, product)} className='heart-broken-div'><FaHeartBroken className='icon-broken'/><FaHeart className='heart-broken'/></div>
                                                                    :   <div onClick={(e) => favorites(e, product._id, product)} className='heart-products-div'><FaRegHeart className='heart-products' /></div>
                                                                }
                                                            </div>
                                                        }                                                     
                                                    </div> 
                                                </div>
                                            </div>
                                        </Link> 
                                    )) 
                                    : filter.length === 0 ?
                                    <div>No se encontraron resultados</div> : ""
                                )
                            }
                            </div>
                        </div>
                    </section>
                    </>
                }
            </div>
        </section>
  )
}
    

export default Items