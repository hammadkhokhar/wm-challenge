import { Application } from "express";
import { CommonRoutesConfig } from "../common/common.routes.config";
import {
  addContent,
  getContentRecommendations,
} from "../controllers/content.controller";

export class ContentRoutes extends CommonRoutesConfig {
  /**
   * Creates an instance of OrdersRoutes.
   * @param {Application} app - Express application.
   */
  constructor(app: Application) {
    super(app, "ContentRoutes");
  }

  /**
   * Configures routes for the content-related functionalities.
   */
  configureRoutes(): Application {
    this.app.route(`/content`).post(getContentRecommendations).get();

    this.app.route(`/content/seed`).post(addContent);

    return this.app;
  }
}
