import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { FaTimesCircle, FaPlusCircle, FaMinusCircle } from 'react-icons/fa';

const ExpenseItem = (props) => {
    const { dispatch, currency} = useContext(AppContext);

    const handleDeleteItem = () => {
        const item = {
            name: props.name,
        };

        dispatch({
            type: 'DELETE_ITEM',
            payload: item,
        });
    };
    const handleIncret10 = () => {
        const item = {
            name: props.name,
        }

        dispatch({
            type: 'INCREMENT10',
            payload: item,
        });
    };
    const handleDecrese10 = () => {
        const item = {
            name: props.name,
        }

        dispatch({
            type: 'DECREMENT10',
            payload: item,
        });
    };


    return (
        <tr>
        <td>{props.name}</td>
        <td>{currency}{parseInt(props.allocatedbudget)}</td>
        <td><FaPlusCircle size='2.2em' color="green" onClick={handleIncret10}></FaPlusCircle></td>
        <td><FaMinusCircle size='2.2em' color="red" onClick={handleDecrese10}></FaMinusCircle></td>
        <td><FaTimesCircle size='1em' color="black" onClick={handleDeleteItem}></FaTimesCircle></td>
        </tr>
    );
};

export default ExpenseItem;
