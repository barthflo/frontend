import React from 'react'
import {FRONTEND} from '../../endpoints'
import {Parallax} from 'react-scroll-parallax'
import './WorkSection.css'
import 'html5-device-mockups/dist/device-mockups.min.css'
import { MacbookPro, IPhone7 } from 'react-device-mockups'
import {Carousel} from 'react-responsive-carousel' 
import 'react-responsive-carousel/lib/styles/carousel.css'


const WorkSection = ({project}) => {
    console.log(project)
    return (
        <section className="work-section d-flex flex-column align-items-center p-3" >
            <Parallax y={[-50, -20]}>
                <h3 className="mt-4 mb-5">{project.title}</h3>
            </Parallax>
            <div className="d-flex flex-column-reverse flex-sm-row-reverse justify-content-center align-items-center">
                <Parallax y={[20, -10]} className="px-3 text-center" tagOuter="div">
                    <ul className="list-unstyled list-inline mb-0">
                        <h4>Technical Stack :</h4> 
                        {project.tags && project.tags.map((tag, index) => <li className="list-inline-item" key={index}><p className="text-capitalize">{tag}</p></li> )}
                    </ul>
                    {project.link_url &&
                    <div className={`button-project`}>
                        <div id="underline"></div>
                        <a href={project.link_url} target="_blank" rel="noreferrer" title={project.title}>See the project</a>
                    </div>
                    }
                </Parallax>
                <MacbookPro className="mock-up" orientation='landscape' color='black'>
                    <Carousel 
                        showThumbs={false} 
                        autoPlay={true} 
                        infiniteLoop={true} 
                        showArrows={false} 
                        showStatus={false}
                        showIndicators={false} 
                    >
                    {project.pictures_name && 
                    project.pictures_name
                        .filter(picture => picture.includes("desktop"))
                        .map((picture, index) => 
                                <img key={index} 
                                    src={`${FRONTEND}/uploads/${picture}`} 
                                    alt={picture}
                                    style={ {
                                        width: '100%',
                                        height: '100%',
                                        margin: 0,
                                        objectFit: "contain"
                                    } }
                                />
                            )
                        }
                    </Carousel>
                </MacbookPro>
                {window.innerWidth >768 ?
                <Parallax y={[-5, 5]}>
                    <IPhone7 height={250} className="mock-up" orientation="portrait" color="black">
                        <Carousel 
                            showThumbs={false} 
                            autoPlay={true} 
                            infiniteLoop={true} 
                            showArrows={false} 
                            showStatus={false} 
                            showIndicators={false}
                        >
                        {project.pictures_name && 
                        project.pictures_name
                            .filter(picture => picture.includes("mobile"))
                            .map((picture, index) => 
                                <img key={index} 
                                    src={`${FRONTEND}/uploads/${picture}`} 
                                    alt={picture}
                                    style={ {
                                        width: '100%',
                                        height: '100%',
                                        margin: 0,
                                        objectFit: "contain"
                                    } }
                                />
                            )
                        }
                        </Carousel>
                    </IPhone7>
                    </Parallax>
                    :
                    null
                }
            </div>
            <Parallax y={[10, -10]}>
            <p className="px-3 mt-4 project-description">{project.description}</p>
            </Parallax>
        </section>
    )
}

export default WorkSection
