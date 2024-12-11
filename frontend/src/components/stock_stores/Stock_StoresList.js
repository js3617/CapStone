import React, { useEffect, useState } from 'react';
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

const CombinedInformation = () => {
    const pharmacies = usePharmacies();
    const stores = useStores();
    const [combinedData, setCombinedData] = useState([]);

    // pharmacies와 stores가 변경될 때만 combinedData를 업데이트
    useEffect(() => {
        const combined = [
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
        setCombinedData(combined);
    }, [pharmacies, stores]);  // 의존성 배열에 pharmacies와 stores를 추가

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