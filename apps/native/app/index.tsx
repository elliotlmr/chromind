import { router } from 'expo-router';
import { View, Text, Button } from 'react-native';

export default function Index() {
  return (
    <View>
      <Text>Index</Text>
      <Button onPress={() => router.navigate('/(tabs)')} title="Go to About" />
    </View>
  );
}