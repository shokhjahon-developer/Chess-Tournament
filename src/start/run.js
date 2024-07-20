const { connect } = require("mongoose");
const { mongoUri, port } = require("../../config");

const runner = (app) => {
  const bootstrap = async () => {
    try {
      await connect(`${mongoUri}`).then(() => {
        console.log("Connected to DB successfully!");
      });

      app.listen(port, () => {
        console.log(`Server is listening on port: ${port}`);
      });
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };

  bootstrap();
};

module.exports = runner;
