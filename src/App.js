//Bloco de importações do código 
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import './style.css';
import api from "./Services/api"

function App(){
  const [input, setInput] = useState('');
  const [cep, setCEP] = useState({});

  async function handleSearch (){

    if(input === ''){
      alert("Preencha algum CEP!")
      return;
    }
  
    //Try = executa o que você quer aconteça 
    //Catch = Caso o Try dê errado é utilizado o Catch
    try{
      const response = await api.get(`${input}/json`)
      setCEP(response.data)
      setInput("")
    }catch{
      alert("Erro ao buscar CEP!")
      setInput("")
    }
  }

return( 
  <div className="container">
  <h1 className="title">Buscador CEP</h1>

  <div className="containerInput">
    <input
    type="text"
    placeholder="Digite seu CEP..."
    value={input} 
    //OnChange pega qualquer valor que for inserido em Input e altera o valor de Input 
    onChange={(e) => setInput(e.target.value)}
  /> 

  <button className="buttonSearch" onClick={handleSearch}>  
    <FiSearch size={25} color="#FFF"/> 
  </button>
  </div>

  {Object.keys(cep).length > 0 &&( //Faz um requisito que irá aparecer a barra de informações apenas quando ter alguma informação inserida
    <main className="main">
      <h2>CEP: {cep.cep}</h2>
      <span>Rua: {cep.logradouro}</span>
      <span>Complemento: {cep.complemento}</span>
      <span>Bairro: {cep.bairro}</span>
      </main>
  )}
  </div>
)
}

  
export default App; //está exportando toda a função "App", para que ela seja utilizada em qualquer outra parte do código
