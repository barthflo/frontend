import {useState, useEffect} from 'react'
import Axios from 'axios'
import {BACKEND, FRONTEND} from '../endpoints'
import BannerImage from '../components/BannerImage/BannerImage'
import ContactForm from '../components/Contact/ContactForm'
import SocialMedia from '../components/Contact/SocialMedias'
import './Contact.css'

const Contact = () => {

    const [socialMedias, setSocialMedias] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchAbout = async () => {
            await Axios.get(`${BACKEND}/social-media`)
                        .then(res => {
                            console.log({status: res.status, message: res.statusText})
                            setSocialMedias(res.data);
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
        <main className="contact-page w-100 pb-5" >
            <BannerImage backgroundImage={`${FRONTEND}/assets/mountains.webp`}/>
            <h2 className="page-title">Contact Me</h2>
            <div className="d-flex flex-column flex-sm-row justify-content-sm-around align-items-center">
                <ContactForm />
                {isLoading ? "Loading ...." :
                <SocialMedia  socialMedias={socialMedias}/>
                }
            </div>
        </main>
    )
}

export default Contact

