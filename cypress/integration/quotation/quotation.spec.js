describe('Quotation Testing', () => {
    it('Quotation Testing Create',() => {
        cy.visit('http://localhost:3000/login')
        .then(() => {
            // CHECK PATHNAME
            cy.location('pathname').should('equal', '/login')

            // CHECK TITLE
            cy.title().should('eq', 'Login');

            // TYPE EMAIL
            cy.get('[name=email]').type("superadmin")

            // TYPE PASSWORD
            cy.get('[name=password]').type("password")

            // CLICK BUTTON
            return cy.contains('button', 'Login').click();                                
        })
        .then(() => {
            // CHECK PATHNAME
            cy.location('pathname').should('equal', '/')

            // CHECK TITLE
            cy.title().should('eq', 'Dashboard');

            // GET TOKEN 
            // const token = window.localStorage.getItem('auth._token.local')
            // expect(token).to.be.a('string')        

            // VISIT QUOTATION ADD
            return cy.visit("http://localhost:3000/marketing/quotation/add");        
        })
        .then(() => {
            // CHECK PATHNAME
            cy.location('pathname').should('equal', '/marketing/quotation/add')

            // CHECK TITLE
            cy.title().should('eq', 'Penawaraan');

            // CHECK CODE
            cy.get('[name=code]').should("include.value","QN.");

            
            var today = new Date();
            let year = today.getFullYear().toString();
            let month = (today.getMonth()+1).toString();
            let day = today.getDate().toString();

            var date = year + '-' + (month.length == 1 ? '0'+month : month) + '-' + (day.length == 1 ? '0'+day : day) 

            // CHECK DATE
            cy.get('[name=date]').should("have.value",date);

            cy.get('label[for=customer_id]')
                .parent()
                .siblings()
                .find(".v-select")
                .find("input[class=vs__search]")
                .focus();
                // .invoke('addClass','vs--open');

            cy.get('label[for=customer_id]')
                .parent()
                .siblings()
                .find(".v-select")
                .find(".vs__dropdown-menu")
                .find("li")
                .first()
                .click();

            cy.get('label[for=customer_id]')
                .parent()
                .siblings()
                .find(".v-select")
                .find("span[class=vs__selected]")
                .should("include.text","customer");
                
            // vs__selected

            // cy.get('label[for=customer_id]')
            //     .parent()
            //     .siblings()
            //     .find(".v-select")
            //     .find("input")
            //     .focus()
            //     .then(() => {
            //         cy.get('label[for=customer_id]')
            //             .parent()
            //             .siblings()
            //             .find(".v-select")
            //             .find(".vs__dropdown_menu")                        
            //             // .find('li');
            // });
        })
    })

    // it('Quotation Testing Updated',() => {
    //     cy.title().should('eq', 'Dashboard').then(() => {
    //     }); 
    // })

    // it('Quotation Testing Deleted',() => {
    //     cy.title().should('eq', 'Dashboard').then(() => {
    //     }); 
    // })
});