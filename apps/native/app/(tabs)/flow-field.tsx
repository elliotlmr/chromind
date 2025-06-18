import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import {
  Canvas,
  useClock,
  Circle,
  vec,
  Skia,
  PaintStyle,
} from "@shopify/react-native-skia";
import { useDerivedValue } from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

type Particle = {
  x: number;
  y: number;
  color: string;
};

const PARTICLE_COUNT = 300;
const SPEED = 1.5;
const NOISE_SCALE = 0.01;

function random(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

// Simple sine/cosine based pseudo-noise
function noise(x: number, y: number, t: number) {
  return (
    Math.sin(x * NOISE_SCALE + t * 0.002) +
    Math.cos(y * NOISE_SCALE - t * 0.002)
  );
}

export default function FlowField() {
  const clock = useClock();

  // Particles static reference
  const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
    x: random(0, width),
    y: random(0, height),
    color: `hsl(${Math.floor(random(0, 360))}, 80%, 60%)`,
  }));

  // Animation loop via derived value
  const animatedParticles = useDerivedValue(() => {
    const t = clock.value;

    return particles.map((p) => {
      const angle = noise(p.x, p.y, t) * Math.PI;
      const dx = Math.cos(angle) * SPEED;
      const dy = Math.sin(angle) * SPEED;

      let x = p.x + dx;
      let y = p.y + dy;

      if (x < 0 || x > width || y < 0 || y > height) {
        x = random(0, width);
        y = random(0, height);
      }

      // Mutate directly (for simplicity)
      p.x = x;
      p.y = y;

      return { ...p };
    });
  }, [clock]);

  return (
    <Canvas style={{ flex: 1 }}>
      {animatedParticles.value.map((p, i) => (
        <Circle key={i} cx={p.x} cy={p.y} r={1.8} color={p.color} />
      ))}
    </Canvas>
  );
}
