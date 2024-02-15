import React, { useEffect, useState } from 'react';
import axios from "axios";
import "./Deck.css";

const API_BASE_URL = "https://deckofcardsapi.com/api/deck";

const Deck = () => {
    const [deck, setDeck] = useState(null);
    const [drawn, setDrawn] = useState([]);
    const [isShuffling, setIsShuffling] = useState(false);

    useEffect(() => {
        async function fetchAPI() {
            try {
                const res = await axios.get(`${API_BASE_URL}/new/shuffle/?deck_count=1`);
                setDeck(res.data);
            } catch (e) {
                console.log(e)
            }
        }
        fetchAPI();
    }, []);

    const drawCard = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/${deck.deck_id}/draw/?count=1`);
            if (res.data.remaining === 0) {
                alert("No more cards remaining!");
                return;
            }
            setDrawn(previous => [...previous, res.data.cards[0]]);
        } catch (e) {
            console.log(e);
        }
    };

    const shuffleDeck = async () => {
        try {
            setIsShuffling(true);
            const res = await axios.get(`${API_BASE_URL}/${deck.deck_id}/shuffle/`);
            setDeck(res.data);
            setIsShuffling(false);
            setDrawn([])
        } catch (e) {
            setIsShuffling(false);
            console.log(e);
        }
    };

    return (
        <div>
            <h1>Deck of Cards</h1>
            <button onClick={drawCard}>Draw Card</button>
            <button onClick={shuffleDeck} disabled={isShuffling}>Shuffle Deck</button>
            <ul>
                {drawn.map(card => (
                    <li key={card.code}>
                        <img src={card.image} alt={card.code} style={{width:"100px"}}/>
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default Deck