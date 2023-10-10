import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { MdOutlineArrowDropDown, MdArrowDropUp} from 'react-icons/md';

const Currency = () => {
  const {dispatch } = useContext(AppContext);

  const [selectedCurrency, setSelectedCurrency] = useState('£ Pound');
  const [isOpen, setIsOpen] = useState(false);

    const changeCurrency = (val, label)=>{
            dispatch({
                type: 'CHG_CURRENCY',
                payload: val,
            })
            setSelectedCurrency(label);
            setIsOpen(false);
    }
    const currencyOptions = [
      { value: '$', label: '$ Dollar' },
      { value: '£', label: '£ Pound' },
      { value: '€', label: '€ Euro' },
      { value: '₹', label: '₹ Ruppee' },
    ];
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  

  return (
        <div className='alert alert-success col position-relative crbox' onClick={toggleDropdown}> Currency 
          <span id='currency'>({selectedCurrency})</span> { !isOpen && <MdOutlineArrowDropDown/>}
          {isOpen && ( <>
            <MdArrowDropUp/>
            <div className="dropdown-options">
              {currencyOptions.map((option) => (
                <div
                  key={option.value}
                  className="option"
                  onClick={() => changeCurrency(option.value, option.label)}
                >
                  {option.label}
                </div>
              ))}
            </div>
            </>
          )}
    </div>
    );
};

export default Currency;
