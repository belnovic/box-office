import React, {useState} from 'react'
import MainPageLayout from '../components/MainPageLayout'

const Home = () => {

    // get use state and update function
    // defaultvalue set to empty string
    const [input, setInput] = useState('');

    // update state of user input field
    const onInputChange = (ev) => {
        setInput(ev.target.value);
    }

    // event occurs when user clicks search button
    const onSearch = () => {
        // https://api.tvmaze.com/search/shows
        fetch(`https://api.tvmaze.com/search/shows?q=${input}`)
            .then(r => r.json())
            .then(result => {
                console.log(result)
        })
    }

    // enables enter key (code 13) to be pressed to search in addition to hitting the search button
    const onKeyDown = (ev) => {
        if (ev.keyCode === 13) {
            onSearch()
        }
    }

    return (
        <MainPageLayout>
            <input type="text" onChange={onInputChange} onKeyDown={onKeyDown} value={input}/>
            <button type="button" onClick={onSearch}>Search</button>
        </MainPageLayout>
    )
}

export default Home
