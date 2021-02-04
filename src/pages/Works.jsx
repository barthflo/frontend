import {useState, useEffect} from 'react'
import Axios from 'axios'
import {BACKEND, FRONTEND} from '../endpoints'
import BannerImage from '../components/BannerImage/BannerImage'
import WorkSection from '../components/Works/WorkSection';
import './Works.css'

const Works = () => {

    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchProjects = async () => {
            await Axios.get(`${BACKEND}/projects/with-tags-and-pics`)
                        .then(res => {
                            console.log({status: res.status, message: res.statusText})
                            setProjects(res.data);
                        })
                        .catch(err => {
                            console.log(err);
                        })
        }
        fetchProjects();
        setIsLoading(false);
    }, [])

    return (
        <main className="works-page w-100 pb-5" >
            <BannerImage backgroundImage={`${FRONTEND}/assets/mountains.webp`}/>
            <h2 className="page-title">Works</h2>
            {isLoading ? "Loading ...." : 
                projects.map((project, index) => <WorkSection key={index} project={project} />)
            }
        </main>
    )
}

export default Works
