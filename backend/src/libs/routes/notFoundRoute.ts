export default (req, res, next)=>{
  next({error: 'Not Found', status: 404});
  };
