import {useState} from 'react'
import {Link} from 'react-router-dom'
import './Home.css'

const Home = () => {
    const [greetings, setGreetings] = useState(["Hi !", "My Name Is Flo", "I'm A Web Developper"])
    
    // useEffect(() => {
    //     setGreetings("Hi !", "My Name Is Flo", "I'm A Web Developper")
    // }, [])

    const replaceGreetings = (index) => {
        switch(index){
            case 0 :
                greetings[0] = <Link to='/works'>Projects</Link>;
                setGreetings([...greetings], greetings[0]);
                break;
            case 1 :
                greetings[1] = <Link to='/about'>About Me</Link>;
                setGreetings([...greetings], greetings[1]);
                break;
            case 2 :
                greetings[2] = <Link to='/contact'>Contact Me</Link>;
                setGreetings([...greetings], greetings[2]);
                break;
            default :
                return;
        }
    }
    console.log(greetings);
    return (
        <main className="home-page d-flex justify-content-center align-items-center w-100" >
            <section className="px-4 pb-sm-4 d-flex flex-column justify-content-center justify-content-sm-end align-items-start align-items-sm-center w-100 h-100">
                {greetings.map((greeting, index) => 
                    <h2 
                        key={index} 
                        onMouseEnter={(e) => (window.innerWidth > 768 && replaceGreetings(index))}
                        onClick={(e) => (window.innerWidth < 768 && replaceGreetings(index))}
                    >
                        {greeting}
                    </h2> 
                        
                    )}
            </section>
        </main>
    )
}

export default Home
