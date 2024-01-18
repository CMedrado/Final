const express = require('express');
const { Web3 } = require('web3');

const app = express();
const PORT = 3000;

console.log('Inicializando Web3 com HTTP Provider.');
const web3 = new Web3('http://localhost:8545'); // URL do seu nó Besu

// Carregar o contrato inteligente
console.log('Carregando ABI e endereço do contrato.');
const contractABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_newsId",
        "type": "uint256"
      }
    ],
    "name": "getNewsItem",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]
const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // Coloque o endereço do seu contrato aqui

// Crie uma instância do contrato
console.log('Criando instância do contrato.');
const contract = new web3.eth.Contract(contractABI, contractAddress);

app.get('/check-news/:newsId', async (req, res) => {
  const { newsId } = req.params;
  console.log(`Recebido newsId: ${newsId}`);

  // Validar o parâmetro de entrada
  if (!newsId || isNaN(newsId)) {
      console.error('ID da notícia inválido:', newsId);
      return res.status(400).json({ error: 'ID da notícia inválido.' });
  }

  try {
    console.log(`Buscando informações para o ID da notícia: ${newsId}`);
    const result = await contract.methods.getNewsItem(newsId).call();
    
    // result é true ou false
    console.log('Informações da notícia recebidas:', result);
    const item = {
        validity: result,
    };

    res.json({ item });
  } catch (error) {
      console.error('Erro ao acessar o contrato:', error);
      console.error('Detalhes do erro:', error.reason, error.receipt);
      if (error.message.includes('revert')) {
          res.status(404).json({ error: 'ID da notícia não encontrado.' });
      } else {
          res.status(500).json({ error: 'Erro ao acessar o contrato.' });
      }
  }
});


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
