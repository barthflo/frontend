import {useState, useEffect} from 'react'
import Axios from 'axios'
import {BACKEND, FRONTEND} from '../endpoints'
import BannerImage from '../components/BannerImage/BannerImage'
import './Works.css'

const Works = () => {

    const [projects, setProjects] = useState([]);
    useEffect(() => {
        const fetchProjects = () => {
            Axios.get(`${BACKEND}/projects`)
                 .then(res => {
                     console.log(res)
                 })
                 .catch(err => console.log(err))
        }
        fetchProjects();
    }, [])
    return (
        <main className="works-page d-flex justify-content-center align-items-center w-100">
            <BannerImage backgroundImage={`${FRONTEND}/assets/mountains.webp`}/>
            Works
        </main>
    )
}

export default Works
