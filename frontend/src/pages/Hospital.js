import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API_hospital from '../hooks/NaverAPI_hospital';
import HospitalInformation from '../components/hospital/HospitalInformation';
import SearchComponents from '../components/search/Search';
import styled from 'styled-components';
import { ListButton } from "../styles/styled";
import HospitalCategory from '../components/hospital/HospitalCategory';
import useHospitals from "../hooks/useHospitals";
import { GoChevronDown } from "react-icons/go";

const HospitalPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 3%;
`;

const Dropdown = styled.div`
    position: relative;
    width: 15vh;
    background-color: ${props => (props.active ? '#E8E8E8' : '#1C3988')};
    color: ${props => (props.active ? '#000000' : '#ffffff')};
    border-radius: 100px;
    padding: 3px 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    height: 3rem;
    &:hover {
        background-color: #E8E8E8;
        color: #000000;
    }
`;

const DropdownContent = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: rgba(249, 249, 249, 0.7);
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    z-index: 1;
    border-radius: 5px;
    display: none;
    flex-direction: column;
    align-items: center;
    width: 40vh;

    &.show {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        z-index: 999;
        margin-top: 15px;
    }
`;

const DropdownItem = styled.div`
    padding: 10px 20px;
    text-align: center;
    border-bottom: 1px solid #ddd;
    width: calc(33% - 20px);
    background-color: ${props => (props.active ? '#E8E8E8' : '#1C3988')};
    color: ${props => (props.active ? '#000000' : '#ffffff')};
    border-radius: 10px;
    cursor: pointer;
    margin-bottom: 15px;
}

    &:last-child {
        border-bottom: none;
    }
`;

const DropdownWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
`;

const Category = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
`;

const Hospital = () => {
    const hospitals = useHospitals();
    const [selectedCategory, setSelectedCategory] = useState('전체');
    const [categories, setCategories] = useState(['전체']);
    const [selectedType, setSelectedType] = useState('전체');
    const [types, setTypes] = useState(['전체']);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        const uniqueCategories = new Set(['전체']);
        const uniqueTypes = new Set(['전체']);

        hospitals.forEach(hospital => {
            if (hospital.hospitalsType) {
                uniqueTypes.add(hospital.hospitalsType);
            }
            if (hospital.operatingHours.some(hour => hour.close >= 1830)) {
                uniqueCategories.add('야간진료');
            }
            if (hospital.operatingHours.some(hour => hour.dayOfWeek === '공휴일')) {
                uniqueCategories.add('공휴일진료');
            }
        });

        setTypes([...uniqueTypes]);
        setCategories([...uniqueCategories]);
    }, [hospitals]);    

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    return (
        <HospitalPageContainer>
            <SearchComponents/>
            <Category>
                <HospitalCategory
                    categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />
                <Dropdown onClick={toggleDropdown}>
                    {selectedType}<GoChevronDown />
                    <DropdownContent className={dropdownOpen ? 'show' : ''}>
                        <DropdownWrapper>
                            {types.map(type => (
                                <DropdownItem key={type} onClick={() => {
                                    setSelectedType(type);
                                    setDropdownOpen(false);
                                }}>{type}</DropdownItem>
                            ))}
                        </DropdownWrapper>
                    </DropdownContent>
                </Dropdown>
            </Category>
            <API_hospital selectedCategory={selectedCategory}/>
            <HospitalInformation
                selectedCategory={selectedCategory}
                selectedType={selectedType}
                hospitals={hospitals}
            />
            <Link to="/drug">
                <ListButton>의약품 목록</ListButton>
            </Link>
        </HospitalPageContainer>
    );
};

export default Hospital;
