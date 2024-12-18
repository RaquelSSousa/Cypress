//Cypress - Spec

/*  Cypress 
É uma ferramenta de teste de front-end, uma ferramenta de teste de ponta a ponta, integração, UI, sistema, aceitação, regressão, fumaça, funcionalidade, usabilidade, acessibilidade, performance, carga, stress, segurança, API, contrato, banco de dados, backend, servidor, infraestrutura, rede, ambiente, etc.
*/

// Essa referencia é necessária para que o VSCode consiga autocompletar as funções do Cypress
/// <reference types="cypress" /> 

//describe é uma função que cria um bloco de testes, o primeiro parâmetro é o nome do bloco, o segundo parâmetro é uma função que contém os testes
// => é uma função de flecha, uma função de flecha é uma forma mais curta de escrever uma função, ela é equivalente a: function() {}
describe('PRIMEIRO TESTE', () => {

    //it é uma função que cria um caso de teste
    it('TESTE 1', () => {

        //cy é o objeto que possui todas as funções do cypress
        //visit é uma função que acessa uma página
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/');

        //contains é uma função que verifica se um elemento contém um texto
        cy.contains("GREENKART")

        //get é uma função que seleciona um elemento
        //type é uma função que simula a digitação de um texto
        cy.get('.search-keyword').type('ca')

        //wait é uma função que espera um tempo
        cy.wait(2000)

        //.product é uma classe que representa um produto
        //:visible é um seletor que seleciona elementos visíveis, se não escrever, ele seleciona todos os elementos
        //should é uma função que verifica se uma condição é verdadeira
        //have.length é uma função que verifica o tamanho de um array
        cy.get('.product:visible').should('have.length', 4)

        // Sem o seletor :visible, ele seleciona todos os elementos, mesmo os invisíveis
        cy.get('.product').should('have.length', 5)

        // O alias é um nome que você dá para um elemento, para poder usá-lo em outro lugar .as() é uma função que cria um alias para um elemento.
        cy.get('.products').as('produtosLocal')

        //DOM, parentesco - faz a mesma coisa que a linha de cima limitando à div com a classe products para não precisar usar o seletor :visible
        // @produtosLocal é o chamamento do alias
        cy.get('@produtosLocal').find('.product').should('have.length', 4)

        //find é uma função que seleciona um elemento filho de um elemento
        //eq é uma função que seleciona um elemento de uma lista pelo índice
        //click é uma função que simula um clique
        //adiciona o segundo produto ao carrinho
        cy.get('@produtosLocal').find('.product').eq(1).contains('ADD TO CART').click().then(function(){
            
            //imprime no console do navegador (F12) de forma sincrona, por estar dentro do then
            console.log('Teste') 
        }) 

        console.log('Teste') //imprime no console do navegador (F12) de forma assíncrona
        log('Teste') //imprime no console do cypress

        //each é uma função que itera sobre uma lista de elementos, seus argumentos são Value, Index, Collection ($el, index, $list) - loop
        //cy.get('.products').find('.product') seleciona todos os produtos
        cy.get('@produtosLocal').find('.product').each(($el, index, $list) => {

            //text é uma função que obtém o texto de um elemento
            const textVeg = $el.find('h4.product-name').text()

            //includes é uma função que verifica se uma string contém outra string
            if (textVeg.includes('Cashews')) { //verifica se o texto do produto contém a palavra Cashews

                //wrap é uma função que "embrulha" um elemento para que o Cypress possa interagir com ele
                //$el: Esse é um elemento DOM que você já obteve, de alguma outra operação fora do controle direto do Cypress. $el não é um comando do Cypress, então o Cypress não sabe como interagir diretamente com ele sem "embrulhá-lo" em um comando Cypress.
                // cy.wrap($el): O comando cy.wrap() recebe o elemento DOM $el e o "transforma" em um objeto que o Cypress pode controlar de forma assíncrona, permitindo que você use comandos como .find(), .click(), etc.
                cy.wrap($el).find('button').click() //adiciona o produto ao carrinho
            }
        })

        //FORMA ERRADA DE FAZER
        /*a promise é um objeto que representa a eventual conclusão ou falha de uma operação
         assíncrona, e seu valor resultante, que pode ser um valor não especificado, para o qual a
         promessa é resolvida, ou o motivo da rejeição, para o qual a promessa é rejeitada. 
         Nesse caso, o get é uma função assíncrona, que retorna uma promise, e o then é uma função que
         é executada após a promise ser resolvida.
         */
        // const logo = cy.get('.brand') //seleciona o logo
            // cy.log(logo.text()) //obtém o texto do logo // OU
            // cy.get('.brand').text() //obtém o texto do logo
        /* text() não é uma função do cypress, é uma função do jQuery, o cypress não tem essa função,
        então não funciona. O correto é usar o then para obter o texto do logo após a execução da 
        função anterior (get) ser concluída. 
        Text() usado para retornar ou definir o conteúdo de texto de elementos selecionados. Quando 
        usado para retornar conteúdo, ele retorna o conteúdo de texto de todos os elementos 
        correspondentes, removendo o HTML. Quando usado para definir conteúdo, ele sobrescreve o 
        conteúdo de todos os elementos correspondentes.
        */        

        //FORMA CORRETA DE FAZER
        //then é uma função que recebe uma função como argumento, essa função é executada após a execução da função anterior

        //verifica se o logo está sendo exibido na página
        cy.get('.brand').should('have.text', 'GREENKART')
        
        cy.get('.brand').then(function (logo) { //seleciona o logo
            cy.log(logo.text()) //obtém o texto do logo

        })



    });



})
