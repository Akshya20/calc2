import { useState } from "react";

function App() {
  const [input, setInput] = useState('');
  const [count,setcount]=useState('');

  const handleClick = (value) => {
    setInput((prevInput) => prevInput + value); 
  };

  const handleOperation = (op) => {
    setInput((prevInput) => prevInput + op); 
  };

  const handleEquals = () => {
    try {
      const result = calculateResult(input); 
      if (result === Infinity) {
      setInput("Infinity"); 
      setcount("Infinity");
       } else if (result === NaN) {
      setInput("NaN"); 
      setcount("NaN");
       } else {
      setInput(result.toString());
      setcount(result.toString());
     }
    } catch (error) {
      setInput('Error'); 
    }
  };

  const handleClear = () => {
    setInput(''); 
    setcount('');
  };
 
  
  const calculateResult = (expression) => {
    
    const tokens = expression.split(/\s*(\+|\-|\*|\/)\s*/).filter(Boolean);
    
    
    let pass1Result = [];
    let i = 0;
    
    
    while (i < tokens.length) {
        if (tokens[i] === '*' || tokens[i] === '/') {
            let prevNum = parseInt(pass1Result.pop(), 10);  
            let operator = tokens[i];  
            let nextNum = parseInt(tokens[i + 1], 10);  

           
            if (operator === '*') {
                pass1Result.push(prevNum * nextNum);
            } else if (operator === '/') {
                if (nextNum === 0) return Infinity; 
                pass1Result.push(prevNum / nextNum);
            }
            i += 2; 
        } else {
           
            pass1Result.push(tokens[i]);
            i++;
        }
    }

    
    let result = parseInt(pass1Result[0], 10);
    for (let i = 1; i < pass1Result.length; i += 2) {
        const operator = pass1Result[i];
        const nextValue = parseInt(pass1Result[i + 1], 10);

        
        if (operator === '+') {
            result += nextValue;
        } else if (operator === '-') {
            result -= nextValue;
        }
    }

    return result;
};

  return (
    <div>
      
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <input type="text" value={input} readOnly></input>
      </div>
      <div>{count}</div>




      <div>
      
        <button type="button" onClick={() => handleClick("7")}>7</button>
        <button  type="button" onClick={() => handleClick("8")}>8</button>
        <button type="button" onClick={() => handleClick("9")}>9</button>
        <button  type="button" onClick={() => handleOperation("+")}>+</button>
     

     
        <button  type="button" onClick={() => handleClick("4")}>4</button>
        <button  type="button" onClick={() => handleClick("5")}>5</button>
        <button  type="button" onClick={() => handleClick("6")}>6</button>
        <button  type="button" onClick={() => handleOperation("-")}>-</button>
     
 
        <button type="button" onClick={() => handleClick("1")}>1</button>
        <button type="button" onClick={() => handleClick("2")}>2</button>
        <button type="button" onClick={() => handleClick("3")}>3</button>
        <button type="button" onClick={() => handleOperation("*")}>*</button>
      
      
        <button type="button" onClick={handleClear }>C</button>
        <button type="button" onClick={() => handleClick("0")}>0</button>
        <button type="button" onClick={ handleEquals}>=</button>
        <button type="button" onClick={() => handleOperation("/")}>/</button>
      </div>
    </div>
   
  );
}

export default App;
