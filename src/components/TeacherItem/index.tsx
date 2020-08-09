import React, { useState } from 'react';

import {
  Container,
  Profile,
  Avatar,
  ProfileInfo,
  Name,
  Subject,
  Bio,
  Footer,
  Price,
  PriceValue,
  ButtonsContainer,
  FavoriteButton,
  Icon,
  ContactButton,
  ContactButtonText
} from './styles';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';
import { Linking } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

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

interface TeacherItemProps {
  favorited?: boolean;
  teacher: TeacherProps;
  reload: Function;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorited = false, reload }) => {
  const { id, subject, cost, user_id, name, avatar, whatsapp, bio } = teacher;

  function handleLinkToWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=${whatsapp}`);
  }

  async function handleTouggleFavorite() {
    const response = await AsyncStorage.getItem('favorites');
    let favorites = [];

    if (response)
      favorites = JSON.parse(response);

    if (favorited) {
      AsyncStorage.setItem(
        'favorites',
        JSON.stringify(favorites.filter((teacher: TeacherProps) => teacher.id !== id))
      );
      return reload();
    }

    favorites.push(teacher);
    AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    reload();
  }

  return (
    <Container>
      <Profile>
        <Avatar
          source={{ uri: avatar }}
        />
        <ProfileInfo>
          <Name>{name}</Name>
          <Subject>{subject}</Subject>
        </ProfileInfo>
      </Profile>
      <Bio>{bio}</Bio>
      <Footer>
        <Price>
          Preço/hora
          {'     '}
          <PriceValue>R$ {cost.toFixed(2)}</PriceValue>
        </Price>
        <ButtonsContainer>
          <FavoriteButton
            {...{ favorited }}
            onPress={handleTouggleFavorite}
          >
            {
              favorited
                ? <Icon source={unfavoriteIcon} />
                : <Icon source={heartOutlineIcon} />
            }

          </FavoriteButton>
          <ContactButton onPress={handleLinkToWhatsapp}>
            <Icon source={whatsappIcon} />
            <ContactButtonText>Entrar em contato</ContactButtonText>
          </ContactButton>
        </ButtonsContainer>
      </Footer>
    </Container>
  );
}

export default TeacherItem;