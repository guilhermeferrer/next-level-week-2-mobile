import React, { ReactNode } from 'react';

import { Container, TopBar, BackIcon, Logo, Title, Header } from './styles';
import backIcon from '../../assets/images/icons/back.png';
import logoImage from '../../assets/images/logo.png';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/core';

interface PageHeaderProps {
    title: string;
    headerRight?: ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, children, headerRight }) => {
    const { goBack } = useNavigation();
    return (
        <Container>
            <TopBar>
                <BorderlessButton onPress={goBack}>
                    <BackIcon source={backIcon} />
                </BorderlessButton>
                <Logo source={logoImage} />
            </TopBar>
            <Header>
                <Title>{title}</Title>
                {headerRight}
            </Header>
            {children}
        </Container>
    );
}

export default PageHeader;