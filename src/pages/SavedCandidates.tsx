import { useState, useEffect } from 'react';
import { Candidate} from '../interfaces/Candidate.interface';
  

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  // gets the saved candidates from the local storage
  useEffect(() => {
    const candidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(candidates);
  }, []);
  
  return (
    <div>
      <h1>Potential Candidates</h1>
      {savedCandidates.length > 0 ? (
        // this is the saved clients data that is displayed as a table the <ul> tag allows for the data to be propogated into the website despite the anount of candidates saved
          <ul>
                  {/* thiss is the titles for the columns */}
            <div className="cardSavedTable">
                <div className="cardSavedLayout" >
                  <p>Image</p>
                </div>
                <div className="cardSavedLayout" >
                  <p>Name</p>
                </div>
                <div className="cardSavedLayout" >
                  <p>Location</p>
                </div>
                <div className="cardSavedLayout" >
                  <p>Email</p>
                </div>
                <div className="cardSavedLayout" >
                  <p>Company</p>
                </div>
                <div className="cardSavedLayout" >
                  <p>GitHub Profile</p>
                </div>
            </div>
            {savedCandidates.map((candidate, index) => (
              <div className="cardSavedTable" key={index}>
                <div className="cardSavedLayout" >
                  <img src={candidate.avatar_url} alt={candidate.name} width="50" height="50" />
                </div>
                <div className="cardSavedLayout" >
                  <h3>{candidate.name}</h3>
                </div>
                <div className="cardSavedLayout" >
                  <p>{candidate.location}</p>
                </div>
                <div className="cardSavedLayout" >
                  <p>{candidate.email}</p>
                </div>
                <div className="cardSavedLayout" >
                  <p>{candidate.company}</p>
                </div>
                <div className="cardSavedLayout" >
                  <a href={candidate.html_url}>GitHub Profile</a>
                </div>
              </div>
            ))}
          </ul>
      ) : (
        <div className="cardEnd" >
          <h2>No saved candidates yet!</h2>
        </div>
      )}
    </div>
  );
};

export default SavedCandidates;
