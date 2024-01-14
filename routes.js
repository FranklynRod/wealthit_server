const express = require('express')
const router = express.Router();

const Account = require('./models').Account;
const Liability = require('./models').Liability;
const Asset =  require('./models').Asset;


//Async Handler is a helper function to handle errors
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
router.get('account/:account-id/asset/:asset-id', asyncHandler(async(req, res, next) => {
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
router.get('account/:account-id/liability/:liability-id',asyncHandler(async(req, res, next)=>{
    const liability = await Liability.findByPk(req.params.id,{
        include:{
            model: Liability,
            attributes:['date']
        }
    })
    if (liability){
        res.json(liability).status(200);
    } else{
        const error = new Error("The liability your trying to find does not exist")
        error.status = 404;
        next(error);
    }
}));

//DELETE existing AssetID
router.delete('account/:account-id/asset/:asset-id', asyncHandler(async( req, res, next) => {
    try{
      const asset = await Asset.findByPk(req.params.id);
    //   if (asset.id !== req.currentUser.id){
    //     const error = new Error("You are not authorized to delete this course");
    //     error.status = 401;
    //     next(error);
    //   }
      if (asset.id === req.currentUser.id){
        await asset.destroy();
        res.status(204).end()
      } else{
        const error = new Error("The liability you're trying to find doesn't exist");
        error.status = 404;
        next(error);
      }
    }
  }));
//DELETE existing LiabilityID
router.delete('account/:id/liability/:liability-id', asyncHandler(async( req, res, next) => {
    try{
      const liability = await Liability.findByPk(req.params.id);
    //   if (asset.id !== req.currentUser.id){
    //     const error = new Error("You are not authorized to delete this course");
    //     error.status = 401;
    //     next(error);
    //   }
      if (liability.id === req.currentUser.id){
        await liability.destroy();
        res.status(204).end()
      } else{
        const error = new Error("The liability you're trying to find doesn't exist");
        error.status = 404;
        next(error);
      }
    }
  }));

//UPDATE Existing AssetID
router.put('account/:account-id/asset/:asset-id', asyncHandler(async( req, res) => {
    try{
        const asset = await Asset.findByPk(req.params.id);
    //   if (course.userId !== req.currentUser.id){
    //     const error = new Error("You are not authorized to update this course");
    //     error.status = 401;
    //     next(error);
    //   }
      if (asset){
        await asset.update(req.body)
        res.status(204).end();
      } else{
        const error = new Error("The asset you're trying to find doesn't exist");
        error.status = 404;
        next(error);
      }
    } 
  }));
//UPDATE Existing LiabilityID
router.put('account/:id/liability/:liability-id', asyncHandler(async( req, res) => {
    try{
        const liability = await Liability.findByPk(req.params.id);
    //   if (course.userId !== req.currentUser.id){
    //     const error = new Error("You are not authorized to update this course");
    //     error.status = 401;
    //     next(error);
    //   }
      if (asset){
        await asset.update(req.body)
        res.status(204).end();
      } else{
        const error = new Error("The liability you're trying to find doesn't exist");
        error.status = 404;
        next(error);
      }
    } 
  }));

//CREATE New AccountID
router.post('account/:account-id', asyncHandler(async (req, res) => {
    const errors = [];
    try{
      const account = await Account.create(req.body);
    if (errors.length > 0) {
      // Return the validation errors to the client.
      res.status(400).json({ errors });
    } 
    // Set the status to 201 Created and end the response.
    res.status(201).location("/").end();
    
    } catch(error){
      if(error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') { 
        const errors = error.errors.map(err => err.message);
        res.status(400).json({ errors });
      } else {
        throw error;
      } 
    }
  }));

//CREATE New AssetID
router.post('account/:account-id/asset/asset-id', asyncHandler(async (req, res) => {
    const errors = [];
    try{
      const asset = await Asset.create(req.body);
    if (errors.length > 0) {
      // Return the validation errors to the client.
      res.status(400).json({ errors });
    } 
    // Set the status to 201 Created and end the response.
    res.status(201).location("/").end();
    
    } catch(error){
      if(error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') { 
        const errors = error.errors.map(err => err.message);
        res.status(400).json({ errors });
      } else {
        throw error;
      } 
    }
  }));

//CREATE New LiabilityID
router.post('account/:account-id/liability/:liability-id', asyncHandler(async (req, res) => {
    const errors = [];
    try{
      const liability = await Liability.create(req.body);
    if (errors.length > 0) {
      // Return the validation errors to the client.
      res.status(400).json({ errors });
    } 
    // Set the status to 201 Created and end the response.
    res.status(201).location("/").end();
    
    } catch(error){
      if(error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') { 
        const errors = error.errors.map(err => err.message);
        res.status(400).json({ errors });
      } else {
        throw error;
      } 
    }
  }));
