import React, {useEffect, useState} from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import StudyCard from "./StudyCard";
import NotEnoughCards from "./NotEnoughCards";

function Study() {
    const { deckId } = useParams();
    const [deck, setDeck] = useState({});
    
    useEffect(() => {
        const loadDeck = async () => {
          const loadedDeck = await readDeck(deckId);
          setDeck(() => loadedDeck);
        };
        loadDeck();
    }, [deckId]);
    

    if (!deck.cards) {
        return <p>Loading...</p>
    }
    
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
                            Study
                        </li>
                    </ol>
                </nav>
            <h2>Study: {deck.name}</h2>
            <br />
            {deck.cards.length >= 3 
                    ? <StudyCard cardsInDeck={deck.cards} /> 
                    : <NotEnoughCards deckId={deckId} cardsInDeck={deck.cards} />
            }
        </div>
    )
}

export default Study;
