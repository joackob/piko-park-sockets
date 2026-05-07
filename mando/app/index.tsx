import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Link, Stack } from 'expo-router';
import { MoonStarIcon, StarIcon, SunIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { Image, type ImageStyle, View } from 'react-native';

const LOGO = {
  light: require('@/assets/images/react-native-reusables-light.png'),
  dark: require('@/assets/images/react-native-reusables-dark.png'),
};

const SCREEN_OPTIONS = {
  title: 'Piko Park - Mando',
  headerTransparent: true,
  headerRight: () => <ThemeToggle />,
};

const IMAGE_STYLE: ImageStyle = {
  height: 76,
  width: 76,
};

export default function Screen() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    setColorScheme('dark');

    ws.current = new WebSocket('ws://10.0.2.2:3000/ws');
    ws.current.onopen = () => {
      setColorScheme('light');
    };

    ws.current.onclose = () => {
      setColorScheme('dark');
    };

    ws.current.onerror = () => {
      setColorScheme('dark');
    };

    return () => {
      setColorScheme('dark');
      ws.current?.close();
    };
  }, []);

  const solicitarAlServidor = () => {
    ws.current?.send('saltar');
  };

  return (
    <>
      <Stack.Screen options={SCREEN_OPTIONS} />
      <View className="flex-1 items-center justify-center gap-8 p-4">
        <Image source={LOGO[colorScheme ?? 'light']} style={IMAGE_STYLE} resizeMode="contain" />
        <View className="flex-row gap-2">
          <Button onPress={solicitarAlServidor}>
            <Text>Saltar</Text>
          </Button>
        </View>
      </View>
    </>
  );
}

const THEME_ICONS = {
  light: SunIcon,
  dark: MoonStarIcon,
};

function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <Button
      onPressIn={toggleColorScheme}
      size="icon"
      variant="ghost"
      className="ios:size-9 rounded-full web:mx-4">
      <Icon as={THEME_ICONS[colorScheme ?? 'light']} className="size-5" />
    </Button>
  );
}
