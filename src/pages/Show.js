import React, {useEffect, useReducer} from 'react'
import { useParams } from 'react-router'
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

    const [state, dispatch] = useReducer(reducer, initialState);

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

    console.log(state);

    return (
        <div>
            This is a show page
        </div>
    )
}

export default Show
