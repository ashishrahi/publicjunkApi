const FinanceDepart = require('../../models/financeDepartModel/financeDepart.model')

////////////////////////// Create financeDepart //////////////////////////////////////////// 

exports.createfinanceDepart = async (req, res) => {
    console.log(req.body)
try {
        const newfinanceDepart = new FinanceDepart({...req.body});
        await newfinanceDepart.save();
        res.status(201).json(newfinanceDepart);
    } 
catch (error) {
        res.status(400).json({ message: error.message });
    }
};

///////////////////////////  get financeDepart /////////////////////////////////////////////////// 

exports.getfinanceDepart = async(req,res)=>{
    try {
        const financeDepartlist = await FinanceDepart.find({}).sort({createdAt:-1})
        res.status(200).json(financeDepartlist)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}