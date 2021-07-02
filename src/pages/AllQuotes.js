import { useEffect } from 'react';
import QuoteList from '../components/quotes/QuoteList';

import useHttp from '../hooks/use-http';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import NoQuotesFound from '../components/quotes/NoQuotesFound';
import { getAllQuotes } from '../lib/api';

const AllQuote = () => {
    const {sendRequest, status, data: loadQuotes, error} = useHttp(getAllQuotes, true);

    useEffect(() => {
        sendRequest();
    }, [sendRequest]);

    if(status === 'pending'){
        return (
            <div className='centered'>
                <LoadingSpinner />
            </div>
        )
    }

    if(error) {
        return <p className='centerd focused'>{error}</p>
    }

    if(status === 'completed' && (!loadQuotes || loadQuotes.length === 0)){
        return <NoQuotesFound />
    }

    return <QuoteList quotes={loadQuotes}/>
}

export default AllQuote;