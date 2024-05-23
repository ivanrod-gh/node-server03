const data = require("../../data");
const { URLSearchParams } = require("url");

module.exports = (req, res) => {
  let body = "";
  req.on("data", chunk => {
    body += chunk;
  });
  req.on("end", async () => {
    const parsedBody = new URLSearchParams(body);
    const name = parsedBody.get("name");
    const age = parsedBody.get("age");
    
    if (name && age) {
      const user = {name, age: parseInt(age)};
      const createdUser = await data.addUser(user);
      if (createdUser) {
        res.writeHead(201)
        res.end(JSON.stringify(createdUser));
      } else {
        res.writeHead(400)
        res.end(JSON.stringify({message: "User was not created"}));
      };
    } else {
      res.writeHead(400)
      res.end(JSON.stringify({message: "Name and age required"}));
    }
  });
};