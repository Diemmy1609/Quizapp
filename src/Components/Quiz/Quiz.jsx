import  { useEffect, useState } from 'react';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('src/assets/data.json'); // Adjust the path as needed
      const data = await response.json();
      setQuestions(data.questions);
    };

    fetchData();
  }, []);

  const handleOptionClick = (option) => {
    setSelectedOptions(prev => ({
      ...prev,
      [currentIndex]: option,
    }));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, questions.length - 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const submitAnswers = () => {
    const correctAnswers = questions.reduce((acc, question, index) => {
      return acc + (selectedOptions[index] === question.answer ? 1 : 0);
    }, 0);
    setResult(`You got ${correctAnswers} out of ${questions.length} correct!`);
  };

  if (!questions.length) return <div>Loading...</div>;

  const { question, options } = questions[currentIndex];

  return (
    <div className="container">
      <div className='w-full bg-white text-gray-800 flex flex-col gap-5 rounded-3xl p-10'>
        <h1 className='flex justify-center text-2xl font-Jost'>Quiz App</h1>
        <hr className='h-[2px] rounded-none bg-gray-700'/>
        <h2 className='text-xl font-bold font-Lobster'>{`${currentIndex + 1}. ${question}`}</h2>
        <ul>
          {options.map((option, index) => (
            <li
              key={index}
              className={`flex items-center h-[50px] pl-[15px] border border-gray-500 rounded-lg mb-5 text-lg cursor-pointer ${selectedOptions[currentIndex] === option ? 'bg-gray-300' : ''}`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
        <div className="flex flex-col justify-center gap-2 sm:flex-row md:gap-4 lg:pt-5 xl-pt-10">
          <button className="btn btn_outline" onClick={handlePrev} disabled={currentIndex === 0}>
            <span>Prev</span>
          </button>
          {currentIndex < questions.length - 1 ? (
            <button className="btn btn_outline" onClick={handleNext}>
              <span>Next</span>
            </button>
          ) : (
            <button className="btn btn_outline" onClick={submitAnswers}>
              <span>Submit</span>
            </button>
          )}
        </div>
        <div className="index">{`${currentIndex + 1} of ${questions.length} questions`}</div>
        {result && <div className="result-message">{result}</div>}
      </div>
    </div>
  );
}

export default Quiz;
