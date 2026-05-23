import { ReactNode } from 'react';
import { View } from 'react-native';

const ContenedorParaCentrarTodo = ({ children }: { children: ReactNode }) => {
  return <View className="flex-1 items-center justify-center gap-8 p-4">{children}</View>;
};

export default ContenedorParaCentrarTodo;
