const data = require("../../data");
const { URLSearchParams } = require("url");

module.exports = (req, res) => {
  let body = "";
  req.on("data", chunk => {
    body += chunk;
  });
  req.on("end", async () => {
    const id = parseInt(req.url.split("/")[2]);
    const parsedBody = new URLSearchParams(body);
    const name = parsedBody.get("name");
    const age = parseInt(parsedBody.get("age"));
    const userData = {name: name, age: age};

    if (id && name && age) {
      const updatedUser = await data.updateUserById(id, userData);
      if (updatedUser) {
        res.writeHead(200)
        res.end(JSON.stringify({message: "User successfully updated"}));
      } else {
        res.writeHead(404);
        res.end(JSON.stringify({message: "User not found"}));
      }
    } else {
      res.writeHead(400)
      res.end(JSON.stringify({message: "Id, name and age required"}));
    }
  });
};
