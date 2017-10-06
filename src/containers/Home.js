
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import GifList from '../components/GifList';
import GifModal from '../components/GifModal';
import SearchBar from '../components/SearchBar';
import '../styles/app.css';

class Home extends React.Component {
    render() {
        return (
            <div>
                <SearchBar onTermChange={this.props.actions.requestGifs} />

                <GifList
                    gifs={this.props.gifs}
                    onGifSelect={selectedGif => this.props.actions.openModal({ selectedGif })}
                    onFavoriteSelect={selectedGif => this.props.actions.favoriteGif({ selectedGif })}
                    onFavoriteDeselect={selectedGif => this.props.actions.unfavoriteGif({ selectedGif })}
                    isAuthenticated={this.props.authenticated} />

                <GifModal
                    modalIsOpen={this.props.modalIsOpen}
                    selectedGif={this.props.selectedGif}
                    onRequestClose={() => this.props.actions.closeModal()} />
            </div>
        );
    }
}

/* 
 * links the gifs from GifsReducer to this.props.gifs on the Home component
 * can access the state through the connect()() call
 */
function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        gifs: state.gifs.data,
        modalIsOpen: state.modal.modalIsOpen,
        selectedGif: state.modal.selectedGif
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

/* 
 * allows the Home component to subscribe to the Redux store update;
 * whenever the store changes, mapStateToProps is called
 * mapStateToProps returns a plain object, and it then becomes available on the Home component as props 
 * The <Provider> made the Redux store available to any connect()() calls
 */
export default connect(mapStateToProps, mapDispatchToProps)(Home);