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
                return Object.assign({}, state, {
                    completed: !state.completed
                });
            }
        default:
            return state;
    }
};


const visibilityFilter = (state = 'SHOW_ALL', action) => {
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

const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_COMPLETED':
            return todos.filter(
                t => t.completed
            );
        case 'SHOW_ACTIVE':
            return todos.filter(
                t => !t.completed
            );
    }
};

const todoApp = combineReducers({todos, visibilityFilter});

const store = createStore(todoApp);


const FilterLink = ({filter, currentFilter, children}) => {
    if (filter === currentFilter) {
        return <span>{children}</span>;
    }
    return (
        <a href='#'
           onClick={e => {
            e.preventDefault();
            store.dispatch({
                type: 'SET_VISIBILITY_FILTER',
                filter
            });
           }}
        >
            {children}
        </a>
    );
};


const Todo = ({
    onClick,
    completed,
    text
    }) => (
    <li
        onClick={onClick}
        style={{
            textDecoration: completed ?
            'line-through' :
            'none'
        }}
    >
        {text}
    </li>
);

const TodoList = ({
    todos,
    onTodoClick
    }) => (
    <ul>
        {todos.map(todo =>
            <Todo
                key={todo.id}
                {...todo}
                onClick={()=> onTodoClick(todo.id)}
            />
        )}
    </ul>
);


let nextTodoId = 0;
class TodoApp extends React.Component {
    addTodo() {
        store.dispatch({
            type: 'ADD_TODO',
            text: this.input.value,
            id: nextTodoId++
        });
        this.input.value = '';
    }

    render() {
        const {todos, visibilityFilter} = this.props;

        const visibleTodos = getVisibleTodos(
            todos,
            visibilityFilter
        );

        return (
            <div>
                <input ref={node => {
                    this.input = node;
                }}/>
                <button onClick={this.addTodo.bind(this)}>Add Todo</button>
                <TodoList
                    todos={visibleTodos}
                    onTodoClick={id => {
                            store.dispatch({
                                type: 'TOGGLE_TODO',
                                id
                            });
                        }
                    }
                />
                <p>
                    Show:
                    {' '}
                    <FilterLink filter='SHOW_ALL'
                                currentFilter={visibilityFilter}
                    >
                        All
                    </FilterLink>
                    {' '}
                    <FilterLink filter='SHOW_ACTIVE'
                                currentFilter={visibilityFilter}
                    >
                        Active
                    </FilterLink>
                    {' '}
                    <FilterLink filter='SHOW_COMPLETED'
                                currentFilter={visibilityFilter}
                    >
                        Completed
                    </FilterLink>
                </p>
            </div>

        );
    }


}

const render = () => {
    ReactDOM.render(
        <TodoApp
            /*todos={store.getState().todos}
            visibilityFilter={store.getState().visibilityFilter}*/
            {...store.getState()}
        />,
        document.getElementById('root')
    );
};

store.subscribe(render);
render();











