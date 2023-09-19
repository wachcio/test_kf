import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Zaimportuj Axios

function App() {
  const [url, setUrl] = useState('http://egzaminkf.wachcio.pl/');
  const [questions, setQuestions] = useState([]);
  const [activeSubjectQuestions, setActiveSubjectQuestions] = useState([]);
  const [activeSubjectIndex, setActiveSubjectIndex] = useState(0);
  const [subjects, setSubjects] = useState([
    'Radiotechnika',
    'BHP',
    'Procedury i zwyczaje operatorskie',
    'Przepisy dotyczące radiokomunikacyjnej służby amatorskiej',
  ]);

  const changeSubject = (index) => {
    setActiveSubjectIndex(index);
  };

  useEffect(() => {
    // Użyj Axios do wczytania danych z pliku JSON
    axios
      .get(`${url}questions.json`)
      .then((response) => {
        setQuestions(response.data);
        setActiveSubjectQuestions(response.data[subjects[activeSubjectIndex]]);
        console.log(questions);
      })
      .catch((error) =>
        console.error('Błąd wczytywania danych z pliku JSON:', error)
      );
  }, [subjects, activeSubjectIndex]);

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      {subjects.map((subject, index) => (
        <button
          onClick={() => changeSubject(index)} // Popraw wywołanie funkcji changeSubject
          className="mb-4 bg-white p-2 m-2 shadow rounded font-normal"
          key={index}
        >
          {subject}
        </button>
      ))}
      <h1 className="text-3xl font-bold mb-4">Pytania i odpowiedzi</h1>
      <h2 className="text-2xl font-bold mb-4">
        {subjects[activeSubjectIndex]}
      </h2>
      <ul>
        {activeSubjectQuestions.map((question, index) => (
          <li
            key={index}
            className="mb-4 bg-white p-4 shadow rounded text-lg font-semibold"
          >
            {question.question}
            {question.img ? (
              <img
                src={url + '/img/' + (index + 1) + '.png'}
                alt="Opis obrazka"
              />
            ) : (
              ''
            )}
            <ol
              className="li pl-4 mt-2 text-base font-normal"
              style={{ listStyleType: 'lower-alpha' }}
            >
              {question.options.map((option, optionIndex) =>
                question.correct_answer_index === optionIndex ? (
                  <li key={optionIndex} className="text-green-800">
                    {option}
                  </li>
                ) : (
                  <li key={optionIndex}>{option}</li>
                )
              )}
            </ol>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
