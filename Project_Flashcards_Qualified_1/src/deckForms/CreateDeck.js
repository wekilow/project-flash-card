import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api/index";
import DeckForm from "./DeckForm"

function CreateDeck() {
    const history = useHistory();
    const initialForm = {
        name: '',
        description: ''
    }
    const [newDeck, setNewDeck] = useState({...initialForm});

    const handleChange = ({target}) => {
        setNewDeck({ ...newDeck, [target.name]: target.value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const addDeck = await createDeck(newDeck);
        history.push(`/decks/${addDeck.id}`);
    }

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">
                            Home
                        </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Create Deck
                    </li>
                </ol>
                
            </nav>
            <h2>Create Deck</h2>
            <br />
            <form onSubmit={handleSubmit}>
                <DeckForm deck={newDeck} handleChange={handleChange} />
                <div className="float-right">
                    <Link to="/">
                        <button className="btn btn-secondary mr-2">
                            Cancel
                        </button>
                    </Link>
                    <button className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default CreateDeck;
