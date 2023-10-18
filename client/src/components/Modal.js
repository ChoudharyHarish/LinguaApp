import React from 'react';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const customStyles = {
  content: {
    transform: 'translate(0,10%)',
  },
};

Modal.setAppElement('#root');

const ResultModal = ({ isOpen, onClose, score, correctCount, incorrectCount, badge }) => {
  
    const {user} = useSelector((state) => state.user);
  
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Result Modal"
      className="mx-auto my-28  w-4/5 rounded-lg shadow-md p-6 bg-white text-center border-1 border-darkGreen"
    >
      <h2 className="text-2xl font-semibold mb-4">Test Results</h2>
      <p className="mb-2">Score: {score}</p>
      <p className="mb-2">Correct Answers: {correctCount}</p>
      <p className="mb-2">Incorrect Answers: {incorrectCount}</p>
      {badge && (
        <div className="mb-4">
          <p className="mb-2">You've earned a badge: {badge.name}!</p>
          <img src={badge.icon} alt="Badge" className="w-16 mx-auto" />
        </div>
      )}
      <div className='flex flex-col gap-2 mx-auto'>
      <button
        onClick={onClose}
        className="bg-darkGreen text-white font-bold py-2 px-4 mx-auto rounded mt-4"
      >
        Close
      </button>
      <Link
      to={`/leaderBoard?lang=${user?.language}`}
        className="bg-darkGreen text-white font-bold py-2 px-4 mx-auto rounded mt-4"
      >
        View Leaderboard
      </Link>
      </div>

    </Modal>
  );
};

export default ResultModal;
