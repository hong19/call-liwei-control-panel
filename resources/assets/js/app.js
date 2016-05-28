/**
 * Created by hong on 2016/5/26.
 */
import {createStore, combineReducers} from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';


class App extends React.Component {
    render() {
        return (
            <div>
                hello world
            </div>
        );
    }
}


ReactDOM.render(
    <App />,
    document.getElementById('root')
);



