import { Link } from 'react-router-dom';

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <div>Nav
      <Link to="/">Home</Link>
      <Link to="/SavedCandidates">Potential Candidates</Link>
    </div>

  )
};

export default Nav;
