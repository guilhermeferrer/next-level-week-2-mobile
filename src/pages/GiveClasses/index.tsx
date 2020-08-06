import React from 'react';
import {
    Container,
    Background,
    Title,
    Description,
    Button,
    ButtonText
} from './styles';

import giveClassesBackgroundImage from '../../assets/images/give-classes-background.png';
import { useNavigation } from '@react-navigation/core';

export default function GiveClasses() {
    const { goBack } = useNavigation();

    return (
        <Container>
            <Background resizeMode="contain" source={giveClassesBackgroundImage}>
                <Title>Quer ser um Proffy?</Title>
                <Description>Para começar, você precisa se cadastrar como professor na nossa plataforma web.</Description>
            </Background>
            <Button onPress={goBack}>
                <ButtonText>Tudo bem</ButtonText>
            </Button>
        </Container>
    );
}