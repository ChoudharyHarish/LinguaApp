import React, { useEffect, useState } from 'react';
import Auth from '../components/auth';
import jwtDecode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { finishTest, fetchQuestions, setUserAuthenticated, resetQuestions } from '../redux/userSlice';
import ResultModal from '../components/Modal';
import { useNavigate } from 'react-router-dom';

const Questions = ({ questions, setIsModalOpen }) => {
    const [answers, setAnswers] = useState([]);
    const dispatch = useDispatch();

    const handleOptionSelect = (questionId, selectedOption) => {
        const existingAnswerIndex = answers.findIndex(answer => answer.id === questionId);

        if (existingAnswerIndex !== -1) {
            const updatedAnswers = [...answers];
            updatedAnswers[existingAnswerIndex].selected = selectedOption;
            setAnswers(updatedAnswers);
        } else {
            setAnswers([...answers, { id: questionId, selected: selectedOption }]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(finishTest(answers));
        setAnswers([]);
        setIsModalOpen(true);
    }


    return (
        <>
            <div className="bg-darkGreen p-4 rounded-lg mt-28">
                {questions.map((question, index) => (
                    <div key={question._id} className="question p-4 mb-4 bg-white rounded-lg">
                        <p className="text-lg font-semibold mb-2">
                            {index + 1}. {question.question}
                        </p>
                        <div className="options items-center justify-center flex flex-wrap gap-4">
                            {question.options.map((option, optionIndex) => (
                                <div key={optionIndex} className="option">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name={`question_${index}`}
                                            value={option}
                                            onChange={() => handleOptionSelect(question._id, option)}
                                        />
                                        <span className="ml-2">{option}</span>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <button
                className="bg-darkGreen mt-4  text-white font-bold p-3 rounded shadow-lg"
                onClick={(e) => handleSubmit(e)}
            >
                Submit Answers
            </button>
        </>
    );
};



const Home = () => {


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.user);
    const { questions } = useSelector((state) => state.user);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const token = localStorage.getItem("profile");
        if (token) {
            if (Date.now() / 1000 > jwtDecode(token).exp) {
                // alert("Please login to start test");
                dispatch(setUserAuthenticated(false));
                localStorage.clear();
            } else {
                dispatch(setUserAuthenticated(true));
            }
        }
    }, []);



    const startTest = (e) => {
        e.preventDefault();
        if (isAuthenticated) {
            const user = JSON.parse(localStorage.getItem('user'));
            dispatch(fetchQuestions(user.language));
        }
        else {
            alert("Please login to start test");
            navigate('/auth');
        }

    }
    const { score, correct, inCorrect, badge } = useSelector((state) => state.user);

    return (

        <div className='flex flex-col justify-center items-center min-h-screen relative'>
            {!questions ?
                <div className="bg-white rounded-lg shadow-2xl p-4 md:w-2/4 sm:w-4/5 xs:w-full m-auto mt-8 border-1 border-darkGreen">
                    <h2 className="text-2xl font-bold mb-4">Let's Start Learning a Language</h2>
                    <button
                        onClick={(e) => startTest(e)}
                        className="bg-darkGreen text-white font-bold py-2 px-4 rounded mt-4"
                    >
                        Start Test
                    </button>
                </div>

                :
                <Questions questions={questions} setIsModalOpen={setIsModalOpen} />
            }
            <ResultModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                score={score}
                correctCount={correct}
                incorrectCount={inCorrect}
                badge={badge}
            />
            <Auth />
        </div>
    )
}


export default Home;