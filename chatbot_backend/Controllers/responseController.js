const faker = require('faker');
const _ = require('lodash');

const craete_response = async (req,res)=>{

    const {question,user_id,response}=req.body

    const lorem = faker.lorem;
    res.status(201).json({question,user_id,response:lorem.paragraph()})
   

}

const fetch_response = async (req,res)=>{
// const count = req.query.count;
//   if (!count) {
//     return res.status(400).send({
//       errorMsg: 'count query parameter is missing.'
//     });
//   }
  const lorem = faker.lorem;

//   res.send(
//     _.times(count, () => {
//         const lorem = faker.lorem;
//       return {
//         paragraph: lorem.paragraph(),
//         sentence: lorem.sentence(),
//         paragraphs: lorem.paragraphs()
//       };
//     })
//   );
res.send({paragraph: lorem.paragraph()})
}

module.exports={craete_response,fetch_response}