const apps = require("./server")
const port = process.env.PORT || 8080;
apps.listen(port, () => console.log(`Listenting on ports ${port}...`));
