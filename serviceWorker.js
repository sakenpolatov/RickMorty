const staticCacheName = 'static-site-v3'
const dynamicCacheName = 'dynamic-site-v3'
const ASSETS = [
	'/',
	'./src/assets/images/',
	'./src/pages/Home/',
	'./src/components/ErrorBoundary/',
	'./src/context/AuthStatus/',
	'./src/Router/RoutePaths.ts',
	'./src/components/PrivateRoute/',
	'./src/pages/NotFound/',
	'./src/pages/Details/',
	'./src/pages/Categories/',
	'./src/constants/errorMessages.ts',
	'./src/Router/Router.tsx',
	'./src/context/AuthProvider/',
	'./src/app.module.css',
	'./src/Router/',
	'./src/components/Header/',
	'./src/index.css',
	'./src/main.tsx',
	'./src/components/Selector/',
	'./src/constants/BASE_API.ts',
	'./src/pages/Login/'
]

//install event
self.addEventListener('install', async () => {
	const cache = await caches.open(staticCacheName)
	console.log(ASSETS)
	await cache.addAll(ASSETS)
})

//activate event
self.addEventListener('activate', async () => {
	const cachesKeysArr = await caches.keys()
	await Promise.all(
		cachesKeysArr
			.filter(key => key !== staticCacheName && key !== dynamicCacheName)
			.map(key => caches.delete(key))
	)
})

//fetch event
self.addEventListener('fetch', event => {
	event.respondWith(cacheFirst(event.request))
})

async function cacheFirst(request) {
	const cached = await caches.match(request)
	try {
		return (
			cached ??
			(await fetch(request).then(() => {
				return networkFirst(request)
			}))
		)
	} catch (error) {
		return networkFirst(request)
	}
}

async function networkFirst(request) {
	const cache = await caches.open(dynamicCacheName)
	try {
		const response = await fetch(request)
		await cache.put(request, response.clone())
		return response
	} catch (e) {
		const cached = await cache.match(request)
		return cached ?? (await caches.match('./src/pages/NotFound/index.tsx'))
	}
}
