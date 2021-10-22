import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router'
import { apiGet } from '../misc/config';

const Show = () => {

    const { id } = useParams();
    const [show, setShow] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // useEffect runs callback function whenever something inside array changes
    // whenever show id changes, retrieve a new show with new id
    useEffect(()=> {

        let isMounted = true;

        apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`).then(results => {
            setTimeout(() => {
                if (isMounted){
                    setShow(results);
                    setIsLoading(false)
                }
            }, 2000);
        }).catch(err => {
            if (isMounted) {
                setError(err.message);
                setIsLoading(false);
            }
        });

        // cleanup function - is run right before the next callback function (right before component unmounts)
        return () => {
            isMounted = false;
        }
    }, [id]);

    console.log(show);

    if (isLoading) {
        return <div>Data is being loaded</div>
    }

    if (error) {
        return <div>Error occurred</div>
    }

    return (
        <div>
            This is a show page
        </div>
    )
}

export default Show
