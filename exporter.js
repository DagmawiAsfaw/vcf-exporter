const vCardsJS = require('vcards-js');
const fs = require('fs');
const vCard = vCardsJS();



function writeVcf(ContactArray,path) {
    ContactArray.forEach((contact)=>{
        vCard.firstName = contact.name.firstName;
        vCard.middleName = contact.name.middleName;
        vCard.lastName = contact.name.lastName;
        vCard.cellPhone= contact.phone.number;
        vCard.formattedName = contact.name.name;
        vCard.email = contact.email;


      //check if file already exists, if it does remove it
        let exists = fs.existsSync(path);
        if(exists){
            fs.unlinkSync(path);
        }

        //get formated string and write the cards to .vcf file
        let card = vCard.getFormattedString();
        fs.open(path, 'a+', (err,fileData ) => {
            if (err) throw err;
            fs.appendFile(fileData, card, 'utf8', (err) => {
                fs.close(fileData, (err) => {
                    if (err) throw err;
                });
                if (err) throw err;
            });
        });

    })

}

module.exports.writeVcf = writeVcf;
