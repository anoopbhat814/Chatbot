const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../server');

chai.use(chaiHttp);

describe('Test API', () => {

    
    //post User Signup
    // describe('/POST/API/user', () => {
    //     it("It should POST a user", (done) => {
    //         const result = {
    //             first_name: "Md",
    //             last_name: "Kasim",
    //             phone_number:"75123621198",
    //             email: "kasim@gmail.com",
    //             password: "12345677",
    //         };

    //         chai.request(server)
    //             .post('/user/signup')
    //             .send(result)
    //             .end((err, response) => {
    //                 response.should.have.status(201);
    //                 response.body.should.be.a('object');
    //                 response.body.should.have.property('_id');
    //                 response.body.should.have.property('first_name').eq("Md");
    //                 response.body.should.have.property('last_name').eq("Kasim");
    //                 response.body.should.have.property('phone_number').eq("75123621198");
    //                 response.body.should.have.property('email').eq("kasim@gmail.com");
    //                 response.body.should.have.property('password').eq("12345677");
    //                 done();
    //             });
    //     });
    // });


    describe("/chatbox/get_catbox/userId", () => {
        it("It' get all chatbox according to user ", (done) => {
            const userId = "644b6ced43562e2141654375"
            chai.request(server)
                .get("/chatbox/get_catbox/" + userId)
                .end((err, response) => {
                    response.should.have.status(201)


                    done();
                })
        })

    })


    describe("/chatbox/get_single_chatbox/id", () => {
        it("It' get single chatbox according to chatbox id ", (done) => {
            const id = "644ba1e95a83144faa492551"
            chai.request(server)
                .get("/chatbox/get_single_chatbox/" + id)
                .end((err, response) => {
                    response.should.have.status(201)


                    done();
                })
        })

    })



    //update chatbox--------------------------
    describe("/chatbox/update", () => {
        it("It's should update POST ", (done) => {
            
            const data = {
                chotBox_id: "644ba1e95a83144faa492551",
                questions: "Labour Hotel",
                
            }

            chai.request(server)
                .post("/chatbox/update")
                .send(data)
                .end((err, response) => {
                    response.should.have.status(201)
                    response.body.should.be.a('object');
                    // response.body.length.should.be.eql(6);
                    done();
                })
        })



    })



    // delete chatbox---------------------->>>>>>
    describe("/chatbox/delete", () => {
        
        it("It's should DELETE be chatBox", (done) => {
            const id = "644ba75557311131e91a5669"

            chai.request(server)
                .delete("/chatbox/delete/" + id)
                .end((err, response) => {
                    response.should.have.status(201)
                    response.body.should.be.a('object');
                    // response.body.length.should.be.eql(6);
                    done();
                })
        })

    })



   //Signup test case ------
   
//    describe("/user/signup", () => {
//     it("It's should be signup with user POST request", (done) => {
        

//         const data = {
//             first_name:"Md",
//             last_name:"Ali",
//             email:"ali86@gmail.com",
//             phone_number:"8630122258",
//             password:"ali@123"
//         }
        
//         chai.request(server)
//             .post("/user/signup")
//             .send(data)
//             .end((err, response) => {
//                 response.should.have.status(201)
//                 response.body.should.be.a('object');
//                 // response.body.length.should.be.eql(6);
//                 done();
//             })
//     })



// })


    //login test case ------
    describe("/user/login", () => {
        it("It's should be login with user POST request", (done) => {
            
            const data = {
                email: "mohammad.vqcodes@gmail.com",
                password: "ali@123",
                
            }

            chai.request(server)
                .post("/user/login")
                .send(data)
                .end((err, response) => {
                    response.should.have.status(201)
                    response.body.should.be.a('object');
                    // response.body.length.should.be.eql(6);
                    done();
                })
        })



    })


//create chat------------------
    describe("/chat/create", () => {
        it("It's should be create chat POST request", (done) => {
            
            const data = {
                questions:"what are you doing again and agian", 
                type:"New",
                user_id:"644b6ced43562e2141654375"
                
            }

            chai.request(server)
                .post("/chat/create")
                .send(data)
                .end((err, response) => {
                    response.should.have.status(201)
                    response.body.should.be.a('object');
                    // response.body.length.should.be.eql(6);
                    done();
                })
        })



    })




});
