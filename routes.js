const express = require('express')
const router = express.Router();

const Account = require('./models').Account;
const Liability = require('./models').Liability;
const Asset =  require('./models').Asset;


//Async Handler
function asyncHandler(cb){
    return async(req,res,next) =>{
      try{
        await cb(req,res, next);
      }catch(error){
    // Forward error to the global error handler
        next(error);
    }}
  }

//GET AccountID
router.get('/account/:id', asyncHandler(async(req, res, next) => {
    const account = await Account.findByPk(req.params.id ,{
      include: {
        model: Account,
        attributes:['userName', 'emailAddress']
    }
     });
    if (account){
      res.json(account).status(200);
    } else{
      const error = new Error("The account you're trying to find doesn't exist");
      error.status = 404;
      next(error);
    }
  }));

//GET AssetID
router.get('/asset/:id', asyncHandler(async(req, res, next) => {
    const asset = await Asset.findByPk(req.params.id ,{
      include: {
        model: Asset,
        attributes:['date']
    }
     });
    if (asset){
      res.json(asset).status(200);
    } else{
      const error = new Error("The asset you're trying to find doesn't exist");
      error.status = 404;
      next(error);
    }
  }));

//GET LiabilityID
router.get('/liability/:id',asyncHandler(async(req, res, next)=>{
    const liability = await Liability.findByPk(req.params.id,{
        include:{
            model: Liability,
            attributes:['date']
        }
    })
    if (liability){
        res.json(liability).status(200);
    } else{
        const error = new Error("The liability your trying to fine does not exist")
        error.status = 404;
        next(error);
    }
}));


//DELETE AssetID

//DELETE DebtID

//UPDATE AssetID
//UPDATE DebtID

//CREATE User AccountID
//CREATE AssetID
//CREATE DebtID