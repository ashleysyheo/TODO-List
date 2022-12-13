import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const TodoItem = (props) => {
  const [editing, setEditing] = useState(false);

  const {
    deleteTodoProps,
    handleChangeProps,
    setUpdate,
    todo,
  } = props;

  const handleEditing = () => {
    setEditing(true);
  };

  const handleUpdatedDone = (event) => {
    if (event.key === 'Enter') {
      setEditing(false);
    }
  };

  const completedStyle = {
    fontStyle: 'italic',
    color: '#808080',
    textDecoration: 'line-through',
  };

  const { completed, id, title } = todo;

  const viewMode = {};
  const editMode = {};

  if (editing) {
    viewMode.display = 'none';
  } else {
    editMode.display = 'none';
  }

  useEffect(() => () => {}, []);

  return (
    <li className="item">
      <div onDoubleClick={handleEditing} style={viewMode}>
        <span style={completed ? completedStyle : null}>{title}</span>
      </div>
      <input
        type="text"
        style={editMode}
        className="text-input"
        value={title}
        onChange={(e) => {
          setUpdate(e.target.value, id);
        }}
        onKeyDown={handleUpdatedDone}
      />
      <div className="options">
        {completed ? (
          <button type="button" onClick={() => deleteTodoProps(id)}>
            <i className="fas fa-times" />
          </button>
        ) : (
          <div>
            <button type="button" onClick={() => handleChangeProps(id)}>
              <i className="fas fa-check" />
            </button>
            <button type="button" onClick={() => deleteTodoProps(id)}>
              <i className="fas fa-times" />
            </button>
          </div>
        )}
      </div>
    </li>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  handleChangeProps: PropTypes.func.isRequired,
  deleteTodoProps: PropTypes.func.isRequired,
  setUpdate: PropTypes.func.isRequired,
};

export default TodoItem;
