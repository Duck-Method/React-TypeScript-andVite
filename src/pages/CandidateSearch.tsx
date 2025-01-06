import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface.tsx';


const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<Candidate[]>([]);
  const [logins, setLogins] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    console.log('useEffect called');
    async function fetchCandidate() {
      try{
        console.log('Fetching candidates logins...');
        const data = await searchGithub();
        
        console.log('Data fetched:', data);
        const userLogins = data.map((candidate: any) => candidate.login);
        setLogins(userLogins);
      } catch (err) {
        console.log('Error fetching candidates login:', err);
      }; 
    }
    fetchCandidate();
    console.log('Call made');
  }, []);

  useEffect (() => {
    console.log('useEffect #2 called');
    const fetchCandidateDetails = async () => {
      try {
        const candidateDetails = await Promise.all(
          logins.map(async (login: string) => {
            const userData = await searchGithubUser(login);
          return userData;
        })
      );

      const appendMessage = [
        ...candidateDetails, 
        {
          name: 'No more candidates available',
          username: '',
          location: '',
          avatar_url: '',
          email: '',
          html_url: '',
          company: '',
        }];

      console.log('Candidate details fetched:', candidateDetails);
      setCandidate(appendMessage);
      } catch (err) {
        console.log('Error fetching candidate details:', err);
      }
    };
    
    if (logins.length > 0) {
    fetchCandidateDetails();
    }
  }, [logins]);

  const handleSaveCandidate = (candidate: Candidate) => {
    const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    savedCandidates.push(candidate);
    localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
    handleNextCandidate();
  }

  const handleNextCandidate = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % candidate.length);
  };

  const currentCandidate = candidate[currentIndex];

  return (
    <div>
      <h1>Candidate Search</h1>
      {currentCandidate ? (
        currentCandidate.name === 'No more candidates available' ? (
        <div> 
          <h2>No more candidates available</h2>
        </div>  
        ) : (
        <div className="card">
          <img src={currentCandidate.avatar_url} alt={currentCandidate.name} />
          <h3>Name: {currentCandidate.name}</h3>
          <p>Username: {currentCandidate.username}</p>
          <p>Location: {currentCandidate.location}</p>
          <p>Email: {currentCandidate.email}</p>
          <p>Company: {currentCandidate.company}</p>
          <a href={currentCandidate.html_url}>GitHub Profile</a>
          <div className="buttons">
            <button onClick={handleNextCandidate}>-</button>
            <button onClick={() => handleSaveCandidate(currentCandidate)}>+</button>
          </div>
        </div>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
};

export default CandidateSearch;
