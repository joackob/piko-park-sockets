import { Image } from 'react-native';

const LOGO = {
  light: require('@/assets/images/react-native-reusables-light.png'),
  dark: require('@/assets/images/react-native-reusables-dark.png'),
};

const IconoPrincipal = ({ tema }: { tema: 'light' | 'dark' | undefined }) => {
  return (
    <Image
      source={LOGO[tema ?? 'light']}
      style={{
        height: 76,
        width: 76,
      }}
      resizeMode="contain"
    />
  );
};

export default IconoPrincipal;
