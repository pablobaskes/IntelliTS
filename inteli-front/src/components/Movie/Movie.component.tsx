import { Link } from 'wouter'
interface MovieProps {
    title: string,
    id: number,
    poster_path: string
}
export default function Movie({ title, id, poster_path }: MovieProps) {
    return (
        <div>
            <Link href={`/movie/${id}`}>
                <img src={poster_path} alt={title} />
            </Link>
            <h5>
                <Link to={`/movie/${id}`}>{title}</Link>
            </h5>
            
        </div>
    )
}