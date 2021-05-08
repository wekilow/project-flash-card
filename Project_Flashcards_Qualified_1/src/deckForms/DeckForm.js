import React from "react";

function DeckForm({ handleChange, deck }) {

    return (
        <div className="form-group">
                    <div className="row">
                        <label htmlFor="name" className="col-form-label"> Deck Name: </label>
                        <div className="col">
                            <input
                                id="name"
                                type="text"
                                name="name"
                                className="form-control"
                                onChange={handleChange}
                                value={deck.name}
                            />
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <label htmlFor="description" className="col-form-label">Description: </label>
                        <div className="col">
                            <textarea
                                className="form-control"
                                id="description"
                                name="description"
                                rows="5"
                                onChange={handleChange}
                                value={deck.description}
                            />
                        </div>
                    </div>
                </div>
    )
}

export default DeckForm;
