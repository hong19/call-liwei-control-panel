/**
 * Created by hong on 2016/5/19.
 */
import {createStore, combineReducers} from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';

const todo = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                id: action.id,
                text: action.text,
                completed: false
            };
        case 'TOGGLE_TODO':
            if (state.id !== action.id) {
                return state;
            } else {
                return state.assign({
                    completed: !state.completed
                });
            }
        default:
            return state;
    }
};


const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return state.concat([
                todo(undefined, action)
            ]);

        case 'TOGGLE_TODO':
            return state.map(t => {
                return todo(t, action);
            });

        default:
            return state;
    }

};

const store = createStore.create(todos);

store.dispatch({
    type: 'ADD_TODO',
    id: 1,
    text: 'ljlsdf'
});

console.log(store.getState());  











