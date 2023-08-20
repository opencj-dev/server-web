import express, { Express } from "express";
import bodyParser from "body-parser";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import compression from "compression";
import { mapRouter } from "./cod4/v1/routes/mapsRoutes";
import { playersRoute } from "./cod4/v1/routes/playersRoute";
import { detailedRunsRoute } from "./cod4/v1/routes/detailedRunsRoute";

const port = 3002;
const app: Express = express();

app.use(bodyParser.json());
app.use(compression());

/**
 * TODO:
 * rate limit?
 * cors?
 * restrict routes to certain urls?
 * authentication?
 * think of better way to return non 200 status codes
 * better way to write schema docs
 */

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//Routes
app.use("/api/cod4/v1/maps", mapRouter);
app.use("/api/cod4/v1/players", playersRoute);
app.use("/api/cod4/v1/detailedRuns", detailedRunsRoute);

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "opencj",
      version: "0.1.0",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
      {
        url: `https://opencj.sheepwizard.com`,
      },
    ],
  },
  apis: ["./cod4/v1/**/*.ts"],
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
