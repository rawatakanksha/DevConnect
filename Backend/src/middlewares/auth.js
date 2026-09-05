const authAdmin=(req,res,next)=>{

    const token="xyz";
    const isAdmin= token==='xyz';

    if(!isAdmin){
        res.status(401).send("invealid user")
    }
    else{
       next()
    }
};
const authUser=(req,res,next)=>{

    const token="xyz";
    const isAdmin= token==='xyz';

    if(!isAdmin){
        res.status(401).send("invealid user")
    }
    else{
       next()
    }
};

module.export={
    authAdmin,
    authUser

}