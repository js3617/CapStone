import React from 'react';
import styled from 'styled-components';
import usePharmacies from '../../hooks/usePharmacies';
import useStores from '../../hooks/useStores';
import { BsTelephone } from 'react-icons/bs';
import { LocationText, Name } from '../../styles/styled';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 840px;
    align-items: center;
    background-color: #E8E8E8;
    padding: 20px;
    border-radius: 30px 30px 0 0;
    z-index: 100;
    position: relative;
    top: -30px;
`;

const List = styled.ul`
    list-style: none;
    padding: 0;
    width: 100%;
`;

const Item = styled.li`
    border-bottom: 1px solid #FFFFFF;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &:last-child {
        border-bottom: none;
    }
`;

const PhoneLink = styled.a`
    display: flex;
    align-items: center;
    text-decoration: none;
`;

const NoDataMessage = styled.div`
    text-align: center;
    font-size: 18px;
    color: #FF0000;
    margin-top: 20px;
`;

const CombinedInformation = ({ selectedCategory }) => {
    const pharmacies = usePharmacies();
    const stores = useStores();

    // 약국과 편의점 데이터를 통합하고 카테고리 필터링 적용
    const combinedData = [
        ...pharmacies.map(pharmacy => ({ 
            type: 'pharmacy', 
            name: pharmacy.dutyName, 
            address: pharmacy.dutyAddr, 
            phone: pharmacy.dutyTel1 
        })),
        ...stores.map(store => ({ 
            type: 'store', 
            name: store.storeName, 
            address: store.storeAddr 
        }))
    ];

    return (
        <Container>
            {combinedData.length > 0 ? (
                <List>
                    {combinedData.map((item, index) => (
                        <Item key={index}>
                            <div>
                                <Name>{item.name}</Name>
                                <LocationText>{item.address}</LocationText>
                            </div>
                            {item.type === 'pharmacy' && item.phone && (
                                <PhoneLink href={`tel:${item.phone}`}>
                                    <BsTelephone />
                                </PhoneLink>
                            )}
                        </Item>
                    ))}
                </List>
            ) : (
                <NoDataMessage>관련 정보가 없습니다</NoDataMessage>
            )}
        </Container>
    );
};

export default CombinedInformation;
