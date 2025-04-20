import { getAssetFromKV } from '@cloudflare/kv-asset-handler'

/**
 * The DEBUG flag will do two things that help during development:
 * 1. we will skip caching on the edge, which makes it easier to debug
 * 2. we will return more verbose errors from the edge when they happen
 */
const DEBUG = false

/**
 * Event handler that serves static assets from KV storage
 */
addEventListener('fetch', event => {
  try {
    event.respondWith(handleEvent(event))
  } catch (e) {
    if (DEBUG) {
      return event.respondWith(
        new Response(e.message || e.toString(), {
          status: 500,
        }),
      )
    }
    event.respondWith(new Response('Internal Error', { status: 500 }))
  }
})

async function handleEvent(event) {
  try {
    return await getAssetFromKV(event)
  } catch (e) {
    // if an error is thrown try to serve the asset at 404.html
    let notFoundResponse = await getAssetFromKV(event, {
      mapRequestToAsset: req => new Request(`${new URL(req.url).origin}/404.html`, req),
    })

    return new Response(notFoundResponse.body, { ...notFoundResponse, status: 404 })
  }
} 