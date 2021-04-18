import React from 'react'
import './BannerImage.css'

const BannerImage = ({backgroundImage}) => {
    return (
        <header className="banner-image">
            <img src={backgroundImage} alt="banner top page"/>
        </header>
    )
}

export default BannerImage
