import type { SpyConfigRuleEntity } from '@/entities';
import { logger } from '@/logger';
import type { HandleResponseParams } from '..';

export function responseTransformerPlugin() {
  const data = {
    upstreamUrl: 'upstreamUrl',
    method: 'httpMethod',
    condition: true,
  } as SpyConfigRuleEntity;
  return data;
}

export class ResponseTransformerPlugin {
  static name = 'response-transformer';
  constructor(protected readonly rule: SpyConfigRuleEntity) {
    logger.info(`Rule: ${rule.ruleName} with: ${rule.upstreamUrl} and ${rule.path}`);
    logger.info(`Using plugin: ${rule.plugin} with data: ${rule.data}`);
  }

  async handleResponse(params: HandleResponseParams) {
    const { responseBuffer } = params;
    return responseBuffer.toString();
  }
}
