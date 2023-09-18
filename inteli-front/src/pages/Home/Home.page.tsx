import RecommendationsComponent from "../../components/RecommendedMovies/RecommendedMovies"
import Slider from "../../components/Slider/Slider.component"

const Home = () => {
    const title = "For Your Page"
    
    return (
        <>
            <Slider></Slider>
            <h1>{title}</h1>
            <RecommendationsComponent></RecommendationsComponent>
        </>
    )
}
export default Home