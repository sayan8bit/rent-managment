export default function (...roles) {
  return function (req, res, next) {
    if (!roles.includes(req.user.role)) {
      return res.json({ message: "access denied" });
    }
    next();
  };
}
