const { type } = require("@testing-library/user-event/dist/type");
const mongoose=require("mongoose")
const {Schema}= mongoose



const transactionSchema= new Schema ({
    name: {
        type: String,
        required: true
    },   
    price: {
        type: Number,
      require:true  
    },
    description: {
        type: String,
        required: true
    },
    datetime: {
        type: Date,
        required: true
    }

    })

    const transactionModels= mongoose.model("transaction", transactionSchema);

    module.exports= transactionModels;