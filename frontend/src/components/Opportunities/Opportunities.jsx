import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Opportunity from '../Opportunity/Opportunity';

function Opportunities() {
  const [opportunities, setOpportunities] = useState([]);

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const response = await axios.get('https://internshipportal-uu4z.onrender.com/api/opportunities');
        const internshipsMeta = response.data[0].internships_meta;
        
        const details = Object.values(internshipsMeta).flat(); // Flatten the nested array
        setOpportunities(details);
      } catch (error) {
        console.error('Error fetching opportunities:', error);
      }
    };

    fetchOpportunities();
  }, []);

  return (
    <div className='flex flex-col gap-4'>
      {opportunities.map((opportunity, index) => (
        <div key={index}>
        <Opportunity opportunity={opportunity} />
        <button className='bg-gray-600 px-4 py-2 rounded text-white'>Apply</button>
        </div>
      ))}
      
    </div>
  );
}

export default Opportunities;
