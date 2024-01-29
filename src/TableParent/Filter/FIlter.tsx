import React, { useState } from 'react';

import styles from './Filter.module.css'
import {  FilterItem } from '../../utils/types';


type FilterProps = {
    fetchApi: () => Promise<void>;
    handleFilterInput: (FilterItem: FilterItem) => void;
};

const Filter: React.FC<FilterProps> = ({ fetchApi, handleFilterInput }) => {
    const [input, setInput] = useState('');
    const [selectedVal, setSelectedVal] = useState(0);

    const handleClearFilter = () => {
        setInput('');
        setSelectedVal(0);
        handleFilterInput({countryName:'', population: 0});
        
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInput(value);
        handleFilterInput({countryName:value, population: selectedVal});
    };


    const options = [
        { name: 'Population', value:   0 },
        { name: '<1M', value:   1000000 },
        { name: '<5M', value:   5000000 },
        { name: '<10M', value: 10000000 }
    ];

    const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const {  value } = event.target;
        handleFilterInput({population: Number(value),countryName:input})
        setSelectedVal(Number(value));
    };

    const [checked, setChecked] = useState(new Array(10).fill({val: `value check ${Math.round(Math.random())}`, checked:false}));
    const [rangeVal, setRangeVal] = useState(0);
    const [radioVal, setRadioVal] = useState('');
    const [dateVal, setDateVal] = useState('');

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, index:number) => {
        const {value, name, ...elem} = event.target;
        console.log('value:',checked, {name, value, ...elem});
        const newArr = checked.map((item,idx)=>{
            if(idx===index){
                return {...item, checked: !item.checked}
            }
            return {...item}
        })

        setChecked(newArr)
        // setChecked(val=>!val);
        // setChecked(event.target.checked);
        // handleFilterInput({countryName:input, population: selectedVal})
    }

    const handleRangeSlider = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value, name, ...elem} = event.target;
        console.log('value:', {name, value, ...elem});
        setRangeVal(Number(value));
        // setChecked(event.target.checked);
        // handleFilterInput({countryName:input, population: selectedVal})
    }

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value, name, ...elem} = event.target;
        console.log('value:', {name, value, ...elem});
        setRadioVal(value);
        // setChecked(event.target.checked);
        // handleFilterInput({countryName:input, population: selectedVal})
    }

    const handleDatePicker = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value, name, ...elem} = event.target;
        // console.log('value:', {name, value, ...elem});
        const currDate = new Date('July 22, 2024 00:00:00');
        const date = new Date(value);
        setDateVal(value);
        let age = currDate.getFullYear() - date.getFullYear();
        const m = currDate.getMonth() - date.getMonth();
        const d = currDate.getDate() - date.getDate();
        let monthAge = 0;
        let dateAge = 0;

        let e1 = currDate.getTime();
        let e2 = date.getTime();



        console.log('WWW::', e1-e2, new Date(e1-e2) )
        // console.log('>>>>>', currDate.getDate(), date.getDate(), {age});   
        if (m < 0 || (m === 0 && currDate.getDate() < date.getDate())) {
            console.log('IFFF>>', currDate.getDate(), date.getDate());
            age--;
            // monthAge = 12- Math.abs(m);
           
        }
        if (m < 0) {
            console.log('AGE IF>>', currDate.getDate(), date.getDate(),);
            monthAge = 12- Math.abs(m);
        } else {
            monthAge = m;
        }
        if  (m === 0 && currDate.getDate() < date.getDate()){
            console.log('AGE IF>>Months age')
            monthAge=11;
        }
        dateAge = Math.abs(d);

        console.log('date:', {currDate,date, months: monthAge,value, years:age, dateAge});
        // setChecked(event.target.checked);
        // handleFilterInput({countryName:input, population: selectedVal})
    }

    

    return (
        <div className={styles.filter}>
            <div>
                <input type="text" placeholder='Country Name' onChange={handleChange} value={input} />
                <select value={selectedVal} onChange={handleInputChange} name="population">
                    {options.map((option) => {
                        return <option key={option.name} value={option.value}>{option.name}</option>
                    })}
                </select>

<div>
           
                    {checked.map((item, index) => {
                        return      <label key={`${''}${index}`}> Input Label: <div><input  type='checkbox' value={item.val} checked={item.checked} onChange={(event) => handleCheckboxChange(event, index)} />{`${index} ${item.checked}`}</div>          </label>
                    })}
                    {/* // <input type='checkbox' name="checkbox first name" value={'checkbox first value'} checked={checked} onChange={handleCheckboxChange}  /> */}
                    {/* // <input type='checkbox' name="checkbox second name" value={'checkbox second value'} checked={checked} onChange={handleCheckboxChange}  /> */}
       
                </div>

                <input type="date" name='date name' value={dateVal} onChange={handleDatePicker} />
                
                <input type="datetime-local"/>
                <div>
                    <input type="radio" name='first' value={'first val'} checked={radioVal==='first val'} onChange={handleRadioChange} />
                    <input type="radio" name='second' value={'second val'}  checked={radioVal==='second val'} onChange={handleRadioChange} />
                </div>
                <div>
                    <input type="range" name='range name' value={rangeVal} onChange={handleRangeSlider} />
                </div>

                <button onClick={handleClearFilter}>Clear</button>
            </div>
            <button onClick={fetchApi}>Show all countries</button>
        </div>
    );
};

export default Filter;
