import React from 'react'
import {FRONTEND} from '../../endpoints'

const AboutSection = ({about}) => {
    console.log(about)
    return (
        <section className="about-section">
            <div className="d-flex d-flex flex-column-reverse flex-sm-row justify-content-around align-items-center align-items-sm-around flex-wrap mt-5">
                <div className="about-description px-4 mt-4">
                    <p className="text-justify"><span>❝</span>{about.description}<span>❞</span></p>
                </div>
                <div id="profile-pic-outer">
                    <img id="profile-pic" src={`${FRONTEND}/uploads/${about.name}`} alt={`${about.alt}`}/>
                </div>
            </div>
            
        </section>  
    )
}

export default AboutSection
