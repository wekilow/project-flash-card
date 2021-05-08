import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api/index";
import CardForm from "./CardForm";

function AddCard() {
    const { deckId } = useParams();

    const initialForm = {
        front: '',
        back: '',
        deckId: deckId
    }

    const [formData, setFormData] = useState({...initialForm});
    const [deck, setDeck] = useState({});

    useEffect( () => {
        const abortController = new AbortController();
        readDeck(deckId, abortController.signal).then(setDeck);

        return () => abortController.abort();
    }, [deckId]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        await createCard(deckId, formData);
        setFormData({...initialForm})
    }

    const done =
        (
            <Link to={`/decks/${deckId}`}>
                <button className="btn btn-secondary mr-2">
                     Done
                 </button>
            </Link>
        )
   
    return (
        <div>
             <nav aria-label='breadcrumb'>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item text-primary">
                            <Link to='/'>Home</Link>
                        </li>
                        <li className="breadcrumb-item text-primary">
                            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current='page'>
                            Add Card
                        </li>
                    </ol>
                </nav>
            <h2>{deck.name}: Add Card</h2>
            <br />
            <CardForm setFormData={setFormData} formData={formData} handleSubmit={handleSubmit} back={done} />
        </div>
    )
}

export default AddCard;
