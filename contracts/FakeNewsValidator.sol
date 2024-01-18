// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract FakeNewsValidator {
    address public owner; // Variável que armazena o endereço do proprietário do contrato

    // Construtor do contrato, executado apenas uma vez durante a implantação
    constructor() {
        owner = msg.sender; // Define o criador do contrato como o proprietário
    }

    // Função pseudo-aleatória para determinar verdadeiro ou falso
    function getRandomBool(uint256 _newsId) private view returns (bool) {
        uint256 random = uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, _newsId)));
        return random % 2 == 0;
    }

    // Função para obter detalhes de uma notícia existente com base no ID
    function getNewsItem(uint256 _newsId) external view returns (bool) {
        return getRandomBool(_newsId);
    }
}
