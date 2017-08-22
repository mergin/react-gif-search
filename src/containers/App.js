import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import GifList from '../components/GifList';
import SearchBar from '../components/SearchBar';
import '../styles/app.css';


class App extends React.Component {
    render() {
        return (
            <div>
                <SearchBar onTermChange={this.props.actions.requestGifs} />
                <GifList gifs={ this.props.gifs } />
            </div>
        );
    }
}

/* 
 * links the gifs from GifsReducer to this.props.gifs on the App component
 * can access the state through the connect()() call
 */
function mapStateToProps(state) {
    return {
        gifs: state.gifs.data
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}
 
/* 
 * allows the App component to subscribe to the Redux store update;
 * whenever the store changes, mapStateToProps is called
 * mapStateToProps returns a plain object, and it then becomes available on the App component as props 
 * The <Provider> made the Redux store available to any connect()() calls
 */
export default connect(mapStateToProps, mapDispatchToProps)(App);