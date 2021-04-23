import { of } from "await-of";

export default async (req, res, next) => {
  let url = req._parsedUrl.pathname.replace(/^\/+|\/+$|\.+/g, "");
  url = url.split("/");
  const method = url.pop();
  const controller = url.slice(1).join("/");
  const api = require("../api/" + controller);
  const [result, error] = await of(api[method](req.params));

  if (error) {
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.write(error.message);
  } else {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(result));
  }

  res.end();
};
