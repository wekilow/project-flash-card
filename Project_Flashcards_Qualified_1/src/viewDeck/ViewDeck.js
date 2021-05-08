import React, {useState, useEffect} from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { deleteDeck, readDeck } from "../utils/api/index";
import CardList from "./CardList"

function ViewDeck() {
    const { deckId } = useParams();
    const history = useHistory();

    const [deck, setDeck] = useState({});
    
    useEffect(() => {
        const abortController = new AbortController();
        readDeck(deckId, abortController.signal).then(setDeck);

        return () => abortController.abort();
    }, [deckId]);

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Delete this deck?\nYou will not be able to recover it.");
        console.log("Deleting Deck", deck.id)
        if (confirmDelete) {
            await deleteDeck(deck.id);
            history.push('/');
        }
    }



    if (!deck.id) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <nav aria-label='breadcrumb'>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item text-primary"><Link to='/'>Home</Link></li>
                    <li className="breadcrumb-item active" aria-current='page'>{deck.name}</li>
                </ol>
            </nav>
            <h2>
                {deck.name}
                <button className="btn btn-danger float-right" onClick={handleDelete}>Delete</button>
            </h2>
            <p>{deck.description}</p> 
            <Link to={`/decks/${deck.id}/edit`}>
                <button className="btn btn-primary mr-2 mb-2">Edit</button>
            </Link>
            <Link to={`/decks/${deck.id}/study`}>
                <button className="btn btn-secondary mr-2 mb-2">Study</button>
            </Link>
            <br /><br />
            <CardList deck={deck} />
        </div>
    )
}

export default ViewDeck;
