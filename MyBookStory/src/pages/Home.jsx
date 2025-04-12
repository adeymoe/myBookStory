import React from 'react'
import BookCollection from '../components/BookCollection'
import Carousel from '../components/Carousel'
import AboutUs from '../components/AboutUs'


const Home = () => {
  return (
    <div>
        <Carousel/>
        <BookCollection/>
        <AboutUs/>
    </div>
  )
}

export default Home