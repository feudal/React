import React, {useEffect, useState} from 'react';
import {Link, Route, useParams, useRouteMatch} from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import useHttp from "../hooks/use-http";
import {getSingleQuote} from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const allQuotesData = [
    {
        id: 'q1',
        author: 'Dimon',
        text: 'I\'m very smart',
    },
    {
        id: 'q2',
        author: 'Alisa',
        text: 'She is very beautiful',
    }
]

const QuoteDetails = () => {
    const match = useRouteMatch();
    const params = useParams();

    const {sendRequest, status, data: loadedQuote, error} = useHttp(getSingleQuote, true);
    const {quoteId} = params;

    useEffect(() => {
        sendRequest(quoteId);
    }, [sendRequest, quoteId]);

    if(status === 'pending') {
        return (
            <div className='centered'>
                <LoadingSpinner/>
            </div>
        )
    }

    if(error) {
        return <p className='centered'>{error}</p>
    }

    if(!loadedQuote.text) {
        return <p>Quote not found!</p>
    }

    // const quote = allQuotesData.find((quote) => {
    //     return (quote.id === params.quoteId);
    // });

    return (
        <>
            <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author}/>
            <Route path={`${match.path}`} exact>
                <div className='centered'>
                    <Link
                        className='btn--flat'
                        to={`${match.url}/comments`}>
                        Load Comments
                    </Link>
                </div>
            </Route>
            <Route path={`${match.path}/comments`}>
                <Comments/>
            </Route>
        </>
    );
};

export default QuoteDetails;
