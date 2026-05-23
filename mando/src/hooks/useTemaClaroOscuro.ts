import { useColorScheme } from 'nativewind';
import { useEffect } from 'react';

export const useTemaClaroOscuro = () => {
  const { colorScheme, setColorScheme } = useColorScheme();
  useEffect(() => {
    setColorScheme('dark');
  }, []);

  return {
    cambiarATemaClaro: () => setColorScheme('light'),
    cambiarATemaOscuro: () => setColorScheme('dark'),
    actual: () => colorScheme,
  };
};

export default useTemaClaroOscuro;
