import { Application } from "express";
/**
 * Abstract class for configuring common routes in an Express application.
 */
export abstract class CommonRoutesConfig {
  /**
   * The Express application instance.
   */
  app: Application;

  /**
   * A name to identify the routes configuration.
   */
  name: string;

  /**
   * Constructor for the CommonRoutesConfig class.
   * @param app - The Express application instance.
   * @param name - A name to identify the routes configuration.
   */
  constructor(app: Application, name: string) {
    this.app = app;
    this.name = name;
    this.configureRoutes();
  }

  /**
   * Abstract method to be implemented by subclasses for configuring routes.
   * @returns The Express application instance after configuring routes.
   */
  abstract configureRoutes(): Application;

  /**
   * Get the name of the routes configuration.
   * @returns The name of the routes configuration.
   */
  getName(): string {
    return this.name;
  }
}
