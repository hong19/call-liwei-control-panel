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
        this.state = {
            number: 0
        };
    }

    increase() {
        store.dispatch({
            type: 'INCREMENT'
        });
    }

    decrease() {
        store.dispatch({
            type: 'DECREMENT'
        });
    }

    render() {
        return (
            <div>
                <h1>{this.props.number}</h1>
                Count APP
                <button onClick={this.increase.bind(this)}>
                    + 1
                </button>
                <button onClick={this.decrease.bind(this)}>
                    - 1
                </button>
            </div>
        );
    }

}

store.subscribe(() => {
    render();
    console.log(store.getState());
});

ReactDOM.render(<CountApp />, document.getElementById('root'));

const render = () => {
    ReactDOM.render(
        <CountApp number={store.getState()}/>,
        document.getElementById('root')
    );
};





