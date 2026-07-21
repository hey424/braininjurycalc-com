export interface Env {
  ASSETS: Fetcher;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const isHttps = url.protocol === 'https:';
    const isWww = url.hostname.startsWith('www.');

    if (!isHttps || isWww) {
      const target = new URL(request.url);
      target.protocol = 'https:';
      if (isWww) target.hostname = url.hostname.slice(4);
      return Response.redirect(target.toString(), 301);
    }

    return env.ASSETS.fetch(request);
  },
};
