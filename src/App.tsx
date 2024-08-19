import { useState, useCallback, useEffect } from 'react';
function App() {
  const [rangeValue, setRangeValue] = useState(8);
  const [password, setPassword] = useState('');
  const [includeSpecialChars, setIncludeSpecialChars] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const generatePassword = useCallback(() => {
    const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    let characterSet = lowercaseLetters + uppercaseLetters;

    if (includeSpecialChars) {
      characterSet += specialChars;
    }

    if (includeNumbers) {
      characterSet += numbers;
    }

    let password = '';
    for (let i = 0; i < rangeValue; i++) {
      const randomIndex = Math.floor(Math.random() * characterSet.length);
      password += characterSet[randomIndex];
    }

    return password;
  }, [includeSpecialChars, includeNumbers, rangeValue]);


  useEffect(() => {
    const generatedPassword = generatePassword()
    setPassword(generatedPassword)
  }, [includeSpecialChars, includeNumbers, rangeValue])

  const handleGenerateClick = () => {
    const generatedPassword = generatePassword()
    setPassword(generatedPassword)
  };

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(password)
    setShowToast(true)
  }

  const Toast: React.FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => {
    useEffect(() => {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Toast will disappear after 3 seconds

      return () => clearTimeout(timer);
    }, [onClose]);

    return (
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-3">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 12a1 1 0 110-2 1 1 0 010 2zM10 6a1 1 0 011 1v4a1 1 0 01-2 0V7a1 1 0 011-1z" />
        </svg>
        <span>{message}</span>
        <button className="bg-gray-700 p-1 rounded-full ml-auto" onClick={onClose}>
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.293 9.293a1 1 0 011.414 0L10 10.586l2.293-2.293a1 1 0 111.414 1.414L11.414 12l2.293 2.293a1 1 0 01-1.414 1.414L10 13.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 12 6.293 9.707a1 1 0 010-1.414z" />
          </svg>
        </button>
      </div>
    );
  };


  return (
    <div className="bg-gray-100 p-6 flex justify-center items-center h-screen">
      {showToast && <Toast message="Password Copy Successfully !" onClose={() => setShowToast(false)} />}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="textField" className="block text-gray-700 font-bold mb-2">Super Strong Password</label>
          <input readOnly id="textField" type="text" className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={password} />
        </div>
        <div className="mb-4 flex space-x-4">
          <button id="generateButton" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none" onClick={handleGenerateClick}>
            Generate
          </button>
          <button id="copyButton" className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none" onClick={handleCopyPassword}>
            Copy
          </button>
        </div>
        <div className="mb-4">
          <label htmlFor="rangeSlider" className="block text-gray-700 font-bold mb-2">Choose a Number (8-100):</label>
          <input
            id="rangeSlider"
            type="range"
            min="8"
            max="100"
            value={rangeValue}
            onChange={(e) => setRangeValue(e.target.valueAsNumber)}
            className="w-full"
          />
          <span id="rangeValue" className="block text-center mt-2">{rangeValue}</span>
        </div>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox text-blue-500" checked={includeSpecialChars} onChange={(val) => { setIncludeSpecialChars(val.target.checked) }} />
            <span className="ml-2 text-gray-700">Special Characters</span>
          </label>
        </div>
        <div>
          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox text-blue-500" checked={includeNumbers} onChange={(val) => { setIncludeNumbers(val.target.checked) }} />
            <span className="ml-2 text-gray-700">Numbers</span>
          </label>
        </div>
      </div>
    </div>
  )
}

export default App
