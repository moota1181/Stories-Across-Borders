import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Navbar from './components/Navbar';
import TravelStoryCard from './components/TravelStoryCard'; // Assuming you have this component
import { BrowserRouter as Router, Route, Switch, useNavigate } from 'react-router-dom';
import axios from 'axios';

const root = ReactDOM.createRoot(document.getElementById('root'));

function Home() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [allStories, setAllStories] = useState([]); // Fixed typo from allStores to allStories

  // Fetch all stories
  const getAllStories = async () => {
    try {
      const response = await axios.get('/getAllStories'); // Updated endpoint
      if (response.data) {
        setAllStories(response.data.stories); // Assuming response data has a 'stories' field
      }
    } catch (error) {
      console.error('Error fetching stories:', error);
    }
  };

  // Fetch user info
  const getUserInfo = async () => {
    try {
      const response = await axios.get('/getUser'); // Updated endpoint
      setUserInfo(response.data); // Directly set response data
      navigate('/dashboard', { replace: true });
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  const handleEditStory = (data) => {
    // Implement edit story logic
  };

  const updateFavoriteStory = (data) => {
    // Implement update favorite story logic
  };

  const handleViewStory = (data) => {
    // Implement view story logic
  };

  useEffect(() => {
    getAllStories();
    getUserInfo();
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} />
      <div className="container mx-auto py-10">
        <div className="flex gap-7">
          <div className="flex-1">
            {allStories.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {allStories.map((item) => (
                  <TravelStoryCard
                    key={item._id}
                    imgUrl={item.image.url}
                    title={item.title}
                    story={item.story}
                    date={item.dateOfVisit}
                    visitedLocation={item.location}
                    isFavorite={item.isFavorite}
                    onEdit={() => handleEditStory(item)}
                    onClick={() => handleViewStory(item)}
                    onFavouriteClick={() => updateFavoriteStory(item)}
                  />
                ))}
              </div>
            ) : (
              <p>No stories available</p>
            )}
          </div>
          <div className="w-[320px]"></div>
        </div>
      </div>
    </>
  );
}

root.render(
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/update-user" component={UpdateUser} /> {/* Assuming UpdateUser is a defined component */}
      <Route path="/add-story" render={() => <StoryForm mode="add" />} /> {/* Assuming StoryForm is a defined component */}
      <Route path="/edit-story/:id" render={() => <StoryForm mode="edit" />} /> {/* Assuming StoryForm is a defined component */}
    </Switch>
  </Router>
);

export default Home;
