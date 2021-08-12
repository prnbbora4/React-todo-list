import React, {useState, useEffect} from 'react'
import todologo from '../Images/491.svg'

// get data from the localStorage 
// no data will lost after refresh or any other reason
const getLocalItems = () => {
    let list = localStorage.getItem('List')
    console.log(list);

    if(list){
        return JSON.parse(localStorage.getItem('List'))
    }else{
        return []
    }
}

const Todo = () => {

    const [inputData, setInputData] = useState('')

    // calling getLocalItems() as initial data
    const [items, setItems] = useState(getLocalItems())

    // button toogle in updatedItem
    const [toggleSubmit, setToggleSubmit] = useState(true)

    const [isEditItem, setIsEditItem] = useState(null)

    // add data to the list
    const addItem = () => {

        if(!inputData){
            alert('Add something')
        }else if(inputData && !toggleSubmit){
            // toggle part
            setItems(
                items.map( (elem) => {
                    if(elem.id === isEditItem){
                        return { ...elem, name: inputData}
                    }
                    return elem
                })
            )
            setToggleSubmit(true)

            setInputData('')
    
            setIsEditItem(null)
        }else{
            // for give an id it will help in edit or delete
            const allInputData = { id: new Date().getTime().toString(), name: inputData}
            setItems([...items, allInputData])
            setInputData('')
        }

    }

    // delete data from the list
    const deleteItem = (id) => {
        const updatedItem = items.filter( (elem) => {
            return id !== elem.id
        })
        setItems(updatedItem)
    }

    // edit item
    const editItem = (id) => {
        let newEditItem = items.find( (elem) => {
            return elem.id === id
        })
        console.log(newEditItem);

        setToggleSubmit(false)

        setInputData(newEditItem.name)

        setIsEditItem(id)
    }

    // clear all data
    const removeAll = () => {
        setItems([])
    }

    // add data to the localStorage
    useEffect(() => {
        localStorage.setItem('List', JSON.stringify(items))
    }, [items])

    return (
        <>
            <div className='main-div'>
                <div className='child-div'>
                    <figure>
                        <img src={todologo}/>
                        <figcaption>Add your list here</figcaption>
                    </figure>

                    <div className='addItems'>
                        <input type='text' placeholder='Add item..'
                        value={inputData}
                        onChange={ (e) => setInputData(e.target.value)  }
                        ></input>

                        {
                            toggleSubmit ? 
                            <i className="fa fa-plus add-btn" title='Add Item'
                            onClick={addItem}
                            ></i> :
                            <i className="far fa-edit add-btn" title='Update Item'
                            onClick={addItem}
                            ></i>
                        }

                    </div>

                    <div className="showItems">

                        {
                            items.map( (element) => {
                                return(
                                    <div className='eachItem' key={element.id}>
                                    <h2>{element.name}</h2>

                                    <div className='todo-btn'>
                                        <i className="far fa-edit add-btn" title='Edit Item'
                                        onClick={ () => editItem(element.id)}
                                        ></i>

                                        <i className="far fa-trash-alt add-btn" title='Delete Item'
                                        onClick={ () => deleteItem(element.id)}
                                        ></i>
                                    </div>

                                    </div>
                                )
                            } )
                        }

                    </div>

                    <div className='showItems'>
                        <button className='btn effect04' data-sm-link-text='Remove All' onClick={removeAll}> <span> Check List</span> </button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Todo
