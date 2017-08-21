import React from 'react';
import ReactDOM from 'react-dom';
import GifList from './components/GifList';
import GifModal from './components/GifModal';
import SearchBar from './components/SearchBar';
import request from 'superagent';
import './styles/app.css';

class App extends React.Component {
    constructor() {
        
        super();

        this.state = {
            gifs: [],
            selectedGif: null,
            modalIsOpen: false
        }

        //Needed for binding 'this' if handleTermChange is NOT an arrow function
        //this.handleTermChange = this.handleTermChange.bind(this);
    }

    openModal(gif) {
        this.setState({
            selectedGif: gif,
            modalIsOpen: true
        });
    }

    closeModal() {
        this.setState({
            selectedGif: null,
            modalIsOpen: false
        });   
    }


    //It inherits the lexical this of its parent scope so we don't run into issues with binding.
    handleTermChange = (term) => {
        const url = `http://api.giphy.com/v1/gifs/search?q=${term.replace(/\s/g, '+')}&api_key=dc6zaTOxFJmzC`;

        request.get(url, (err, res) => {
            this.setState({ gifs: res.body.data });
        });
    };

    render() {
        return (
            <div>
                <SearchBar onTermChange={this.handleTermChange}/>
                <GifList  gifs={this.state.gifs}
                          onGifSelect={selectedGif => this.openModal(selectedGif)} />
                <GifModal modalIsOpen={this.state.modalIsOpen}
                          selectedGif={this.state.selectedGif}
                          onRequestClose={ () => this.closeModal() } />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));