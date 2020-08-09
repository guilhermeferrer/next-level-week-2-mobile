import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background: #f0f0f7;
`;

export const Scroll = styled.ScrollView.attrs(props => ({
    contentContainerStyle: {
        paddingHorizontal: 16,
        paddingBottom: 16
    },
    ...props
}))`
    margin-top: -40px;
`;