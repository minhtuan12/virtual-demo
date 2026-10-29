import { en } from './en'
import { discoverKo } from './discover'

export const ko = {
  ...en,
  meta: { title: '파노라마 360° · 네 곳의 장소' }, brand: { title: '파노라마 360°', subtitle: '장소 사이를 걸어보세요' },
  intro: { title: '네 곳의 장소 한가운데 서 보세요', body: '360° 파노라마로 네 곳의 장소를 둘러보세요. 라인강 강변에는 네 시점이 연결되어 있습니다. 화면의 화살표나 W/S로 이동하고 A/D로 회전하며 i를 눌러 자세히 보세요.', loading: '이미지 불러오는 중…', start: '탐험 시작' },
  controls: { autoRotate: '자동 회전', theme: '밝은/어두운 테마 전환', fullscreen: '전체 화면', ai: 'AI 가이드에게 질문', autoTour: '자동 투어', narration: '영어 내레이션', ambience: '환경음', planet: '리틀 플래닛 보기', forward: '앞으로', backward: '뒤로', left: '왼쪽 회전', right: '오른쪽 회전', language: '언어', close: '닫기', send: '보내기' },
  status: { single: '시점 한 곳 · 드래그하여 둘러보기', point: '시점 {{current}}/{{total}}', photo: '사진', source: '출처' },
  toasts: { single: '이 장소에는 시점이 하나뿐입니다', turn: '이동 방향으로 회전 중', tourEnd: '투어가 끝났습니다', chooseRhine: '자동 투어를 시작하려면 라인강 강변을 선택하세요', tourOn: '자동 투어: 이미지를 드래그하거나 다시 눌러 중지하세요', narrationOn: '영어 내레이션: 켜짐', narrationUnsupported: '이 브라우저는 내레이션을 지원하지 않습니다', ambienceDisclosure: '환경음은 현장 녹음이 아닌 합성 사운드입니다' },
  ai: { title: 'AI 가이드', suggestionSpecial: '이곳의 특별한 점은 무엇인가요?', suggestionSeason: '방문하기 가장 좋은 계절은 언제인가요?', placeholder: '현재 보고 있는 장소에 대해 질문하세요…', greeting: '안녕하세요! AI 가이드입니다. {{place}}에 대해 무엇이 궁금한가요?', rateLimited: '질문이 너무 빠릅니다. 잠시 후 다시 시도하세요.', permission: 'AI 가이드 권한이 허용되지 않았습니다.', unavailable: '지금은 답변할 수 없습니다. 나중에 다시 시도하세요.' },
  destinations: { jelgava: { name: '옐가바 궁전', location: '옐가바, 라트비아', description: '18세기에 라스트렐리가 설계한 발트 지역 최대의 바로크 궁전으로, 현재는 대학교로 사용됩니다.' }, ruins: { name: '공원 속 유적', location: '알다라, 라트비아', description: '라트비아 공원의 큰길에서 떨어진 숲속에 남은 석탑입니다.' }, texel: { name: '텍셀 해변', location: '텍셀섬, 네덜란드', description: '밀물과 썰물이 모래 위에 물결무늬를 그리는 텍셀섬의 넓은 모래사장입니다.' }, rhine: { name: '라인강 강변', location: '쾰른 로덴키르헨 · 시점 네 곳', description: '쾰른 중심 남쪽 로덴키르헨의 모래사장과 강변 숲입니다. 화살표나 W/S로 네 시점을 이동하고 A/D로 회전하세요.' } },
  viewpoints: { jelgava: { title: '옐가바 궁전' }, ruins: { title: '공원 속 유적' }, texel: { title: '텍셀 해변' }, rhineSand: { title: '모래 강변과 큰 나무' }, rhineRiver: { title: '강변을 따라' }, rhineCanopy: { title: '나무 그늘 아래' }, rhineTrail: { title: '숲길' } },
  navigation: { alongRiver: '강을 따라', backToSand: '모래 강변으로', underTrees: '나무 아래로', toRiver: '강변으로', forestTrail: '숲길', backToCanopy: '나무 그늘로 돌아가기' },
  hotspots: { jelgava: { arch: { title: '중앙 아치', description: '붉은 벽돌과 흰 장식의 정면 사이 아치가 안뜰로 이어집니다.' }, east: { title: '동쪽 건물', description: '아치형 창문이 고르게 이어진 긴 건물입니다.' } }, ruins: { tower: { title: '남은 석탑', description: '여러 층 높이의 돌벽이 울창한 나무에 둘러싸여 있습니다.' }, stones: { title: '유적 주변의 돌', description: '탑 아래 자연석이 흩어져 있어 걷기 어렵습니다.' } }, texel: { dunes: { title: '멀리 보이는 사구', description: '낮은 사구가 수평선을 따라 이어집니다.' }, waves: { title: '바다의 파도', description: '작은 파도가 끊임없이 모래사장에 닿습니다.' } }, rhine: { tree: { title: '강변의 큰 나무', description: '넓은 수관을 가진 나무 한 그루가 모래 위에 서 있습니다.' }, water: { title: '라인강', description: '강이 오른쪽으로 뻗고 맞은편에는 푸른 나무가 보입니다.' }, houses: { title: '강변 주택', description: '작은 집들이 물가에서 조금 떨어진 풀밭 뒤에 있습니다.' }, surface: { title: '라인강 수면', description: '잔잔한 물 너머로 짙은 녹색의 맞은편 강변이 보입니다.' }, trees: { title: '강변의 나무', description: '높은 나무들이 물가에서 해변 일부에 그늘을 만듭니다.' }, trunk: { title: '오래된 나무줄기', description: '큰 나무줄기와 가지가 시점 바로 옆의 하늘을 채웁니다.' }, bike: { title: '숲길 옆 자전거', description: '모래 숲길 옆에 자전거 한 대가 세워져 있습니다.' } } },
  discover: discoverKo,
}
