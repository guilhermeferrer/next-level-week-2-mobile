import React, { useState, useEffect } from 'react';

import {
    Container,
    Scroll,
    SearchForm,
    Label,
    Input,
    InputGroup,
    InputBlock,
    SubmitButton,
    SubmitButtonText
} from './styles';

import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import api from '../../services/api';
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

export default function TeacherList() {
    const [showFilters, setShowFilters] = useState(false);
    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');
    const [teachers, setTeachers] = useState([]);
    const [favorites, setFavorites] = useState<number[]>([]);
    const isFocused = useIsFocused();

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
            if (response)
                setFavorites(JSON.parse(response).map((teacher: TeacherProps) => teacher.id));
        });
    }

    useEffect(() => {
        loadFavorites();
        setShowFilters(false);
    }, [isFocused]);

    function handleTouggleShowFilters() {
        setShowFilters(!showFilters);
    }

    async function handleFilterSubmit() {
        loadFavorites();
        await api.get('/classes', {
            params: {
                subject,
                week_day,
                time
            }
        })
            .then(response => {
                setTeachers(response.data);
                setShowFilters(false);
            })
            .catch(err => console.log(err.response.data));
    }

    return (
        <Container>
            <PageHeader
                title="Proffys disponíveis"
                headerRight={(
                    <BorderlessButton onPress={handleTouggleShowFilters}>
                        <Feather name='filter' color='#fff' size={26} />
                    </BorderlessButton>
                )}
            >
                {
                    showFilters && <SearchForm>
                        <Label>Matéria</Label>
                        <Input
                            value={subject}
                            onChangeText={setSubject}
                            placeholder='Qual a matéria?'
                        />
                        <InputGroup>
                            <InputBlock>
                                <Label>Dia da semana</Label>
                                <Input
                                    value={week_day}
                                    onChangeText={setWeekDay}
                                    placeholder='Qual o dia?'
                                />
                            </InputBlock>
                            <InputBlock>
                                <Label>Horário</Label>
                                <Input
                                    value={time}
                                    onChangeText={setTime}
                                    placeholder='Qual hora?'
                                />
                            </InputBlock>
                        </InputGroup>
                        <SubmitButton onPress={handleFilterSubmit}>
                            <SubmitButtonText>Buscar</SubmitButtonText>
                        </SubmitButton>
                    </SearchForm>
                }
            </PageHeader>
            <Scroll>
                {teachers.map((teacher: TeacherProps, index) => (
                    <TeacherItem
                        key={index}
                        {...{
                            teacher,
                            favorited: favorites.includes(teacher.id),
                            reload: loadFavorites
                        }}
                    />))}
            </Scroll>
        </Container >
    )
}