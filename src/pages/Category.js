import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { TopNavbar } from '../shared/TopNavbar';
import { MyCenteredModal } from '../components/MyCenteredModal';
import {destination} from '../mock/destinations'
import { Card } from 'react-bootstrap';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";


export const Category = () => {
    const {slug} = useParams();
    const [tours, setTours] = useState([])
    useEffect(()=>{
        fetch(`https://api.thetripguru.com/api/tours/?location__city__slug=&categories__url=${slug}&min_price=0&max_price=2475`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setTours(data.data)
        })
    },[])

  
  return (
    <div>
        <TopNavbar/>
        <section className='text-center container'>
            <MyCenteredModal destination = {destination}/>
            <div className='mt-5'>
            <h5 className='text-secondary mb-0 pb-0'>Showing</h5>
            <h1>Experiences in {slug}</h1>
            </div>

            <div className='d-flex justify-content-between'>
                <h5 className='text-secondary'>{tours.length} tours available</h5>
                <div>
                    <button>Sort by</button>
                    <button>Filter</button>
                </div>
            </div>

            <div className='row mx-md-3 mt-5 mx-lg-5'>
          {
            tours.map((tour, index) => {
              const url = 'https://res.cloudinary.com/thetripguru/image/upload/f_auto,c_limit,w_720,q_auto/' + tour.thumbnail
              console.log(url)
              if (index < 8)
                  
                  return (
                    <div className='col-lg-3 col-md-6 col-12 mb-4'>
                      {/* <div className='card border-0' style={{ height: 'auto'}}>
                        <div className='card-body d-flex align-items-end justify-content-center rounded'  style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${url})`, backgroundSize: 'cover'}}>
                        <div>
                          <h4 className='text-white pb-2'>{favourite.title}</h4>
                          <h5 className='text-white border rounded-pill px-3'>Discover {favourite.tour_count} tours</h5>
                        </div> 
                      </div>
                    </div> */}
                    <Card>
                        <Card.Img variant="top" src={url} style={{height:'16rem'}} />
                        <Card.Body>
                        <Card.Title>{tour.title.length>40 ? tour.title.slice(0,40)+'...' : tour.title}</Card.Title>
                        <Card.Text>
                            <h5 className='text-secondary mt-3'>{tour.location.destination_name}, {tour.location.name}  </h5>
                        </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                         <div className='d-flex justify-content-between text-secondary align-items-center'>
                            <div className='d-flex flex-column align-items-start'>
                                <h6>from</h6>
                                <h6><span className='fw-bolder fs-4 text-dark'>${tour.price_details.price}</span>/person</h6>
                            </div>
                            <div className='fs-3'>
                                <MdOutlineKeyboardArrowRight />

                            </div>
                         </div>
                        </Card.Footer>
                    </Card>
                  </div>
                  )
              })
            }
        </div>
            
        </section>
    </div>
  )
}