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
    

    return (
        <div className={styles.filter}>
            <div>
                <input type="text" placeholder='Country Name' onChange={handleChange} value={input} />
                <select value={selectedVal} onChange={handleInputChange} name="population">
                    {options.map((option) => {
                        return <option key={option.name} value={option.value}>{option.name}</option>
                    })}
               
                </select>
                <button onClick={handleClearFilter}>Clear</button>
            </div>
            <button onClick={fetchApi}>Show all countries</button>
        </div>
    );
};

export default Filter;
