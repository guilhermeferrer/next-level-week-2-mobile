import React, { useState, useEffect } from 'react';

import {
    Container,
    Banner,
    Title,
    TitleBold,
    ButtonsContainer,
    ButtonPrimary,
    ButtonSecondary,
    Icon,
    ButtonText,
    TotalConnections
} from './styles';

import landingImage from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';
import { useNavigation } from '@react-navigation/core';
import api from '../../services/api';

export default function Landing() {
    const { navigate } = useNavigation();

    function redirectToGiveClassesPage() {
        navigate('GiveClasses');
    }

    function redirectToStudyPage() {
        navigate('Study');
    }

    const [totalConnections, setTotalConnections] = useState(0);

    useEffect(() => {
        api.get('/connection').then(response => {
            setTotalConnections(response.data.total);
        });
    }, []);

    return (
        <Container>
            <Banner source={landingImage} />
            <Title>
                Seja bem vindo, {'\n'}
                <TitleBold>O que deseja fazer?</TitleBold>
            </Title>
            <ButtonsContainer>
                <ButtonPrimary onPress={redirectToStudyPage}>
                    <Icon source={studyIcon} />
                    <ButtonText>Estudar</ButtonText>
                </ButtonPrimary>
                <ButtonSecondary onPress={redirectToGiveClassesPage}>
                    <Icon source={giveClassesIcon} />
                    <ButtonText>Dar aulas</ButtonText>
                </ButtonSecondary>
            </ButtonsContainer>
            <TotalConnections>
                Total de {totalConnections} conexões já realizadas {' '}
                <Icon source={heartIcon} />
            </TotalConnections>
        </Container>
    );
}