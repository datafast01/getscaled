const express = require('express')
const router = new express.Router()
const Models =require("../../models")

const fs = require("fs");
const path = require("path");
const multer=require('multer')
const { parse } = require("csv-parse");
const csv = require('fast-csv')

const Sequelize = require("sequelize");
const Op = Sequelize.Op;



router.get('/dashboard', async( req, res) => {
  let pageSize = req.query.page || 0
  let limit = req.query.itemsPerPage || 0
  let searchText = req.query.searchText;

let firstName = req.query.firstName;
let lastName = req.query.lastName;
let email= req.query.email;
let city = req.query.city;
let state = req.query.state;

let address1 = req.query.address1;
let address2 = req.query.address2;
let age= req.query.age;
let companyPhone = req.query.companyPhone;
let mobilePhone = req.query.mobilePhone;

let companyName = req.query.address1;
let jobTitle = req.query.jobTitle;
let dob= req.query.dob;
let firstNameValue = req.query.firstNameValue;
let lastNameValue = req.query.lastNameValue;
let fullNameValue = req.query.fullNameValue;


let ageValue = req.query.ageValue;
let cityValue = req.query.cityValue;
let dobValue= req.query.dobValue;
let address1Value = req.query.address1Value;
let address2Value = req.query.address2Value;

let emailValue  = req.query.emailValue ;
let companyPhoneValue = req.query.companyPhoneValue;
let companyNameValue= req.query.companyNameValue;
let jobTitleValue = req.query.jobTitleValue;

let whereClause={}

  // if(searchText != null || searchText != ''){
  //   whereClause={...whereClause, searchText}
  // 
// if(firstName != null){
//   whereClause={...whereClause, firstName}
// }
// if(firstNameValue != null){
//   whereClause={...whereClause, firstNameValue}
// }

console.log(`logging first name : _________ `, firstName);
console.log(`logging first name value : ________ `, firstNameValue);

// first name filter 
if(firstNameValue == null || firstNameValue == 'null'){
  whereClause = {...whereClause}
}else{
  if(firstName == 'startsWith') firstNameValue = `${firstNameValue}%`
  else if (firstName == 'endsWith') firstNameValue = `%${firstNameValue}`

  whereClause = {...whereClause,  firstName :{
    [Op[firstName]]: firstNameValue
  }}
}


// first name filter 
// if(lastNameValue == null || lastNameValue == 'null'){
//   whereClause = {...whereClause}
// }else{
//   if(lastName == 'startsWith') lastNameValue = `${lastNameValue}%`
//   else if (lastName == 'endsWith') lastNameValue = `%${lastNameValue}`

//   whereClause = {...whereClause,  lastName :{
//     [Op[lastName]]: lastNameValue
//   }}
// }


// first name filter 
if(emailValue == null || emailValue == 'null'){
  whereClause = {...whereClause}
}else{
  if(email == 'startsWith') emailValue = `${emailValue}%`
  else if (lastName == 'endsWith') emailValue = `%${emailValue}`

  whereClause = {...whereClause,  lastName :{
    [Op[lastName]]: emailValue
  }}
}
// last name filter 
// if(lastNameValue == null || lastNameValue == 'null'){
//   whereClause = {}
// }else{
//   console.log('Imm here in if block');
//   whereClause = {...whereClause,  lastName :{
//     [Op.like]: `%${lastNameValue}%`
//   }}
// }

// // full name filter 
// if(fullNameValue == null || fullNameValue == 'null'){
//   whereClause = {}
// }else{
//   console.log('Imm here in if block');
//   whereClause = {...whereClause,  fullName :{
//     [Op.like]: `%${fullNameValue}%`
//   }}
// }

// email filter 
// if(emailValue == null || emailValue == 'null'){
//   whereClause = {}
// }else{
//   console.log('Imm here in if block');
//   whereClause = {...whereClause,  email :{
//     [Op.like]: `%${emailValue}%`
//   }}
// }


console.log(whereClause, '_______________________where clause')

// if(lastName != null){
//   whereClause={...whereClause, lastName}
// }

// if(email != null ){
//   whereClause={...whereClause, email}
// }
// if(city != null ){
//   whereClause={...whereClause, city}
// }
// if(state != null){
//   whereClause={...whereClause, state}
// }
//                    
// if(address2 != null){
//   whereClause={...whereClause, address2}
// }

// if(age != null){
//   whereClause={...whereClause, age}
// }
// if(companyPhone != null){
//   whereClause={...whereClause, companyPhone}
// }

// if(mobilePhone != null){
//   whereClause={...whereClause, mobilePhone}
// }

// if(companyName != null){
//   whereClause={...whereClause, companyName}
// }
// if(jobTitle != null){
//   whereClause={...whereClause, jobTitle}
// }

// if(dob != null){
//   whereClause={...whereClause, dob}
// }


// if(lastNameValue != null){
//   whereClause={...whereClause, lastNameValue}
// }

// if(ageValue != null){
//   whereClause={...whereClause, ageValue}
// }

// if(cityValue != null){
//   whereClause={...whereClause, cityValue}
// }
// if(dobValue != null){
//   whereClause={...whereClause, dobValue}
// }

// if(address1Value != null){
//   whereClause={...whereClause, address1Value}
// }
// if(address2Value != null){
//   whereClause={...whereClause, address2Value}
// }


// if(emailValue != null){
//   whereClause={...whereClause, emailValue}
// }
// if(companyNameValue != null){
//   whereClause={...whereClause, companyNameValue}
// }

// if(companyPhoneValue != null){
//   whereClause={...whereClause, companyPhoneValue}
// }
// if(jobTitleValue != null){
//   whereClause={...whereClause, jobTitleValue}
// }

console.log('where clause ============>', whereClause)
  pageSize=parseInt(pageSize)
  limit=parseInt(limit)
   try {
    let users=null
    if(limit == 0){
      console.log(`1`);
       users = await Models.User.findAndCountAll({
        where:whereClause,
           order: [
              ['createdAt', 'DESC'],
          ],
     })
    }else{
      console.log(`2`);
      users = await Models.User.findAndCountAll({
          where: whereClause,
          // offset:pageSize,
          // limit:limit,
          order: [
              ['createdAt', 'DESC'],
          ],
     })
     console.log(`useer checkpost >>>> `, users);
    }

    console.log(`>>>>>>>>>>> `, users);

    return res.status(200).json({
        message: 'OK',
        data: users
    })
   } catch (error) {
    return res.status(400).json({
        message: 'Error',
        error: error.message
    })
   }
})


const { EventEmitter } = require("events");
const myEmitter = new EventEmitter();
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
      callBack(null, './uploads/')
    },
    filename: (req, file, callBack) => {
      callBack(
        null,
        file.fieldname + '-' + Date.now() + path.extname(file.originalname),
      )
    },
})
  
var upload = multer({
  storage: storage,
})

router.post('/add-data', upload.single('csvFile'), async( req, res) => {
    try {
      console.log('reading file........')
      myEmitter.emit('create-entry',req.file.filename)  
       
      return res.status(200).json({
         message: 'OK',
         data: {}
      })
    } catch (error) {
     return res.status(400).json({
         message: 'Error',
         error: error.message
     })
    }
 })

 myEmitter.on('create-entry', async(filename) => {
  console.log('listner------------------------------------------------------')
  try {
    let counter=0
    fs.createReadStream('./uploads/'+filename)
        .pipe(parse({ delimiter: ",", from_line: 2,relax_column_count: true }))
        .on("data", function (row) {
          counter+=1
          console.log(counter)
          Models.User.create({
            fullName:row[0],
            email:row[1],
            phone:row[2],
            jobTitle:row[3],
            companyName:row[4],
            city:row[5],
            state:row[6],
            firstName:row[7],
            lastName:row[8] 
           
            
          })
      })
    
  } catch (err) {
    console.log(err)
  }
});


module.exports = router