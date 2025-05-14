'use client';

import { emotions } from '@/utils/emotions.data';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [emotionsList, setEmotions] = useState<typeof emotions>([]);

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const res = await fetch('http://localhost:3000/auth/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'admin@gmail.com',
          password: 'Lapin123+',
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // Sauvegarder le token dans le localStorage ou cookie si besoin
        localStorage.setItem('token', data.access_token);
      } else {
      }
    } catch (err) {
      console.log('Une erreur est survenue.', err);
    }
  };

  const seedEmotions = async () => {
    const endpoint = 'http://localhost:3000/emotions'; // remplace par ton URL réelle

    for (const emotion of emotions) {
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(emotion),
        });

        if (!res.ok) {
          const text = await res.text();
          console.error(
            `Erreur sur "${emotion.translations[0].name}" :`,
            res.status,
            text
          );
        } else {
          console.log(`✔️ Emotion "${emotion.translations[0].name}" créée`);
        }
      } catch (error) {
        console.error(`❌ Erreur réseau :`, error);
      }
    }
  };

  const getEmotions = async () => {
    const endpoint = 'http://localhost:3000/emotions'; // remplace par ton URL réelle
    try {
      const res = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!res.ok) {
        const text = await res.text();
        console.error(
          `Erreur de récupération des émotions :`,
          res.status,
          text
        );
      } else {
        const data = await res.json();
        setEmotions(data);
      }
    } catch (error) {
      console.error(`❌ Erreur réseau :`, error);
    }
  };

  useEffect(() => {
    getEmotions();
  }, []);

  const gradientColors = emotions.map((e) => e.color).join(', ');
  const gradient = `linear-gradient(to right, ${gradientColors})`;

  const gradientStops = emotions
    .map((e, i, arr) => {
      const percent = Math.round((i / (arr.length - 1 || 1)) * 100);
      return `${e.color} ${percent}%`;
    })
    .join(', ');

  const radialGradient = `radial-gradient(circle, ${gradientStops})`;

  const conicGradient = `conic-gradient(from 0deg at 50% 50%, ${gradientStops})`;

  return (
    <div>
      <p>Dashboard</p>
      <button className='btn btn-primary' onClick={handleSignIn}>
        Sign In
      </button>
      <button className='btn btn-primary' onClick={seedEmotions}>
        create emotions
      </button>
      <div>
        {emotions.map((emotion, i) => (
          <div
            key={i}
            className='flex items-center justify-between p-4 border-b'
          >
            <div className='flex items-center'>
              <div
                className='w-8 h-8 rounded-full'
                style={{ backgroundColor: emotion.color }}
              ></div>
              <span className='ml-2'>{emotion.translations[0].name}</span>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          height: '200px',
          width: '100%',
          background: gradient,
          borderRadius: '1rem',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
          margin: '2rem 0',
        }}
      ></div>
      <div
        style={{
          height: '300px',
          width: '100%',
          background: radialGradient,
          borderRadius: '1rem',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
          margin: '2rem 0',
        }}
      ></div>
      <div
        style={{
          height: '80vw',
          width: '80vw',
          background: conicGradient,
          borderRadius: '1rem',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
          margin: '2rem auto',
          padding: '8px',
        }}
      >
        <div
          style={{
            height: '100%',
            width: '100%',
            background: 'black',
            borderRadius: '.8rem',
          }}
        ></div>
      </div>
      <div>
        {emotionsList.map((emotion, i) => (
          <div
            key={i}
            className='flex items-center justify-between p-4 border-b'
          >
            <div className='flex items-center'>
              <div
                className='w-8 h-8 rounded-full'
                style={{ backgroundColor: emotion.color }}
              ></div>
              <span className='ml-2'>{emotion.translations[0].name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
