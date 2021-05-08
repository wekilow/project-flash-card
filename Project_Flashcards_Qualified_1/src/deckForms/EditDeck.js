import React, {useState, useEffect} from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api/index";
import DeckForm from "./DeckForm";

function EditDeck() {
    const history = useHistory();
    const { deckId } = useParams();

    const initialForm = {
        name: '',
        description: ''
    }
    const [editDeck, setEditDeck] = useState({ ...initialForm });

    useEffect(() => {
        const abortController = new AbortController();

        const getDeck = async () => {
            const deck = await readDeck(deckId, abortController.signal);
            setEditDeck({
                id: deck.id,
                name: deck.name,
                description: deck.description
            });
        }

        getDeck();
        return () => abortController.abort();
    }, [deckId])

    const handleChange = ({target}) => {
        setEditDeck({ ...editDeck, [target.name]: target.value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const updatedDeck = await updateDeck(editDeck);
        history.push(`/decks/${updatedDeck.id}`);
      };

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">
                            Home
                        </Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to={`/decks/${deckId}`}>
                            {editDeck.name}
                        </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Edit Deck
                    </li>
                </ol>
                
            </nav>
            <h2>Edit Deck: {editDeck.name}</h2>
            <br />
            <form onSubmit={handleSubmit}>
                <DeckForm deck={editDeck} handleChange={handleChange} />
                <div className="float-right">
                    <Link to="/">
                        <button className="btn btn-secondary mr-2">
                            Cancel
                            </button>
                    </Link>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default EditDeck;
