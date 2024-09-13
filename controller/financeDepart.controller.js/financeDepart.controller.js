const FinanceDepart = require('../../models/financeDepartModel/financeDepart.model')


////////////////////////// Create financeDepart //////////////////////////////////////////// 


exports.createfinanceDepart = async(req,res)=>{
    const financeDepartDetails = req.body; 
    try {
        const newfinanceDepart = new FinanceDepart({...financeDepartDetails})
        await newfinanceDepart.save()
        res.status(201).json(newfinanceDepart)
    } catch (error) {
        res.status(500).json({message: error.message})
    }}



///////////////////////////  get financeDepart /////////////////////////////////////////////////// 

exports.getfinanceDepart = async(req,res)=>{
    try {
        const financeDepartlist = await FinanceDepart.find({}).sort({createdAt:-1})
        res.status(200).json(financeDepartlist)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}