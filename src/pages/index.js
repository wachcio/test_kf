import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Zaimportuj Axios

function App() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Użyj Axios do wczytania danych z pliku JSON
    axios
      .get('http://wachcio.pl/questions.json')
      .then((response) => {
        setQuestions(response.data.BHP);
        console.log(response.data);
      })
      .catch((error) =>
        console.error('Błąd wczytywania danych z pliku JSON:', error)
      );
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">Pytania i odpowiedzi</h1>
      <ol className="list-decimal list-inside">
        {questions.map((question, index) => (
          <li
            key={index}
            className="mb-4 bg-white p-4 shadow rounded text-lg font-semibold"
          >
            {question.question}
            {/* <p className="text-lg font-semibold">{question.question}</p> */}
            <ol
              type="a"
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
      </ol>
    </div>
  );
}

export default App;
