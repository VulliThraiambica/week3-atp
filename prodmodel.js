import {Schema,model} from "mongoose"
const prodSchema=new Schema({
    
    prodname:{type:String,
        required:[true,"prodname is required"],
        minLength:[4,"min length of prod name is 4 char"],
        maxLength:[20,"prodname size exceed 6"]
    },
prodid:{
    type:Number,
    required:[true,"id req"]
},
price:{
    type:Number,
    required:[true,"price req"],
    min:[10000,"min price of 10000"],
    max:[50000,"max price of 50000"]
},
brand:{
    type:String,
    required:[true,"brand required"]
},
},
{versionKey:false,
    timestamps:true,
    
})
export const prodmodel=model("prod",prodSchema)