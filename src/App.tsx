import { useState } from 'react';
import './App.css'
import { motion, AnimatePresence, Reorder } from 'framer-motion';

function App() {



  function list() {
    const [caixas, setCaixas] = useState(["Caixa 1", "Caixa 2", "Caixa 3"]);

    return (
      <div className='grid'>
        <Reorder.Group axis='x' values={caixas} className="reorder-group" onReorder={setCaixas}>
          {caixas.map((caixa, i) => (
            <Reorder.Item key={caixa} value={caixa}>
              <button className='caixa'>
                <p>{caixa}</p>
              </button>
            </Reorder.Item>
          ))}

        </Reorder.Group>
      </div>
    );
  }



  return (
    list()
  );
}

export default App
