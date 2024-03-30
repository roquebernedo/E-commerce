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
    let timeout = null

    useEffect(() => {
        axios
          .get("http://localhost:8000")
          .then(response => {
            setRates(response.data)
          })
      
      }, [])
  

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
                    <div className='news-list-games'>
                        <div className='news-img'><img alt='' src='https://assets.nintendo.com/image/upload/ar_16:9,b_auto:border,c_lpad/b_white/f_auto/q_auto/dpr_1.0/c_scale,w_300/ncom/en_US/merchandising/Merch%20banners/Fortnite/FNBR_29-00_C5S2_KeyArt_MOTD_1920x1080' /></div>
                        <div className='news-info'>
                            <div className='news-info-main'>
                                <div className='news-description'>
                                    <div className='description'>Capitulo 5 - Temporada 2 de Batalla campal de Fortnite:...</div>
                                </div>
                                <div className='available'>
                                    <div className='available-main'>Disponible</div>
                                </div>
                                <div className='brand'>
                                    <div className='brand-blank'></div>
                                    <div className='brand-main'>Nintendo Switch</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='news-list-games'>
                        <div className='news-img'><img alt='' src='https://assets.nintendo.com/image/upload/ar_16:9,b_auto:border,c_lpad/b_white/f_auto/q_auto/dpr_1.0/c_scale,w_300/ncom/en_US/merchandising/feature-banner/N531KN2tQZ/i7a6mlD0xI3/Switch_16x9_MarioVsDonkeyKong_KeyArt' /></div>
                        <div className='news-info'>
                            <div className='news-info-main'>
                                <div className='news-description'>
                                    <div className='description'>Mario vs. Donkey Kong</div>
                                </div>
                                <div className='available'>
                                    <div className='available-main free'>Version de prueba gratuita</div>
                                </div>
                                <div className='brand'>
                                    <div className='brand-blank'></div>
                                    <div className='brand-main'>Nintendo Switch</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='news-list-games'>
                        <div className='news-img'><img alt='' src='https://assets.nintendo.com/image/upload/ar_16:9,b_auto:border,c_lpad/b_white/f_auto/q_auto/dpr_1.0/c_scale,w_300/ncom/en_US/merchandising/feature-banner/2023/4_PokSV_ExPa_EN' /></div>
                        <div className='news-info'>
                            <div className='news-info-main'>
                                <div className='news-description'>
                                    <div className='description'>The Hidden Treasure of Area Zero</div>
                                </div>
                                <div className='available'>
                                    <div className='available-main'>Disponible</div>
                                </div>
                                <div className='brand'>
                                    <div className='brand-blank'></div>
                                    <div className='brand-main'>Nintendo Switch</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='news-list-games'>
                        <div className='news-img'><img alt='' src='https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1240/b_white/f_auto/q_auto/ncom/software/switch/70010000014724/72ce0a17215521a167c3da579db4cc48a2f7a52eacc81ad985ba20fd6817fdc2' /></div>
                        <div className='news-info'>
                            <div className='news-info-main'>
                                <div className='news-description'>
                                    <div className='description'>Hogwarts Legacy</div>
                                </div>
                                <div className='available'>
                                    <div className='available-main'>Disponible</div>
                                </div>
                                <div className='brand'>
                                    <div className='brand-blank'></div>
                                    <div className='brand-main'>Play Station 5</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='news-list-games'>
                        <div className='news-img'><img alt='' src='https://static1.srcdn.com/wordpress/wp-content/uploads/2020/10/Crash-Bandicoot-4-Featured-Image.jpg' /></div>
                        <div className='news-info'>
                            <div className='news-info-main'>
                                <div className='news-description'>
                                    <div className='description'>Crash Bandicoot 4: It's About Time</div>
                                </div>
                                <div className='available'>
                                    <div className='available-main'>Disponible</div>
                                </div>
                                <div className='brand'>
                                    <div className='brand-blank'></div>
                                    <div className='brand-main'>Play Station 4 & 5</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
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
            <div className='portatil'>
                <div className='portatil-container'>
                    <img className='portatil-img' alt='' src='https://i.ytimg.com/vi_webp/NmgOWKQj5-Y/maxresdefault.webp'/>
                </div>
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
                                <button className='button-product'>Ver producto</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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