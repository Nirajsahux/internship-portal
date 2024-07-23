import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    if (!userInfo || !userInfo.token) {
      navigate('/login');
    } else {
      const fetchUser = async () => {
        try {
          const { data } = await axios.get('/api/users/profile', {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          });

          setName(data.name);
          setEmail(data.email);
          setAge(data.age);
          setDateOfBirth(data.dateOfBirth);
          setImage(data.image);
        } catch (error) {
          console.error('Error fetching user data:', error);
          setError('Failed to fetch user data. Please try again.');
          navigate('/login');
        }
      };

      fetchUser();
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        '/api/users/profile',
        { name, email, age, dateOfBirth, image },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      localStorage.setItem('userInfo', JSON.stringify(data));
      alert('Profile updated');
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please try again.');
    }
  };

  return (
    <div>
      {error && <p className='text-red-500'>{error}</p>}
      <form onSubmit={submitHandler} className="flex flex-col gap-3 p-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-box p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-box p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="input-box p-2 border rounded"
        />
        <input
          type="date"
          placeholder="Date of Birth"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          className="input-box p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="input-box p-2 border rounded"
        />
        <button type="submit" className="bg-orange-700 p-2 rounded text-white active:bg-orange-800">
          Update
        </button>
      </form>
    </div>
  );
}

export default Dashboard;
