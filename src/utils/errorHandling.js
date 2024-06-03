
export const asyncHandler = (fn) => {
    return (req,res,next) => {
        fn(req,res,next).catch(err => {
            if(process.env.MOOD == 'DEV'){
                return res.json({message:'Catch error',err,stack:err.stack});
            }
            return res.json({message:'Catch error'});
        });
    };
}

export const globalErrHandling  = (err,req,res,next ) => {
    if(err){
        if(process.env.MOOD == 'DEV'){
            next(new Error(err,{cause:500}));
            return res.status( err.cause || 500).json({message:err.message,err,stack:err.stack});
        }
        return res.json({message:'Catch error'});
    }
};
