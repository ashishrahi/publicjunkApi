const Category = require("../../models/categoryModel/category.model");
const Gender = require('../../models/otherdetailsModel/Gender.model')
const Color = require('../../models/otherdetailsModel/Color.model')
const Purity = require('../../models/otherdetailsModel/Purity.model')
const Dandi = require('../../models/otherdetailsModel/Dandi.model')
const Kunda = require('../../models/otherdetailsModel/Kunda.model')
const Size = require('../../models/otherdetailsModel/Size.model')
const Gaugesize = require('../../models/otherdetailsModel/Gaugesize.model')
const Weight = require('../../models/otherdetailsModel/Weight.model')

//Create Category
const registerCategories= async(req,res)=>{
    const {categoryname,gender,color,purity,dandi,kunda,size,gaugesize,weight}=req.body;
    console.log(categoryname);
    const agender = await Gender.findOne({gender:gender})
    const acolor = await Color.findOne({color:color})
    const apurity = await Purity.findOne({purity:purity})
    const adandi = await Dandi.findOne({dandi:dandi})
    const akunda = await Kunda.findOne({kunda:kunda})
    const asize = await Size.findOne({size:size})
    const agaugesize = await Gaugesize.findOne({gaugesize:gaugesize})
    const aweight = await Weight.findOne({weight:weight})
console.log(agender)
    const newCategory = new Category({
        categoryname:categoryname, 
        genderId:agender._id, 
        colorId:acolor._id,  
        purityId:apurity._id, 
        dandiId:adandi._id, 
        kundaId:akunda._id, 
        sizeId:asize._id, 
        gaugesizeId:agaugesize._id,
        weightId:aweight._id,

        });
        console.log(newCategory);
        const saveCategory = await newCategory.save();
        res.status(201).json(saveCategory);

 
}

//get All Categories
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        console.log(categories)
        

        const allCategories = await Promise.all(categories.map(async (category) => {
            try {
                const [
                    category_gender,
                    category_color,
                    category_purity,
                    category_dandi,
                    category_kunda,
                    category_size,
                    category_gaugesize,
                    category_weight
                ] = await Promise.all([
                    Gender.findById(category.genderId),
                    Color.findById(category.colorId),
                    Purity.findById(category.purityId),
                    Dandi.findById(category.dandiId),
                    Kunda.findById(category.kundaId),
                    Size.findById(category.sizeId),
                    Gaugesize.findById(category.gaugesizeId),
                    Weight.findById(category.weightId)
                ]);

                return {
                    _id: category._id,
                    categoryname: category.categoryname,
                    gender: category_gender.gender,
                    color: category_color.color,
                    purity: category_purity.purity,
                    dandi: category_dandi.dandi,
                    kunda: category_kunda.kunda,
                    size: category_size.size,
                    gaugesize: category_gaugesize.gaugesize,
                    weight: category_weight.weight,
                };

            } catch (error) {
                console.error('Error fetching details for category:', category._id, error);
                throw error; // Propagate the error to be caught by the outer try-catch block
            }
        }));

        res.status(200).json(allCategories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: error.message });
    }
};



module.exports ={registerCategories,getCategories}