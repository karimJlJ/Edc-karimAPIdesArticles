const UnauthorizedError = require("../errors/unauthorized");
const jwt = require("jsonwebtoken");
const config = require("../config");

function authenticate(req, res, next) {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      throw "not token";
    }
    const decoded = jwt.verify(token, config.secretJwtToken);
    req.user = decoded;
    next();
  } catch (error) {
    next(new UnauthorizedError("Unauthorized"));
  }
}

// middleware pour vérifier si l'utilisateur a le rôle d'administrateur.
function adminOnly(req, res, next) {
  const { user } = req;
  if (user.role === 'admin') {
    next();
  } else {
    res.sendStatus(403);
  }
}

module.exports = {
  authenticate,
  adminOnly,
};
