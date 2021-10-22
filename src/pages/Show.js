import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router'
import { apiGet } from '../misc/config';

const Show = () => {

    const { id } = useParams();
    const [show, setShow] = useState(null);

    // useEffect runs callback function whenever something inside array changes
    // 
    useEffect(()=> {

        apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`).then(results => {
            setShow(results);
        })

        // cleanup function - is run right before the next callback function (right before component unmounts)
        return () => {

        }
    }, [id]);

    console.log('show', show);

    return (
        <div>
            This is a show page
        </div>
    )
}

export default Show
