import React from 'react'
import './BannerImage.css'

const BannerImage = ({backgroundImage}) => {
    return (
        <header className="banner-image" style={{ backgroundImage: `url(${backgroundImage})`}}>
            
        </header>
    )
}

export default BannerImage
