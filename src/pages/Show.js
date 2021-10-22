/* eslint-disable no-underscore-dangle */
import React, {useEffect, useReducer} from 'react'
import { useParams } from 'react-router'
import Cast from '../components/show/Cast';
import Details from '../components/show/Details';
import Seasons from '../components/show/Seasons';
import { InfoBlock, ShowPageWrapper } from './Show.styled';
import ShowMainData from '../components/show/ShowMainData';
import { apiGet } from '../misc/config';

const reducer = (prevState, action) => {
    switch(action.type) {
        // when fetch is a success, update isloading to true and show to fetched show
        case 'FETCH_SUCCESS': {
            return {isLoading: false, error: null, show: action.show}
        }
        case 'FETCH_FAILED': {
            return {...prevState, isLoading: false, error: action.error}
        }
        default: return prevState
    }
}

const initialState = {
    show: null,
    isLoading: true,
    error: null
}

const Show = () => {

    const { id } = useParams();

    const [{show, isLoading, error}, dispatch] = useReducer(reducer, initialState);

    // useEffect runs callback function whenever something inside array changes
    // whenever show id changes, retrieve a new show with new id
    useEffect(()=> {

        let isMounted = true;

        apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`).then(results => {
            setTimeout(() => {
                if (isMounted){
                    dispatch({type: 'FETCH_SUCCESS', show: results})
                }
            }, 2000);
        }).catch(err => {
            if (isMounted) {
                dispatch({type: 'FETCH_FAILED', error: err.message})
            }
        });

        // cleanup function - is run right before the next callback function (right before component unmounts)
        return () => {
            isMounted = false;
        }
    }, [id]);

    if (isLoading) {
        return <div>Page is loading</div>
    }

    if (error) {
        return <div>Error occured: {error}</div>
    }

    return (
        <ShowPageWrapper>
            <ShowMainData
                image={show.image} 
                rating={show.rating}
                sumary={show.summary}
                tags={show.genres} />
            <InfoBlock>
                <h2>Details</h2>
                <Details 
                    status={show.status}
                    network={show.network}
                    premiered={show.premiered} />
            </InfoBlock>
            <InfoBlock>
                <h2>Seasons</h2>
                <Seasons seasons={show._embedded.seasons} />
            </InfoBlock>
            <InfoBlock>
                <h2>Cast</h2>
                <Cast cast={show._embedded.seasons}/>
            </InfoBlock>
        </ShowPageWrapper>
    )
}

export default Show
