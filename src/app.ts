import "dotenv/config";
import express from "express";
import * as http from "http";
import cors from "cors";
import { CommonRoutesConfig } from "./common/common.routes.config";
import { ContentRoutes } from "./routes/content.routes.config";

// Create a new express application instance
const app: express.Application = express();

// Create an HTTP server using the Express application
const server: http.Server = http.createServer(app);

// Set the port to use, defaulting to 80 or using the value from the environment
const port = process.env.PORT || 80;

// Middleware setup
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded requests
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
app.disable("x-powered-by"); // Disable x-powered-by header

// Configure Routes
const routes: CommonRoutesConfig[] = [new ContentRoutes(app)];

// default route
app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).send("Recommendation service is running");
});

// Start the HTTP server
server.listen(port, async () => {
  // Log configured routes
  routes.forEach((route: CommonRoutesConfig) => {
    console.log(`Routes configured for ${route.getName()}`);
  });

  console.log(
    `Server running at http://localhost:${port} - process ${process.pid}`,
  );
});
