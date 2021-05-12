import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';

function App() {
  const [item, setItem] = useState('');
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });

  // handle submit
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!item) {
     displayAlert(true, 'please enter a value', 'danger')
    } else if (item && isEditing) {
    } else {
      displayAlert(true, 'new item added', 'success')
      const newItem = { title: item, id: new Date().getTime().toString() };
      setList([...list, newItem]);
      setItem('');
    }
  };

  // display  alert
  const displayAlert = (show = false, message = '', type = '') => {
    setAlert({show, message, type})
  };

  // clear items
  const clearItems = () => {
    displayAlert(true, 'empty list', 'danger');
    setList([])
  }

  // remove item
  const removeItem = (id) => {
    displayAlert(true, 'item removed', 'danger');
    setList(list.filter((item)=> item.id !== id))
  }
  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={displayAlert} list={list}/>}
        <h3>grocery bud</h3>
        <div className='form-control'>
          <input
            type='text'
            className='grocery'
            placeholder='e.g. milk'
            vlaue={item}
            onChange={(event) => setItem(event.target.value)}
          />
          <button type='submit' className='submit-btn'>
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className='grocery-container'>
          <List items={list} removeItem={removeItem}/>
          <button className='clear-btn' onClick={clearItems}>Clear Items</button>
        </div>
      )}
    </section>
  );
}

export default App;
