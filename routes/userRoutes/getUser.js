const data = require("../../data");

module.exports = async (req, res) => {
  const id = parseInt(req.url.split("/")[2]);
  const findedUser = await data.getUserById(id);
  if (findedUser) {
    res.writeHead(200);
    res.end(JSON.stringify(findedUser));
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({message: "User not found"}));
  }
};