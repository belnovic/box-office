import React, {useState} from 'react'
import MainPageLayout from '../components/MainPageLayout'
import { apiGet } from '../misc/config';

const Home = () => {

    // get use state and update function for inputs and results
    // defaultvalue set to empty string and null
    const [input, setInput] = useState('');
    const [results, setResults] = useState(null);
    const [searchOption, setSearchOption] = useState('shows');

    const isShowsSearch = searchOption === 'shows';

    // update state of user input field
    const onInputChange = (ev) => {
        setInput(ev.target.value);
    }

    // event occurs when user clicks search button
    const onSearch = () => {
        apiGet(`/search/${searchOption}?q=${input}`).then(result => {
            setResults(result);
        })
    }

    // enables enter key (code 13) to be pressed to search in addition to hitting the search button
    const onKeyDown = (ev) => {
        if (ev.keyCode === 13) {
            onSearch()
        }
    }

    const onRadioChange = (ev) => {
        setSearchOption(ev.target.value);
    }
        
    // pulls data from API to show user search results
    const renderResults = () => {
        // nothing was entered in search bar
        if (results && results.length === 0) {
            return <div>No results</div>
        }
        // something was entered - find matching values
        if (results && results.length > 0) {
            // if shows was the button selected, then map the results to shows
            return results[0].show ? results.map( (item) => (
                <div key={item.show.id}>{item.show.name}</div> 
            // otherwise map the results to actors
            )) : results.map( (item) => (
                <div key={item.person.id}>{item.person.name}</div> 
            ))

        }
        // default
        return null;
    };

    return (
        <MainPageLayout>
            <input type="text" placeholder="Search for something" onChange={onInputChange} onKeyDown={onKeyDown} value={input}/>
            <div>
                <label htmlFor="shows-search">
                    Shows <input id="shows-search" type="radio" value="shows" checked={isShowsSearch} onChange={onRadioChange}/>
                </label>
                <label htmlFor="actors-search">
                    Actors <input id="actors-search"type="radio" value="people" checked={!isShowsSearch} onChange={onRadioChange}/>
                </label>
            </div>
            <button type="button" onClick={onSearch}>Search</button>
            {renderResults()}
        </MainPageLayout>
    )
}

export default Home
