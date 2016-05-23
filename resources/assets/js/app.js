/**
 * Created by hong on 2016/5/19.
 */
import {createStore, combineReducers} from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';


const todos = (state = [], action) => {
    switch (action) {
        case 'ADD_TODO':
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    completed: false
                }
            ];
        case 'TOGGLE_TODO':
            return state.map(todo => {
                if (todo.id !== action.id) {
                    return todo;
                } else {
                    return {
                        ...todo,
                        completed: !todo.completed
                    };
                }
            });

        default:
            return state;
    }

};










