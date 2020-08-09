import styled from 'styled-components/native';

export const Container = styled.View`
    padding: 40px;
    background: #8257e5;
`;

export const TopBar = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const BackIcon = styled.Image`
    resize-mode: contain;
`;

export const Logo = styled.Image`
    resize-mode: contain;
`;

export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const Title = styled.Text`
    color: #fff;
    font-family: 'Archivo_700Bold';
    font-size: 24px;
    line-height: 32px;
    max-width: 160px;
    margin: 40px 0;
`;