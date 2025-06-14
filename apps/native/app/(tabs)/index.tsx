import { Dimensions, ScrollView, Text, View } from "react-native";
import {
  Canvas,
  Circle,
  Paint,
  SweepGradient,
  useClock,
  BlurMask,
  vec,
} from "@shopify/react-native-skia";
import { useDerivedValue } from "react-native-reanimated";

const emotionsColors = [
  "rgba(255, 94, 94, 0.8)",
  "rgba(255, 155, 94, 0.8)",
  "rgba(255, 209, 94, 0.8)",
  "rgba(214, 255, 94, 0.8)",
  "rgba(94, 255, 131, 0.8)",
  "rgba(94, 255, 231, 0.8)",
  "rgba(94, 201, 255, 0.8)",
  "rgba(94, 131, 255, 0.8)",
  "rgba(155, 94, 255, 0.8)",
  "rgba(209, 94, 255, 0.8)",
  "rgba(255, 94, 201, 0.8)",
  "rgba(255, 94, 155, 0.8)",
  "rgba(255, 94, 94, 0.8)",
];

const Index = () => {
  const clock = useClock();

  // Rotation animée du dégradé pour simuler le flux
  const angle = useDerivedValue(() => {
    return (clock.value / 3000) % (2 * Math.PI);
  });

  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  return (
    <View style={{ flex: 1 }}>
      {/* <Text>{angle.get()}</Text> */}
      <Canvas style={{ flex: 1, backgroundColor: "black" }}>
        <Circle
          cx={width / 2}
          cy={height / 2}
          r={(width - 64) / 2}
          // transform={useDerivedValue(() => [{ rotate: angle.value }])}
          origin={vec(width / 2, height / 2)}
        >
          <Paint>
            <SweepGradient
              c={vec(width / 2, height / 2)}
              colors={emotionsColors}
            />
            <BlurMask style="normal" blur={25} />
            {/* Tu peux ajouter un BlurMaskFilter ici pour adoucir le rendu */}
          </Paint>
        </Circle>
        <Circle
          cx={width / 2}
          cy={height / 2}
          r={(width - 128) / 2}
          color={"black"}
        >
          <BlurMask style="normal" blur={25} />
        </Circle>
      </Canvas>
    </View>
  );
};

export default Index;
