import { useEffect, useState } from 'react';
import './App.css';
// import { emotions } from './_emotions';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emotions, setEmotions] = useState([]);

  const login = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to log in');
      }

      const res: { access_token: string } = await response.json();

      if (res.access_token) {
        localStorage.setItem('access_token', res.access_token);
      }
    } catch (error) {
      console.log('Login error:', error);
    }
  };

  // const handleClick = () => {
  //   for (let i = 0; i < emotions.length; i++) {
  //     fetch('http://localhost:3000/emotions', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  //       },
  //       body: JSON.stringify(emotions[i]),
  //     })
  //       .then((response) => response.json())
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // };

  useEffect(() => {
    const fetchEmotions = async () => {
      try {
        const response = await fetch('http://localhost:3000/emotions', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch emotions');
        }

        const data = await response.json();
        setEmotions(data);
      } catch (error) {
        console.log('Error fetching emotions:', error);
      }
    };

    fetchEmotions();
  }, []);

  return (
    <div className='flex'>
      <h1>CONNEXION :</h1>
      <h2>Email :</h2>
      <input
        type='text'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <h2>Password :</h2>
      <input
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login}>LOGIN</button>
      {/* <button onClick={handleClick}>INCREMENT</button> */}
      <div className='row'>
        {emotions.map((emotion) => (
          <div
            key={emotion['id']}
            className='emotion'
            style={{ backgroundColor: emotion['color'] }}
          >
            <h3>{emotion['translations'][0]['name']}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
