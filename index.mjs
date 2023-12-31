import app from "./app.mjs";
import logger from "./shared/logger.mjs";
import config from "./config/index.js";

let server = app.listen(config.expressRouter.port, () => {
  logger.info(`Listening to port ${config.expressRouter.port}`);
});

const exitHandler = (error) => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

const warningHandler = (warn) => {
  logger.warn(warn);
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);
process.on("warning", warningHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
