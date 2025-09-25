import { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";

export default async function getPublishableKey({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const apiKeyModuleService = container.resolve(Modules.API_KEY);

  try {
    const publishableKeys = await apiKeyModuleService.listApiKeys({
      type: "publishable"
    });

    if (publishableKeys.length > 0) {
      logger.info("Found publishable keys:");
      publishableKeys.forEach((key, index) => {
        logger.info(`${index + 1}. Title: ${key.title}`);
        logger.info(`   Token: ${key.token}`);
        logger.info(`   Created: ${key.created_at}`);
        logger.info("---");
      });
    } else {
      logger.info("No publishable keys found.");
    }
  } catch (error) {
    logger.error("Error fetching publishable keys:", error);
  }
}
