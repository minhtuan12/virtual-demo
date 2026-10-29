export const en = {
  meta: { title: 'Panorama 360° · Four real places' },
  brand: { title: 'Panorama 360°', subtitle: 'Walk between places · Demo' },
  intro: {
    title: 'Stand inside four real places',
    body: 'Explore four real places through 360° panoramas. The Rhine riverbank includes four connected viewpoints: use the arrows in the image or W/S to move, A/D to turn, and select i for details.',
    loading: 'Loading images…', start: 'Start exploring',
  },
  controls: {
    autoRotate: 'Auto rotate', theme: 'Toggle light or dark theme', fullscreen: 'Fullscreen', ai: 'Ask the AI guide', autoTour: 'Automatic tour',
    narration: 'English narration', ambience: 'Ambient sound', planet: 'Little planet view', forward: 'Move forward', backward: 'Move backward', left: 'Turn left', right: 'Turn right', language: 'Language', close: 'Close', send: 'Send',
  },
  status: { single: 'One viewpoint · drag to look around', point: 'point {{current}}/{{total}}', photo: 'Photo', source: 'source' },
  toasts: {
    single: 'This destination has only one viewpoint', turn: 'Turning toward the path', tourEnd: 'End of the tour', chooseRhine: 'Choose the Rhine riverbank to start the automatic tour',
    tourOn: 'Automatic tour: drag the image or select again to stop', narrationOn: 'English narration: on', narrationUnsupported: 'This browser does not support narration', ambienceDisclosure: 'Ambient sound is synthesized, not a real recording',
  },
  ai: {
    title: 'AI guide', suggestionSpecial: 'What is special about this place?', suggestionSeason: 'What is the best season to visit?', placeholder: 'Ask about the place you are viewing…',
    greeting: 'Hello! I am your AI guide. What would you like to know about {{place}}?', rateLimited: 'You are asking quickly. Please try again in a few seconds.', permission: 'Permission has not been granted for the AI guide.', unavailable: 'I cannot answer right now. Please try again later.',
  },
  destinations: {
    jelgava: { name: 'Jelgava Palace', location: 'Jelgava, Latvia', description: 'The largest Baroque palace in the Baltic region, designed by architect Rastrelli in the 18th century. Today the building is used as a university.' },
    ruins: { name: 'Ruins in the park', location: 'Aldara, Latvia', description: 'The remaining stone tower stands among the trees of a Latvian park, away from the main path.' },
    texel: { name: 'Texel Beach', location: 'Texel Island, Netherlands', description: 'A broad sandy beach on Texel Island where the changing tide draws wave patterns across the sand.' },
    rhine: { name: 'Rhine riverbank', location: 'Rodenkirchen, Cologne · four viewpoints', description: 'A sandy beach and riverside woodland in Rodenkirchen, south of central Cologne. Follow the arrows or use W/S to walk between four viewpoints and A/D to turn.' },
  },
  viewpoints: {
    jelgava: { title: 'Jelgava Palace' }, ruins: { title: 'Ruins in the park' }, texel: { title: 'Texel Beach' }, rhineSand: { title: 'Sandy bank and large tree' }, rhineRiver: { title: 'Along the riverbank' }, rhineCanopy: { title: 'Under the tree canopy' }, rhineTrail: { title: 'Forest trail' },
  },
  navigation: { alongRiver: 'Along the river', backToSand: 'Back to the sandy bank', underTrees: 'Under the trees', toRiver: 'To the riverbank', forestTrail: 'Forest trail', backToCanopy: 'Back under the trees' },
  hotspots: {
    jelgava: { arch: { title: 'Main archway', description: 'The archway leads into the courtyard between the red-brick façades with white trim.' }, east: { title: 'East wing', description: 'A long wing with evenly spaced arched windows.' } },
    ruins: { tower: { title: 'Remaining stone tower', description: 'A multi-storey stone wall surrounded by dense trees.' }, stones: { title: 'Stones around the ruins', description: 'Natural stone blocks lie around the foot of the tower, making the ground difficult to cross.' } },
    texel: { dunes: { title: 'Distant dunes', description: 'A low strip of dunes follows the horizon.' }, waves: { title: 'Sea waves', description: 'Small waves continually reach the sand at the waterline.' } },
    rhine: {
      tree: { title: 'Large riverside tree', description: 'A solitary tree stands on the sand, its broad crown covering much of the sky.' }, water: { title: 'The Rhine', description: 'The river stretches to the right, with a green opposite bank in the distance.' }, houses: { title: 'Riverside houses', description: 'Small houses sit behind the grass, a short distance from the water.' },
      surface: { title: 'Rhine water', description: 'The water is calm, with the dark-green opposite bank far away.' }, trees: { title: 'Trees by the bank', description: 'Tall trees grow beside the water and shade part of the beach.' }, trunk: { title: 'Old tree trunk', description: 'A large trunk stands beside the viewpoint, with branches filling the sky overhead.' }, bike: { title: 'Bicycle by the trail', description: 'A bicycle rests beside the sandy path through the woodland.' },
    },
  },
} as const
