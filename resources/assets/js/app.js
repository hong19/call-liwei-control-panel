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


const visibilityFilter = (state = 'SHOW_ALL',
                          action) => {
    switch (action.type) {

        case 'SET_VISIBILITY_FILTER':
            return action.filter;
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

const todoApp = (state = {}, action) => {
    return {
        todos: todos(state.todos, action),
        visibilityFilter: visibilityFilter(state.visibilityFilter, action)
    };
};

const store = createStore(todoApp);

store.dispatch({
    type: 'ADD_TODO',
    id: 1,
    text: 'hello world'
});

console.log(store.getState());











