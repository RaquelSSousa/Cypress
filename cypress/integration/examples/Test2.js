/// <reference types="cypress" />
 
describe('SEGUNDO TESTE', function() 
{
 
    it('My FirstTest case',function() {
    
    
        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/")
        cy.get('.search-keyword').type('ca')
        cy.wait(2000)

        cy.get('.products').as('productLocator')

        // adiciona os produtos ao carrinho
        cy.get('@productLocator').find('.product').each(($el, index, $list) => {
        
        const textVeg=$el.find('h4.product-name').text()
        if(textVeg.includes('Cashews'))
        {
        $el.find('button').click()
        }
        })

        // clicar no carrinho
        cy.get('.cart-icon > img').click()
        cy.contains('PROCEED TO CHECKOUT').click()
        cy.contains('Place Order').click()
        cy.get('select').select('Brazil').should('have.value','Brazil')
    
    
    
    }  )
    
    
    
}  )