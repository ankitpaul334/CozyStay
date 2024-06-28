import React, { useEffect, useState } from 'react'
import FilterModal from './FilterModal';


import {useDispatch} from "react-redux";
import {getAllProperties} from "../../Store/Property/property-action";
import { propertyAction } from "../../Store/Property/property-slice";

const Filter = () => {
    // state to ctrl modal visibility
    const[isModalOpen, setIsModalOpen] = useState(false);
    // state to store selected filter
    const [selectedFilters, setSelectedFilters] =useState({});
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(propertyAction.updateSearchParams(selectedFilters));
        dispatch(getAllProperties());
    }, [selectedFilters,dispatch]);

    //function to handle pop up window
    const handleOpenModal =()=>{
        setIsModalOpen(true); //sets true to open modal
    }
    const handleCloseModal =()=> {
        setIsModalOpen(false);
    }
    //handle changes in filters
    const handleFilterChange =(filterName,value)=> {
        // update selected filters with new vals
        setSelectedFilters((prevFilters)=>({
            ...prevFilters,
            [filterName]:value,
        }));
    };

  return (
    <>
        <span class="material-symbols-outlined filter" onClick={handleOpenModal}>tune</span>
    
    {isModalOpen && (
        <FilterModal 
            selectedFilters={selectedFilters}
            onFilterChange = {handleFilterChange}
            onClose={handleCloseModal}
        />
    )}
    </>
  );
};

export default Filter