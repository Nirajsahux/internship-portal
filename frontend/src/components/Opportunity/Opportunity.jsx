import React from 'react';

const Opportunity = ({ opportunity }) => {
  const { stipend } = opportunity;

  return (
    <div className="opportunity-card">
      <p><strong>Profile name:</strong>{opportunity.profile_name}</p>
      <p><strong>Company Name:</strong> {opportunity.company_name}</p>
      <p><strong>Stipend:</strong> {`${stipend.salaryValue1} - ${stipend.salaryValue2} ${stipend.currency} (${stipend.salaryType})`}</p>
      <p><strong>Location:</strong> {opportunity.location_names.join(', ')}</p>
      <p><strong>Duration:</strong> {opportunity.duration}</p>
      <p><strong>Start Date:</strong> {opportunity.start_date}</p>
    </div>
  );
};

export default Opportunity;
