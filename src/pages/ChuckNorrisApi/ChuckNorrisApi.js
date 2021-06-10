import {useDispatch, useSelector} from 'react-redux';
import {chuckNorrisApiAction} from "../../actions/chuckNorrisApi.action";


export function ChuckNorrisApi() {
    const {loading, joke, error} = useSelector((state) => state.chuck);
    const loginState = useSelector((state) => state.login);

    console.log(loading)

    const dispatch = useDispatch();

    function onClick() {
        console.log('asd')
        console.log(loginState)
        const token = localStorage.getItem("token")
        console.log(token)
        dispatch(chuckNorrisApiAction.getRandomJoke())
    }

    return (
        <div className="chuckNorrisApi">
            <h1>Bestest jokes ever</h1>
            {loading &&
            <p>Loading!!!!</p>
            }
            {!loading && joke.text &&
            <div>
                <p>{joke.text}</p>
                <img src={joke.img} alt="This is the bestest picture"/>
            </div>
            }
            {error &&
            <p>Lofaszka {error}</p>}
            <button onClick={onClick}>Haha</button>
        </div>
    );
}