    const Karigar = require('../../models/karigarModel/karigar.model')
    const Category = require('../../models/categoryModel/category.model')   
    
    //register Karigar
   const registerKarigar = async(req,res)=>{
    const{name,phone,city,country,house} = req.body;
    console.log(req.body)
        
     const registerKarigar = new Karigar({
            name:name,
            phone:phone,
            house:house,
            city:city,
            country:country,
        })
        const savedKarigar = await registerKarigar.save()
        res.status(200).send(savedKarigar)
    }
    
//get Karigar
const getkarigars = async(req,res)=>{
    try {
        const allkarigars = await Karigar.find()
        console.log(allkarigars)
        res.status(200).json(allkarigars)
        } 
    catch (error) {
        res.status(500).json(error)
        }}

//Karigar with product
const createKarigarProduct = async(req,res)=>{

}



//karigardetails
const getKarigar = async(req,res)=>{
    const{categoryname}= req.body;
    const {id} = req.params;
    const catName = Category.findOne({categoryname})

}




module.exports = {registerKarigar,getkarigars,createKarigarProduct,getKarigar};
