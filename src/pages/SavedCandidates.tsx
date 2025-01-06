import { useState, useEffect } from 'react';
import { Candidate} from '../interfaces/Candidate.interface';
  

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const candidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(candidates);
  }, []);
  
  return (
    <>
      <h1>Potential Candidates</h1>
      {savedCandidates.length > 0 ? (
        <ul>
          {savedCandidates.map((candidate, index) => (
            <div className="card" key={index}>
              <img src={candidate.avatar_url} alt={candidate.name} width="50" height="50" />
              <h3>{candidate.name}</h3>
              <p>Username: {candidate.username}</p>
              <p>Location: {candidate.location}</p>
              <p>Email: {candidate.email}</p>
              <p>Company: {candidate.company}</p>
              <a href={candidate.html_url}>GitHub Profile</a>
            </div>
          ))}
        </ul>
      ) : (
        <p>No saved candidates yet!</p>
      )}
    </>
  );
};

export default SavedCandidates;
