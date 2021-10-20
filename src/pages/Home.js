import React, {useState} from 'react'
import MainPageLayout from '../components/MainPageLayout'
import { apiGet } from '../misc/config';

const Home = () => {

    // get use state and update function for inputs and results
    // defaultvalue set to empty string and null
    const [input, setInput] = useState('');
    const [results, setResults] = useState(null);

    // update state of user input field
    const onInputChange = (ev) => {
        setInput(ev.target.value);
    }

    // event occurs when user clicks search button
    const onSearch = () => {
        apiGet(`/search/shows?q=${input}`).then(result => {
            setResults(result);
        })
    }

    // enables enter key (code 13) to be pressed to search in addition to hitting the search button
    const onKeyDown = (ev) => {
        if (ev.keyCode === 13) {
            onSearch()
        }
    }
        
    // pulls data from API to show user search results
    const renderResults = () => {
        // nothing was entered in search bar
        if (results && results.length === 0) {
            return <div>No results</div>
        }
        // something was entered - find matching values
        if (results && results.length > 0) {
            return (
                <div>
                    {results.map( (item) => (
                        <div key={item.show.id}>{item.show.name}</div> 
                    ))}
                </div>
            );
        }
        // default
        return null;
    };

    return (
        <MainPageLayout>
            <input type="text" onChange={onInputChange} onKeyDown={onKeyDown} value={input}/>
            <button type="button" onClick={onSearch}>Search</button>
            {renderResults()}
        </MainPageLayout>
    )
}

export default Home
