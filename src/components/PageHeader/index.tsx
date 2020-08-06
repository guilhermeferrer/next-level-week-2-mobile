import React from 'react';

import { Container, TopBar, BackIcon, Logo, Title } from './styles';
import backIcon from '../../assets/images/icons/back.png';
import logoImage from '../../assets/images/logo.png';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/core';

interface PageHeaderProps {
    title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
    const { goBack } = useNavigation();
    return (
        <Container>
            <TopBar>
                <BorderlessButton onPress={goBack}>
                    <BackIcon source={backIcon} />
                </BorderlessButton>
                <Logo source={logoImage} />
            </TopBar>
            <Title>{title}</Title>
        </Container>
    );
}

export default PageHeader;