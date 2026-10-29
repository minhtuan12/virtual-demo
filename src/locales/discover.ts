const facts = (duration: string, season: string, terrain: string) => ({ duration, season, terrain })

export const discoverEn = {
  nav: { label: 'Main navigation', explore: '360° Explore', discover: 'Discover' },
  hero: { eyebrow: 'Plan your next walk', title: 'Four places, beyond the panorama', body: 'Compare landscapes, culture, and practical details before stepping into the 360° experience.' },
  search: { label: 'Search destinations', placeholder: 'Search by place, country, or interest' },
  filters: { label: 'Filter destinations', country: 'Country', category: 'Category', allCountries: 'All countries', allCategories: 'All categories', favoritesOnly: 'Favorites only', reset: 'Reset filters' },
  results: { title: 'Places to discover', count: '{{count}} destinations' },
  empty: { title: 'No places match these filters', body: 'Try another search or reset the filters.' },
  actions: { details: 'View details', open360: 'Open 360°', addFavorite: 'Add {{name}} to favorites', removeFavorite: 'Remove {{name}} from favorites' },
  countries: { latvia: 'Latvia', netherlands: 'Netherlands', germany: 'Germany' },
  categories: { culture: 'Culture', coast: 'Coast', nature: 'Nature' },
  tags: { architecture: 'Architecture', history: 'History', heritage: 'Heritage', woodland: 'Woodland', beach: 'Beach', walking: 'Walking', river: 'River' },
  imageAlt: { jelgava: 'Baroque façade of Jelgava Palace', ruins: 'Stone ruins among green trees', texel: 'Wide sandy beach on Texel Island', rhine: 'Wooded bank beside the Rhine' },
  facts: { jelgava: facts('45–60 min', 'May–September', 'Paved courtyard'), ruins: facts('30–45 min', 'April–October', 'Uneven woodland path'), texel: facts('1–2 hours', 'June–September', 'Sand and dunes'), rhine: facts('1–2 hours', 'April–October', 'Sand and forest trail') },
  modal: { close: 'Close destination details', practical: 'Practical details', duration: 'Suggested time', season: 'Best season', terrain: 'Terrain', attribution: 'Photo attribution' },
} as const

export const discoverVi = {
  nav: { label: 'Điều hướng chính', explore: 'Khám phá 360°', discover: 'Điểm đến' },
  hero: { eyebrow: 'Lên kế hoạch cho chuyến đi', title: 'Bốn điểm đến, vượt ra ngoài panorama', body: 'So sánh cảnh quan, văn hóa và thông tin thực tế trước khi bước vào trải nghiệm 360°.' },
  search: { label: 'Tìm kiếm điểm đến', placeholder: 'Tìm theo địa điểm, quốc gia hoặc sở thích' },
  filters: { label: 'Lọc điểm đến', country: 'Quốc gia', category: 'Chủ đề', allCountries: 'Tất cả quốc gia', allCategories: 'Tất cả chủ đề', favoritesOnly: 'Chỉ mục yêu thích', reset: 'Đặt lại bộ lọc' },
  results: { title: 'Các điểm đến', count: '{{count}} điểm đến' },
  empty: { title: 'Không có điểm đến phù hợp', body: 'Hãy thử từ khóa khác hoặc đặt lại bộ lọc.' },
  actions: { details: 'Xem chi tiết', open360: 'Mở 360°', addFavorite: 'Thêm {{name}} vào yêu thích', removeFavorite: 'Xóa {{name}} khỏi yêu thích' },
  countries: { latvia: 'Latvia', netherlands: 'Hà Lan', germany: 'Đức' },
  categories: { culture: 'Văn hóa', coast: 'Bờ biển', nature: 'Thiên nhiên' },
  tags: { architecture: 'Kiến trúc', history: 'Lịch sử', heritage: 'Di sản', woodland: 'Rừng cây', beach: 'Bãi biển', walking: 'Đi bộ', river: 'Dòng sông' },
  imageAlt: { jelgava: 'Mặt tiền Baroque của cung điện Jelgava', ruins: 'Tàn tích đá giữa những hàng cây xanh', texel: 'Bãi cát rộng trên đảo Texel', rhine: 'Bờ cây xanh bên sông Rhine' },
  facts: { jelgava: facts('45–60 phút', 'Tháng 5–9', 'Sân lát đá'), ruins: facts('30–45 phút', 'Tháng 4–10', 'Đường rừng gồ ghề'), texel: facts('1–2 giờ', 'Tháng 6–9', 'Cát và cồn cát'), rhine: facts('1–2 giờ', 'Tháng 4–10', 'Cát và đường rừng') },
  modal: { close: 'Đóng thông tin điểm đến', practical: 'Thông tin thực tế', duration: 'Thời gian gợi ý', season: 'Mùa đẹp nhất', terrain: 'Địa hình', attribution: 'Nguồn ảnh' },
} as const

export const discoverDe = {
  nav: { label: 'Hauptnavigation', explore: '360° erkunden', discover: 'Entdecken' },
  hero: { eyebrow: 'Planen Sie Ihren nächsten Spaziergang', title: 'Vier Orte, mehr als ein Panorama', body: 'Vergleichen Sie Landschaft, Kultur und praktische Hinweise vor dem 360°-Erlebnis.' },
  search: { label: 'Reiseziele suchen', placeholder: 'Nach Ort, Land oder Interesse suchen' },
  filters: { label: 'Reiseziele filtern', country: 'Land', category: 'Kategorie', allCountries: 'Alle Länder', allCategories: 'Alle Kategorien', favoritesOnly: 'Nur Favoriten', reset: 'Filter zurücksetzen' },
  results: { title: 'Orte entdecken', count: '{{count}} Reiseziele' },
  empty: { title: 'Keine passenden Orte', body: 'Versuchen Sie eine andere Suche oder setzen Sie die Filter zurück.' },
  actions: { details: 'Details ansehen', open360: '360° öffnen', addFavorite: '{{name}} zu Favoriten hinzufügen', removeFavorite: '{{name}} aus Favoriten entfernen' },
  countries: { latvia: 'Lettland', netherlands: 'Niederlande', germany: 'Deutschland' },
  categories: { culture: 'Kultur', coast: 'Küste', nature: 'Natur' },
  tags: { architecture: 'Architektur', history: 'Geschichte', heritage: 'Kulturerbe', woodland: 'Wald', beach: 'Strand', walking: 'Wandern', river: 'Fluss' },
  imageAlt: { jelgava: 'Barockfassade des Schlosses Jelgava', ruins: 'Steinruine zwischen grünen Bäumen', texel: 'Breiter Sandstrand auf Texel', rhine: 'Bewaldetes Ufer am Rhein' },
  facts: { jelgava: facts('45–60 Min.', 'Mai–September', 'Gepflasterter Hof'), ruins: facts('30–45 Min.', 'April–Oktober', 'Unebener Waldweg'), texel: facts('1–2 Std.', 'Juni–September', 'Sand und Dünen'), rhine: facts('1–2 Std.', 'April–Oktober', 'Sand- und Waldweg') },
  modal: { close: 'Reisezieldetails schließen', practical: 'Praktische Hinweise', duration: 'Empfohlene Zeit', season: 'Beste Reisezeit', terrain: 'Gelände', attribution: 'Bildnachweis' },
} as const

export const discoverKo = {
  nav: { label: '주요 탐색', explore: '360° 둘러보기', discover: '여행지 찾기' },
  hero: { eyebrow: '다음 산책을 계획하세요', title: '파노라마 너머의 네 장소', body: '360° 체험에 들어가기 전 풍경, 문화와 실용 정보를 비교해 보세요.' },
  search: { label: '여행지 검색', placeholder: '장소, 국가 또는 관심사로 검색' },
  filters: { label: '여행지 필터', country: '국가', category: '카테고리', allCountries: '모든 국가', allCategories: '모든 카테고리', favoritesOnly: '즐겨찾기만', reset: '필터 초기화' },
  results: { title: '둘러볼 장소', count: '여행지 {{count}}곳' },
  empty: { title: '조건에 맞는 장소가 없습니다', body: '다른 검색어를 입력하거나 필터를 초기화해 보세요.' },
  actions: { details: '상세 보기', open360: '360° 열기', addFavorite: '{{name}} 즐겨찾기에 추가', removeFavorite: '{{name}} 즐겨찾기에서 삭제' },
  countries: { latvia: '라트비아', netherlands: '네덜란드', germany: '독일' },
  categories: { culture: '문화', coast: '해안', nature: '자연' },
  tags: { architecture: '건축', history: '역사', heritage: '유산', woodland: '숲', beach: '해변', walking: '걷기', river: '강' },
  imageAlt: { jelgava: '옐가바 궁전의 바로크 양식 외관', ruins: '푸른 나무 사이의 석조 유적', texel: '텍셀섬의 넓은 모래 해변', rhine: '라인강 옆 숲이 우거진 강변' },
  facts: { jelgava: facts('45–60분', '5월–9월', '포장된 안뜰'), ruins: facts('30–45분', '4월–10월', '고르지 않은 숲길'), texel: facts('1–2시간', '6월–9월', '모래와 사구'), rhine: facts('1–2시간', '4월–10월', '모래와 숲길') },
  modal: { close: '여행지 상세 정보 닫기', practical: '여행 정보', duration: '권장 시간', season: '추천 계절', terrain: '지형', attribution: '사진 출처' },
} as const

export const discoverJa = {
  nav: { label: 'メインナビゲーション', explore: '360°を見る', discover: '見つける' },
  hero: { eyebrow: '次の散策を計画', title: 'パノラマの先にある4つの場所', body: '360°体験に入る前に、風景、文化、実用情報を比べてみましょう。' },
  search: { label: '行き先を検索', placeholder: '場所、国、興味から検索' },
  filters: { label: '行き先を絞り込む', country: '国', category: 'カテゴリー', allCountries: 'すべての国', allCategories: 'すべてのカテゴリー', favoritesOnly: 'お気に入りのみ', reset: 'フィルターをリセット' },
  results: { title: '見つける場所', count: '{{count}}件の行き先' },
  empty: { title: '条件に合う場所がありません', body: '別の言葉で検索するか、フィルターをリセットしてください。' },
  actions: { details: '詳細を見る', open360: '360°を開く', addFavorite: '{{name}}をお気に入りに追加', removeFavorite: '{{name}}をお気に入りから削除' },
  countries: { latvia: 'ラトビア', netherlands: 'オランダ', germany: 'ドイツ' },
  categories: { culture: '文化', coast: '海岸', nature: '自然' },
  tags: { architecture: '建築', history: '歴史', heritage: '文化遺産', woodland: '森林', beach: 'ビーチ', walking: '散策', river: '川' },
  imageAlt: { jelgava: 'イェルガヴァ宮殿のバロック様式の外観', ruins: '緑の木々に囲まれた石の遺跡', texel: 'テセル島の広い砂浜', rhine: 'ライン川沿いの木々に覆われた岸辺' },
  facts: { jelgava: facts('45～60分', '5月～9月', '舗装された中庭'), ruins: facts('30～45分', '4月～10月', '起伏のある森の小道'), texel: facts('1～2時間', '6月～9月', '砂浜と砂丘'), rhine: facts('1～2時間', '4月～10月', '砂地と森の小道') },
  modal: { close: '行き先の詳細を閉じる', practical: '実用情報', duration: '所要時間の目安', season: 'おすすめの季節', terrain: '地形', attribution: '写真の出典' },
} as const
