import {useState, useEffect} from 'react'
import Axios from 'axios'
import {BACKEND, FRONTEND} from '../endpoints'
import BannerImage from '../components/BannerImage/BannerImage'
import AboutSection from '../components/About/AboutSection'
import './About.css'

const About = () => {

    const [about, setAbout] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchAbout = async () => {
            await Axios.get(`${BACKEND}/about/with-pic`)
                        .then(res => {
                            console.log({status: res.status, message: res.statusText})
                            setAbout(res.data);
                            setIsLoading(false);
                        })
                        .catch(err => {
                            console.log(err);
                            setIsLoading(false);
                        })
        }
        fetchAbout();
        
    }, [])

    return (
        <main className="about-page w-100 pb-5" >
            <BannerImage backgroundImage={`${FRONTEND}/assets/mountains.webp`}/>
            <h2 className="page-title">About Me</h2>
            {isLoading ? 
                "Loading...." 
                :
                about.map((item, index) => <AboutSection about={item}/>)
                } 
        </main>
    )
}

export default About
