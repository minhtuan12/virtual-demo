import manifest from '../assets/manifest.json'

export interface Credit {
  author: string
  license: string
  source: string
}

export interface Destination {
  id: string
  viewpointIds: string[]
  thumbnail: string
  credit: Credit
}

export interface NavigationHotspot {
  to: string
  x: number
  y: number
  labelKey: string
}

export interface InfoHotspot {
  x: number
  y: number
  titleKey: string
  descriptionKey: string
}

export interface Viewpoint {
  id: string
  destinationId: string
  panorama: string
  initialLongitude: number
  titleKey: string
  navigation: NavigationHotspot[]
  info: InfoHotspot[]
}

export interface Tour {
  destinations: Destination[]
  viewpoints: Viewpoint[]
}

const assetUrl = (file: string) => new URL(`../assets/${file}`, import.meta.url).href
const panorama = (index: number) => assetUrl(manifest.panoramas[index].file)
const thumbnail = (index: number) => assetUrl(manifest.thumbnails[index].file)

export const tour: Tour = {
  destinations: [
    {
      id: 'jelgava-palace',
      viewpointIds: ['jelgava-palace'],
      thumbnail: thumbnail(0),
      credit: { author: 'Uldins Bardins (2011)', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Jelgavas_pils.jpg' },
    },
    {
      id: 'park-ruins',
      viewpointIds: ['park-ruins'],
      thumbnail: thumbnail(1),
      credit: { author: 'Uldins Bardins (2011)', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Aldara_parks.jpg' },
    },
    {
      id: 'texel-beach',
      viewpointIds: ['texel-beach'],
      thumbnail: thumbnail(2),
      credit: { author: 'Bert Niehaus (2025)', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Texel_netherland_beach_equirectangular.png' },
    },
    {
      id: 'rhine-riverbank',
      viewpointIds: ['rhine-sand', 'rhine-river', 'rhine-canopy', 'rhine-trail'],
      thumbnail: thumbnail(3),
      credit: { author: 'niebert / HuginSample', license: 'CC BY-SA 4.0', source: 'https://github.com/niebert/HuginSample' },
    },
  ],
  viewpoints: [
    {
      id: 'jelgava-palace', destinationId: 'jelgava-palace', panorama: panorama(0), initialLongitude: 0, titleKey: 'viewpoints.jelgava.title', navigation: [],
      info: [
        { x: 0.43, y: 0.47, titleKey: 'hotspots.jelgava.arch.title', descriptionKey: 'hotspots.jelgava.arch.description' },
        { x: 0.66, y: 0.4, titleKey: 'hotspots.jelgava.east.title', descriptionKey: 'hotspots.jelgava.east.description' },
      ],
    },
    {
      id: 'park-ruins', destinationId: 'park-ruins', panorama: panorama(1), initialLongitude: -20, titleKey: 'viewpoints.ruins.title', navigation: [],
      info: [
        { x: 0.44, y: 0.37, titleKey: 'hotspots.ruins.tower.title', descriptionKey: 'hotspots.ruins.tower.description' },
        { x: 0.63, y: 0.72, titleKey: 'hotspots.ruins.stones.title', descriptionKey: 'hotspots.ruins.stones.description' },
      ],
    },
    {
      id: 'texel-beach', destinationId: 'texel-beach', panorama: panorama(2), initialLongitude: 0, titleKey: 'viewpoints.texel.title', navigation: [],
      info: [
        { x: 0.5, y: 0.46, titleKey: 'hotspots.texel.dunes.title', descriptionKey: 'hotspots.texel.dunes.description' },
        { x: 0.08, y: 0.7, titleKey: 'hotspots.texel.waves.title', descriptionKey: 'hotspots.texel.waves.description' },
      ],
    },
    {
      id: 'rhine-sand', destinationId: 'rhine-riverbank', panorama: panorama(3), initialLongitude: 20, titleKey: 'viewpoints.rhineSand.title',
      navigation: [{ to: 'rhine-river', x: 0.72, y: 0.64, labelKey: 'navigation.alongRiver' }],
      info: [
        { x: 0.6, y: 0.33, titleKey: 'hotspots.rhine.tree.title', descriptionKey: 'hotspots.rhine.tree.description' },
        { x: 0.87, y: 0.49, titleKey: 'hotspots.rhine.water.title', descriptionKey: 'hotspots.rhine.water.description' },
        { x: 0.42, y: 0.48, titleKey: 'hotspots.rhine.houses.title', descriptionKey: 'hotspots.rhine.houses.description' },
      ],
    },
    {
      id: 'rhine-river', destinationId: 'rhine-riverbank', panorama: panorama(4), initialLongitude: 0, titleKey: 'viewpoints.rhineRiver.title',
      navigation: [
        { to: 'rhine-sand', x: 0.12, y: 0.62, labelKey: 'navigation.backToSand' },
        { to: 'rhine-canopy', x: 0.6, y: 0.6, labelKey: 'navigation.underTrees' },
      ],
      info: [
        { x: 0.42, y: 0.5, titleKey: 'hotspots.rhine.surface.title', descriptionKey: 'hotspots.rhine.surface.description' },
        { x: 0.58, y: 0.2, titleKey: 'hotspots.rhine.trees.title', descriptionKey: 'hotspots.rhine.trees.description' },
      ],
    },
    {
      id: 'rhine-canopy', destinationId: 'rhine-riverbank', panorama: panorama(5), initialLongitude: 0, titleKey: 'viewpoints.rhineCanopy.title',
      navigation: [
        { to: 'rhine-river', x: 0.12, y: 0.6, labelKey: 'navigation.toRiver' },
        { to: 'rhine-trail', x: 0.6, y: 0.58, labelKey: 'navigation.forestTrail' },
      ],
      info: [{ x: 0.95, y: 0.4, titleKey: 'hotspots.rhine.trunk.title', descriptionKey: 'hotspots.rhine.trunk.description' }],
    },
    {
      id: 'rhine-trail', destinationId: 'rhine-riverbank', panorama: panorama(6), initialLongitude: 0, titleKey: 'viewpoints.rhineTrail.title',
      navigation: [{ to: 'rhine-canopy', x: 0.15, y: 0.66, labelKey: 'navigation.backToCanopy' }],
      info: [{ x: 0.49, y: 0.62, titleKey: 'hotspots.rhine.bike.title', descriptionKey: 'hotspots.rhine.bike.description' }],
    },
  ],
}

export const destinationById = (id: string) => tour.destinations.find((item) => item.id === id)
export const viewpointById = (id: string) => tour.viewpoints.find((item) => item.id === id)
