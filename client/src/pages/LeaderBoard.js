import React, { useState, useEffect } from 'react';
import { getLeaderBoard } from '../api/api';
import { useNavigate, useLocation } from 'react-router-dom';
import Auth from '../components/auth';


const Leaderboard = () => {

    const [leaderboardData, setLeaderboardData] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState('All'); // Default to show all
    const languages = ['english', 'spanish', 'french', 'german', 'hindi', 'japanese'];
    const [leaderBoard, setLeaderBoard] = useState(true);

    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const lang = searchParams.get('lang');

    useEffect(() => {
        const getData = async (lang) => {
            try {
                const response = await getLeaderBoard(lang);
                setLeaderboardData(response.data.scores);
            }
            catch (error) {
                if (error.response.data === 'Token Expired Please Login Again') {
                    alert(error.response.data);
                    navigate('/auth');

                }
                else if (error.response.data === "Leaderboard not found") {
                    setLeaderBoard(false)
                }
            }
        }
        getData(lang)
        setSelectedLanguage(lang);
    }, [lang]);

    //   setSelectedLanguage(lang);

    const handleChange = (e) => {
        navigate(`/leaderBoard?lang=${e.target.value}`);
    }

    return (
      <>
        <div className="container mx-auto mt-10 py-28">
            <h2 className="text-2xl font-semibold mb-4">Leaderboard</h2>

            <div className="mb-4">
                <label className="mr-2">View Leaderboard for:</label>
                <select
                    className="border rounded p-1"
                    onChange={(e) => handleChange(e)}
                    value={selectedLanguage}
                >
                    {languages.map((language) => (
                        <option key={language} value={language}>
                            {language}
                        </option>
                    ))}
                </select>
            </div>
            
            {leaderBoard ? (
        leaderboardData.length > 0 ? (
          <table className="min-w-full border">
            <thead>
              <tr>
                <th className="border">Rank</th>
                <th className="border">Username</th>
                <th className="border">Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.slice(0, 5).map((user, index) => (
                <tr key={user.userid}>
                  <td className="border">{index + 1}</td>
                  <td className="border">{user.username}</td>
                  <td className="border">{user.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No leaderboard data available for this language.</p>
        )
      ) : (
        <p>Leaderboard not available for this language.</p>
      )}

        </div>

        <Auth/>

      </>

    );
};

export default Leaderboard;
