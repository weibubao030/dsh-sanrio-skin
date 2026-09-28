import { readFile } from 'node:fs/promises'
import z from '@deepseek-ai/schemastery'

export const inject = ['webServer']
export const Config = z.object({
  character: z.union(['pudding', 'kitty', 'kuromi', 'cinna']).default('pudding').volatile(),
})

const assetGroups = [
  ['pudding', 'gif', 15],
  ['hello-kitty', 'gif', 12],
  ['kuromi', 'gif', 11],
  ['cinnamoroll', 'png', 10],
]
const imageFiles = assetGroups.flatMap(([folder, mascotType, friendCount]) => [
  `${folder}/mascot.${mascotType}`,
  `${folder}/brand.png`,
  `${folder}/peek.png`,
  ...Array.from({ length: friendCount }, (_, i) =>
    `${folder}/friends/${String(i).padStart(2, '0')}.png`),
])

function localRequest(req) {
  const address = req.socket.remoteAddress
  if (!['127.0.0.1', '::1', '::ffff:127.0.0.1'].includes(address)) return false
  if (req.headers['sec-fetch-site'] === 'cross-site') return false
  try {
    const host = new URL(`http://${req.headers.host}`)
    if (!['127.0.0.1', 'localhost', '[::1]'].includes(host.hostname)) return false
    return req.headers.origin === undefined || new URL(req.headers.origin).host === host.host
  } catch {
    return false
  }
}

function serveAsset(req, res, file) {
  if (!localRequest(req)) {
    res.writeHead(403).end()
    return
  }
  if (req.method !== 'GET') {
    res.writeHead(405).end()
    return
  }
  void readFile(new URL(`./assets/${file}`, import.meta.url)).then(bytes => {
    res.writeHead(200, {
      'content-type': file.endsWith('.png') ? 'image/png' : 'image/gif',
      'content-length': bytes.length,
      'cache-control': 'private, max-age=3600',
      'x-content-type-options': 'nosniff',
    }).end(bytes)
  }, () => res.writeHead(404).end())
}

export function apply(ctx) {
  ctx.inject(['settings'], child => {
    child.effect(() => child.settings.configure({ auto: false }, ctx.fiber), 'dsh-sanrio-skin: settings')
  })
  for (const file of imageFiles) {
    ctx.effect(() => ctx.webServer.register({
      kind: 'exact',
      path: `/sanrio-skin-assets/${file}`,
      handler: (req, res) => serveAsset(req, res, file),
    }), `dsh-sanrio-skin: ${file} asset`)
  }
}
