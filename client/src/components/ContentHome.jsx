import React, { useEffect, useState } from 'react'
import '../styles/ContentHome.scss'
import { IoGameControllerOutline } from "react-icons/io5"
import { FiSmartphone } from "react-icons/fi"
import { MdOutlineComputer } from "react-icons/md";
import { IoMdTabletLandscape } from "react-icons/io";
import { SlEarphones } from "react-icons/sl";
import { CiShop } from "react-icons/ci";
import { Link, useNavigate } from 'react-router-dom';  
import axios from 'axios';

const ContentHome = ({ buttonsFromHome, setButtonsFromHome }) => {
    const navigate = useNavigate()
    const countries = [
        {
          image: "../images/join.jpg",
          title: "Brazil",
          id: 0
        },
        {
          image: "https://tech.sevastopol.su/wp-content/uploads/2021/04/2324424_large-e1618947538461.jpg",
          title: "China",
          id: 1
        },
        {
          image: "https://imgmedia.larepublica.pe/640x371/larepublica/original/2023/06/23/649636a5ce38376dee63bff1.webp",
          title: "France",
          id: 2
        },
        {
          image: "https://image.api.playstation.com/vulcan/ap/rnd/202208/0921/46OCOSLlnvNL5Ari9TUslJ07.jpg",
          title: "Japan",
          id: 3
        },
        {
          image: "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2021/06/nintendo-64-super-mario-64-2381725.jpg?tf=3840x",
          title: "Norway",
          id: 4
        },
    ];

    const [current, setCurrent] = useState(0)
    const [autoPlay, setAutoPlay] = useState(true)
    const [rates, setRates] = useState([])
    const [featured, setFeatured] = useState([])
    const [portal, setPortal] = useState([])
    let timeout = null

    useEffect(() => {
        axios
          .get("https://ecommerce-moez.onrender.com/") // https://ecommerce-moez.onrender.com/
          .then(response => {
            setRates(response.data)
          })
      
      }, [])
    console.log(rates)

    useEffect(() => {
        const featuredProducts = rates.filter(product => 
            product.title === 'Fortnite' || 
            product.title === 'Mario vs. Donkey Kong' ||
            product.title === 'Pokemon Scarlet and Violet' ||
            product.title === 'Hogwarts Legacy' ||
            product.title === "Crash Bandicoot 4: It's About Time"
        )
        setFeatured(featuredProducts)

        const playStationPortal = rates.find(product => product.title === 'Play Station Portal')
        setPortal(playStationPortal)
    }, [rates])

    console.log(portal)
  
    const slideRight = () => {
        setCurrent(current === countries.length - 1 ? 0 : current + 1)
    }

    const slideLeft = () => {
        setCurrent(current === 0 ? 4 : current - 1)
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        timeout = autoPlay && setTimeout(() => {slideRight();}, 2500)
    })

    function scrollToTop() {
        // Desplazar la página al inicio (al header)
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    function handleLinkClick() {
        // Retrasar la redirección por 500 milisegundos (medio segundo)
        setTimeout(scrollToTop, 500);
    }

    const filtering = (category) => {
            const filtered = rates.filter(person => 
                category === 'Videojuegos' 
                    ? person.category === 'Videojuegos' 
                    : category === 'Celulares'
                        ? person.category === 'Celulares'
                        : category === 'Computadoras'
                            ? person.category === 'Computadoras'
                            : category === 'Tablets'
                                ? person.category === 'Tablets'
                                : category === 'Audio'
                                    ? person.category === 'Audio'
                                    : ''
            );
            console.log(filtered);
            setButtonsFromHome(filtered);
            navigate('/results')
      }

  return (
    <>
        <div className='image' onMouseEnter={() => {setAutoPlay(false); clearTimeout(timeout)}} onMouseLeave={() => {setAutoPlay(true)}}>
            <div className='rose-stick'>
                {countries.map((country) => {
                    return (
                        <div key={country.id} className={country.id === current ? "carousel_card carousel_card-active" : "carousel_card"}>
                            <img className='card_image' src={country.image} alt='' />
                        </div>
                    )
                })}
                <div className="carousel_arrow_left" onClick={slideLeft}>&lsaquo;</div>
                <div className="carousel_arrow_right" onClick={slideRight} >&rsaquo;</div>
                <div className="carousel_pagination">
                    {countries.map(country => {
                        return (
                            <div 
                                key={country.id} 
                                className={country.id === current ? "pagination_dot pagination_dot-active" : "pagination_dot"}
                                onClick={() => setCurrent(country.id)}
                            >
                            </div>
                        )
                    })}
                </div>
            </div>  
        </div>
        <section className='carousel-category'>
            <Link className='list' to='/results' onClick={() => filtering('Videojuegos')}>
                <div className='top-list videojuegos'><IoGameControllerOutline /></div>
                <div className='bottom-list'>VideoJuegos</div>
            </Link>
            <Link className='list' to='/results' onClick={() => filtering('Celulares')}>
                <div className='top-list celulares'><FiSmartphone /></div>
                <div className='bottom-list'>Celulares</div>
            </Link>
            <Link className='list' to='/results' onClick={() => filtering('Computadoras')}>
                <div className='top-list computadoras'><MdOutlineComputer /></div>
                <div className='bottom-list'>Computadoras</div>
            </Link>
            <Link className='list' to='/results' onClick={() => filtering('Tablets')}>
                <div className='top-list tablets'><IoMdTabletLandscape /></div>
                <div className='bottom-list'>Tablets</div>
            </Link>
            <Link className='list' to='/results' onClick={() => filtering('Audio')}>
                <div className='top-list tablets'><SlEarphones /></div>
                <div className='bottom-list'>Audio</div>
            </Link>
        </section>
        <section className='news'>
            <div className='news-div'>
                <h2>Destacados</h2>
            </div>
            <div className='news-list'>
                <div className='news-list-main'>
                    {featured.length > 0 &&
                        featured.map(item => 
                            <Link to={`/product/${item._id}`} className='news-list-games' key={item._id}>
                                <div className='news-img'><img alt='' src={item.image} /></div>
                                <div className='news-info'>
                                    <div className='news-info-main'>
                                        <div className='news-description'>
                                            <div className='description'>{item.title}</div>
                                        </div>
                                        <div className='available'>
                                            <div className='available-main'>Disponible</div>
                                        </div>
                                        <div className='brand'>
                                            <div className='brand-blank'></div>
                                            <div className='brand-main'>{item.brand}</div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    }
                </div>
            </div>
        </section>

        <div className='subTitle'>
            <div className='subMidle'>
                <div className='collection first'>
                    <span>Coleccion de portatiles</span>
                </div>
                <div className='collection second'>
                    y consolas para 
                </div>
                <div className='collection third'>
                    y tus amigos
                </div>
            </div>
        </div>

        <section className='playStation'>
            {portal &&
                <div className='portatil'>
                    <Link to={`/product/${portal._id}`} key={portal._id} className='portatil-container'>
                        <img className='portatil-img' alt='' src='https://i.ytimg.com/vi_webp/NmgOWKQj5-Y/maxresdefault.webp'/>
                    </Link>
                    <div className='portatil-info'>
                        <div className='portatil-info-top'>
                            <h2 className='portatil-info-top-title'>PlayStation Portatil para consola PS5</h2>
                        </div>
                        <div className='portatil-info-bottom'>
                            <div className='portatil-info-bottom-container'>
                                <div className='portatil-description'>
                                    <p className='portatil-p'>La emocion de tener en tus manos el portal a los juegos de ps5 en el lugar menos pensado</p>
                                </div>
                                <div className='portatil-button'>
                                    <div className='button-product'>
                                        <Link className='link-product' to={`/product/${portal._id}`} key={portal._id}>
                                            Ver producto
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </section>

        <section id='top' className='shop-store'>
            <Link className='store-container' to='/results' onClick={() => setTimeout(handleLinkClick, 0)}>
                <CiShop className='store' />
                <div className='store'>VER TIENDA</div>
            </Link>
        </section>
    </>
  )
}

export default ContentHome