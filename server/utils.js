const jwt = require('jsonwebtoken');

module.exports = {
  generateToken: ({ _id, username, email }) => {
    return jwt.sign({ _id, username, email }, process.env.JWT_SECRET, { expiresIn: '1d' });
  },
  verifyToken: (context) => {
    try {
      const bearerToken = context.req.headers.authorization;
      let token = bearerToken ? bearerToken.split(" ")[1] : "";
      const decoded = jwt.verify(token, process.env.JWT_SECRET) || false;
      return decoded;
    } catch (error) {
      throw error;
    }
  }
}