import React, { useCallback, useRef, useState } from 'react';
import axios from 'axios';

import Filter from './Filter/FIlter';
import Table from './Table/Table';
import { Country, FilterItem } from '../utils/types';
import { debounce } from '../utils/utils';
import styles from './TableParent.module.css';



const TableParent: React.FC = () => {
    const [filteredArray, setFilteredArray] = useState([] as Country[])
    const data = useRef([] as Country[])


    const handleFilterInput = useCallback( ({countryName, population}:FilterItem) => {
        const filterFunc= () => {
            const filteredArray= data.current.filter((item:Country) =>{
                
                if(population)
                    return  (item.name ?? '').toLowerCase().includes(countryName.toLowerCase()) && item.population < population
                return  item.name.toLowerCase().includes(countryName.toLowerCase()) 
            });
            setFilteredArray(filteredArray);
        }
        const filter = debounce(filterFunc,500)
        filter();
       
    }, [data]);





    const fetchApi = useCallback(async () => {
        try {
            const res = await axios('https://api.sampleapis.com/countries/countries');
            data.current = res.data;
            setFilteredArray(res.data);
            console.log('res:', res.data);
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <div className={styles.tableParent}>
            <Filter fetchApi={fetchApi} handleFilterInput={handleFilterInput} />
            <Table tdata={filteredArray} />
        </div>
    );
};

export default TableParent;
