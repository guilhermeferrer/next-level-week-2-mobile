import React, { useState, useEffect } from 'react';

import { Container, Scroll } from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';
import AsyncStorage from '@react-native-community/async-storage';
import { useIsFocused } from '@react-navigation/native';

interface TeacherProps {
    id: number;
    subject: string;
    cost: number;
    user_id: number;
    name: string;
    avatar: string;
    whatsapp: string;
    bio: string;
}

export default function Favorites() {
    const isFocused = useIsFocused();
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        loadFavorites();
    }, [isFocused]);

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
            if (response)
                setFavorites(JSON.parse(response).map((teacher: TeacherProps) => teacher));
        });
    }

    return (
        <Container>
            <PageHeader title="Meus Favoritos" />
            <Scroll>
                {
                    favorites.map((teacher: TeacherProps, index) =>
                        <TeacherItem
                            {...{ teacher, reload: loadFavorites }}
                            favorited
                            key={index}
                        />
                    )
                }
            </Scroll>
        </Container>
    )
}