import 'dotenv/config';
import { createProxyMiddleware, responseInterceptor } from 'http-proxy-middleware';
import { schema } from './env.schema.js';
const env = schema.parse(process.env);

/**
 * Configure proxy middleware
 */
export const spyMiddleware = createProxyMiddleware({
  target: env.TARGET_URL,
  changeOrigin: true, // for vhosted sites, changes host header to match to target's host
  selfHandleResponse: true, // manually call res.end(); IMPORTANT: res.end() is called internally by responseInterceptor()
  onProxyRes: responseInterceptor(async (responseBuffer, proxyRes, req, res) => {
    res.setHeader('Powered-by', 'thaitype/spy-reverse-proxy');

    if (req.url === env.TARGET_PATH) {
      res.statusCode = 500;
    }

    console.log(`path`, req.url);

    return responseBuffer.toString();
  }),
  logLevel: 'debug',
});
