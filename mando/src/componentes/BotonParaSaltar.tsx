import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

const BotonParaSaltar = ({ alPresionar }: { alPresionar: () => void }) => {
  return (
    <Button onPress={alPresionar}>
      <Text>Saltar</Text>
    </Button>
  );
};

export default BotonParaSaltar;
