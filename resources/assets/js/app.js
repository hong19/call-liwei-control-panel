/**
 * Created by hong on 2016/5/19.
 */
import {createStore, combineReducers} from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';

const counter = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
};

const store = createStore(counter);

class CountApp extends React.Component {
    constructor() {
        super();
    }

    increment() {
        store.dispatch({
            type: 'INCREMENT'
        });
    }


    render() {
        return (
            <div>
                Count APP
                <button onClick={this.increment.bind(this)}>
                    + 1
                </button>
            </div>
        );
    }
}


store.subscribe(() => {
    console.log(store.getState());
});

ReactDOM.render(<CountApp />, document.getElementById('root'));

const render = () => {
    ReactDOM.render(
        <CountApp />,
        document.getElementById('root')
    );
};





