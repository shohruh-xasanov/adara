
exports.isAdminAuth = async (req,res,next)=>{
    if(req.session.admin){
        next()
    }else{
        res.redirect('/api/auth/login')
    }
}

exports.isUserAuth = async (req,res,next)=>{
    if(req.session.user){
        next()
    }else{
        res.redirect('/')
    }
}
exports.adminRoles = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.session.user.role)) {
        // res.status(401).json({ data: "Bu ma'lumotni olish uchun avtorizatsiyadan o'ting 3" });
        res.redirect('/api/admin/login')
      }
      next();
    };
  };
  const client_role = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.session.client.role)) {
        res.redirect('/')
      }
      next();
    };
  };
