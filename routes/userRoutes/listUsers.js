const data = require("../../data");

module.exports = async (req, res) => {
  const users = await data.getUsers();
  if (users.length) {
    res.writeHead(200);
    res.end(JSON.stringify(users));
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({message: "No users found"}));
  }
};