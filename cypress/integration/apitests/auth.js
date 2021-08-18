///  <reference types = "Cypress"/> 

describe('create the member acccount tests', ()=> {
    var baseURL = "https://www.ck12.org";
    var cookie;
    var login;
    var emailID;

    it('create the member account with auth API', () => {       
        cy.request({
            // 1st call
            method: 'POST',
            url:  baseURL + '/auth/create/member?',
            headers: {
                'Accept': 'application/json',
                'content-type': 'application/x-www-form-urlencoded'
              },
              form: true, // set the form as true while sending the parameter value in the form data for cypress
              // convert the form data into body to send it
              body: {
                "email": "karthick.balasubramanian+aug3t@ck12.org",
                "token": "test1234",
                "authType": "ck-12"
            },
        }).then((res)=>{
            cy.log(JSON.stringify(res))
           expect(res.status).to.eq(200) 
        
        }).then((res) => {
            // 2nd call
            login = res.body.response.login;
            emailID = res.body.response.email;
            cy.log('login id is' +login);
            cy.log('email id is' +emailID);
    
    
            cy.request({
                method: 'POST',
                url: baseURL + '/auth/login/member?',
                headers: {
                    'Accept': 'application/json',
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  form: true, // set the form as true while sending the parameter value in the form data for cypress
                  // convert the form data into body to send it
                  body: {
                    "login": emailID,
                    "token": "test1234",
                    "authType": "ck-12",
                    "test_mode": "mJWpWNvTHaDO1V9JzTUEdUTsIgPnCPS4"
                },
            }).then((res) => {
                //cookie = res.headers['set-cookie']; 
                cy.log("Auth login member response")
                cy.log(JSON.stringify(res));
                expect(res.status).to.eq(200);
                expect(res.body.email).has.property('email', emailID)
            })
        })
    })
})
