export type Song = {
  id: string;
  title: string;
  excluded: boolean;
  excludeReason?: string;
  notes?: string;
};

export type Release = {
  id: string;
  title: string;
  releaseDate: string;
  sourceUrl: string;
  songs: Song[];
};

const official = 'https://dialogue-music.jp/discography/';

export const releases: Release[] = [
  {
    id: 'dreamy-logue',
    title: 'Mini Album「DREAMY-LOGUE」',
    releaseDate: '2020-04-08',
    sourceUrl: `${official}02_dreamy-logue/`,
    songs: [
      { id: 'kai-kai-sengen', title: 'かいかいせんげん！', excluded: false, notes: 'Mini Album収録' },
      { id: 'dialogue-invitation', title: 'ダイアローグ＋インビテーション！', excluded: false },
      { id: 'domestic-force', title: 'Domestic Force!!', excluded: false },
      { id: 'goodbye-already', title: 'また立ち上がる', excluded: false, notes: 'SCENE C-2系楽曲' },
      { id: 'dialogue-joujou', title: 'DIALOGUE＋は上々だ', excluded: false, notes: 'SCENE B-2系楽曲' },
      { id: 'talk-talk-talk', title: 'トーク！トーク！トーク！', excluded: false },
      { id: 'pajama-de-party', title: 'パジャマdeパーティー', excluded: false },
    ],
  },
  {
    id: 'hajimete-no-kakumei',
    title: 'Debut Single「はじめてのかくめい！」',
    releaseDate: '2019-10-23',
    sourceUrl: `${official}01_hajimetenokakumei/`,
    songs: [
      { id: 'hajimete-no-kakumei-original-single', title: 'はじめてのかくめい！', excluded: true, excludeReason: '1st Album「DIALOGUE＋1」側を優先' },
      { id: 'daibouken-original-single', title: '大冒険をよろしく', excluded: true, excludeReason: '1st Album「DIALOGUE＋1」側を優先' },
      { id: 'hajimete-no-kakumei-tv-size', title: 'はじめてのかくめい！ TV Size Ver.', excluded: true, excludeReason: 'TV Size' },
      { id: 'hajimete-no-kakumei-instrumental', title: 'はじめてのかくめい！ Instrumental', excluded: true, excludeReason: 'Instrumental' },
      { id: 'daibouken-instrumental', title: '大冒険をよろしく Instrumental', excluded: true, excludeReason: 'Instrumental' },
    ],
  },
  {
    id: 'atarimae-dakara',
    title: 'きゃにめ&配信限定シングル「あたりまえだから」',
    releaseDate: '2020-06-17',
    sourceUrl: `${official}03_atarimaedakara/`,
    songs: [
      { id: 'atarimae-dakara', title: 'あたりまえだから', excluded: false, notes: '配信限定シングル' },
      { id: 'atarimae-member-uchiyama', title: 'あたりまえだから（内山悠里菜ver.）', excluded: true, excludeReason: 'メンバーver.' },
      { id: 'atarimae-member-hieda', title: 'あたりまえだから（稗田寧々ver.）', excluded: true, excludeReason: 'メンバーver.' },
    ],
  },
  {
    id: 'natsu-no-hanabi',
    title: 'Digital Single「夏の花火と君と青」',
    releaseDate: '2020-12-23',
    sourceUrl: `${official}07_natsuno-hanabi/`,
    songs: [{ id: 'natsu-no-hanabi-to-kimi-to-ao', title: '夏の花火と君と青', excluded: false, notes: '配信限定シングル' }],
  },
  {
    id: 'dialogue-1',
    title: '1st Album「DIALOGUE＋1」',
    releaseDate: '2021-09-01',
    sourceUrl: `${official}09_dialogue%2B1/`,
    songs: [
      { id: 'hajimete-no-kakumei', title: 'はじめてのかくめい！', excluded: false },
      { id: 'jinsei-easy', title: '人生イージー？', excluded: false },
      { id: 'ayafuwa-asterisk', title: 'あやふわアスタリスク', excluded: false },
      { id: 'omoide-shiritori', title: 'おもいでしりとり', excluded: false },
      { id: 'daibouken-wo-yoroshiku', title: '大冒険をよろしく', excluded: false },
      { id: 'dramatic-piece', title: 'ドラマティックピース!!', excluded: false },
      { id: 'sugar-rocket', title: 'シュガーロケット', excluded: false },
      { id: 'i-my-me-mind', title: 'I my me mind', excluded: false },
      { id: 'aigatte-rante', title: 'アイガッテ♡ランテ', excluded: false },
      { id: 'nazotoki-wa-kiss', title: '謎解きはキスのあとで', excluded: false },
      { id: 'private', title: 'プライベイト', excluded: false },
      { id: 'gagapi-gaga', title: 'ガガピーガガ', excluded: false },
      { id: 'twentyxx-mue-no-hikari', title: '20XX MUEの光', excluded: false },
      { id: 'sincere-grace', title: 'Sincere Grace', excluded: false },
      { id: 'hanasaku-bokura-no-answer', title: '花咲く僕らのアンサーを', excluded: false },
      { id: 'toumei-de-kirei', title: '透明できれい', excluded: false },
      { id: 'suki-dayo-suki', title: '好きだよ、好き。', excluded: false },
    ],
  },
  {
    id: 'dialogue-2',
    title: '2nd Album「DIALOGUE＋２」',
    releaseDate: '2023-02-22',
    sourceUrl: `${official}15_dialogue%2B2/`,
    songs: [
      { id: 'd-plus-has-come', title: 'D＋ has come', excluded: false },
      { id: 'zekkei-zekkou-superday', title: '絶景絶好スーパーデイ!!', excluded: false },
      { id: '1000mankai-hug-nanda', title: '1000万回ハグなんだ', excluded: false },
      { id: 'koi-wa-sekai-teiri', title: '恋は世界定理と共に', excluded: false },
      { id: 'metcha-only-you', title: 'めっちゃオンリーユー', excluded: false },
      { id: 'yabakyun-schubert', title: 'やばきゅん♡シューベルト', excluded: false },
      { id: 'mahoroba-deli', title: 'MAHOROBA-Deli', excluded: false },
      { id: 'bokura-ga-oroka', title: '僕らが愚かだなんて誰が言った', excluded: false },
      { id: 'ushimitsu-appareid', title: 'うしみつあっパレイド', excluded: false },
      { id: 'yuuzora-kouro', title: '夕空航路', excluded: false },
      { id: 'deneb-to-spica', title: 'デネブとスピカ', excluded: false },
      { id: 'bokura-no-universe', title: 'ぼくらのユニバース', excluded: false },
    ],
  },
  {
    id: 'dialogue-3',
    title: '3rd Album「DIALOGUE＋3」',
    releaseDate: '2024-09-18',
    sourceUrl: `${official}24_dialogue%2B3/`,
    songs: [
      { id: 'fu-tsu-tsu-ka-i-love-you', title: 'FU-TSU-TSU-KA I love you', excluded: false },
      { id: 'everything', title: 'everything!', excluded: false },
      { id: 'utopia-gakugairon', title: 'ユートピア学概論', excluded: false },
      { id: 'tabi-no-tochu', title: 'たびのとちゅ', excluded: false },
      { id: 'dareka-janai-kara', title: '誰かじゃないから', excluded: false },
      { id: 'nyanbori-de-moffy', title: 'にゃんぼりーdeモッフィー!!', excluded: false },
      { id: 'itetsuite-byousoku', title: '凍てついて秒速', excluded: false },
      { id: 'kore-wa-kunren-dewanai', title: 'これは訓練ではない', excluded: false },
      { id: 'easy-hard-shikashite-susume', title: 'イージー？ハード？しかして進めっ！', excluded: false },
      { id: 'kasuka-de-tashika', title: 'かすかでたしか', excluded: false },
      { id: 'dialogue-kawaii', title: 'dialogue＋kawaii', excluded: false },
      { id: 'watashitachi-no-rhapsody', title: 'わたしたちのラプソディー', excluded: false },
      { id: 'ryuuseigun-no-mukou-de', title: '流星群の向こうで', excluded: false },
    ],
  },
  {
    id: 'penta-logue',
    title: 'NEW EP「PENTA+LOGUE」',
    releaseDate: '2025-09-03',
    sourceUrl: `${official}28_pentalogue/`,
    songs: [
      { id: 'rockn-roll', title: 'ロックンロール！', excluded: false },
      { id: 'jintonic-disco', title: 'ジントニック・ディスコ', excluded: false },
      { id: 'joyful-ciante', title: 'じょいふるしあんてっ！', excluded: false },
      { id: 'kakunogotoki-dance', title: 'カクノゴトキdance', excluded: false },
      { id: 'gozen6ji-no-tomodachi', title: '午前6時の友達へ', excluded: false },
    ],
  },
  {
    id: 'super-sonic-loguenizer',
    title: 'きゃにめ&配信限定シングル「Super Sonic Loguenizer」',
    releaseDate: '2026-01-14',
    sourceUrl: `${official}29_super-sonic-loguenizer/`,
    songs: [
      { id: 'super-sonic-loguenizer', title: 'Super Sonic Loguenizer', excluded: false },
      { id: 'dialogue-the-movie', title: 'DIALOGUE＋THE MOVIE', excluded: false },
    ],
  },
  {
    id: 'kiseki-wa-okinaI',
    title: '14th Single「奇跡は起きない」',
    releaseDate: '2026-04-23',
    sourceUrl: `${official}30_kisekihawokinai/`,
    songs: [
      { id: 'kiseki-wa-okinai', title: '奇跡は起きない', excluded: false },
      { id: 'futari-furitsumotteiku', title: '２人、降り積もっていく', excluded: false },
      { id: 'kiseki-wa-okinai-tv-size', title: '奇跡は起きない TV Size Ver.', excluded: true, excludeReason: 'TV Size' },
      { id: 'kiseki-wa-okinai-instrumental', title: '奇跡は起きない Instrumental', excluded: true, excludeReason: 'Instrumental' },
    ],
  },
  {
    id: 'natsu-ni-kasanete',
    title: '15th Single「夏に重ねて」',
    releaseDate: '2026-07-08',
    sourceUrl: `${official}31_natsuni-kasanete/`,
    songs: [
      { id: 'natsu-ni-kasanete', title: '夏に重ねて', excluded: false },
      { id: 'veranda-no-shiori', title: 'ベランダの栞', excluded: false },
      { id: 'natsu-ni-kasanete-tv-size', title: '夏に重ねて TV Size Ver.', excluded: true, excludeReason: 'TV Size' },
      { id: 'natsu-ni-kasanete-instrumental', title: '夏に重ねて Instrumental', excluded: true, excludeReason: 'Instrumental' },
      { id: 'veranda-no-shiori-instrumental', title: 'ベランダの栞 Instrumental', excluded: true, excludeReason: 'Instrumental' },
    ],
  },
  {
    id: 'single-duplicates-and-excluded',
    title: 'Single / Blu-ray収録の重複・除外管理',
    releaseDate: '2026-07-08',
    sourceUrl: official,
    songs: [
      { id: 'jinsei-easy-single', title: '人生イージー？', excluded: true, excludeReason: '1st Album「DIALOGUE＋1」側を優先' },
      { id: 'ayafuwa-asterisk-single', title: 'あやふわアスタリスク', excluded: true, excludeReason: '1st Album「DIALOGUE＋1」側を優先' },
      { id: 'omoide-shiritori-single', title: 'おもいでしりとり', excluded: true, excludeReason: '1st Album「DIALOGUE＋1」側を優先' },
      { id: 'koi-wa-sekai-single', title: '恋は世界定理と共に', excluded: true, excludeReason: '2nd Album「DIALOGUE＋２」側を優先' },
      { id: 'deneb-to-spica-single', title: 'デネブとスピカ', excluded: true, excludeReason: '2nd Album「DIALOGUE＋２」側を優先' },
      { id: 'kasuka-de-tashika-single', title: 'かすかでたしか', excluded: true, excludeReason: '3rd Album「DIALOGUE＋3」側を優先' },
      { id: 'treasure', title: 'TREASURE！', excluded: false, notes: '12th Single' },
      { id: 'alibi-na-curtsey', title: 'アリバイなカーテシー', excluded: false, notes: '13th Single' },
      { id: 'friend-fanfare', title: 'フレンドファンファーレ', excluded: false, notes: 'きゃにめ&配信限定シングル' },
      { id: 'hatchake-dialogue-christmas', title: 'はっちゃけダイアローグ＋クリスマス！', excluded: false, notes: 'クリスマスシングル' },
      { id: 'come-on-dream-on', title: '来世なんて待ってらんない', excluded: false, notes: 'Bonus live音源系として残す' },
      { id: 'life-is-easy-live', title: '人生イージー？2023', excluded: false, notes: '年度違い・再録のため別曲扱い' },
      { id: 'hajimete-2023', title: 'はじめてのかくめい！2023', excluded: false, notes: '年度違い・再録のため別曲扱い' },
      { id: 'cover-ready-made', title: 'さよならレディーメイド', excluded: true, excludeReason: 'カバー曲' },
      { id: 'cover-munya', title: 'むにゃむにゃゲッチュー恋吹雪！', excluded: true, excludeReason: 'カバー曲' },
      { id: 'bluray-only-band-time', title: 'BAND TIME', excluded: true, excludeReason: 'Blu-ray映像のみ' },
      { id: 'regular-live-ver-example', title: 'はじめてのかくめい！ Live ver.', excluded: true, excludeReason: '通常音源があるLive ver.' },
    ],
  },
];

export const activeSongs = releases.flatMap((release) =>
  release.songs
    .filter((song) => !song.excluded)
    .map((song) => ({ ...song, releaseId: release.id, releaseTitle: release.title, releaseDate: release.releaseDate, sourceUrl: release.sourceUrl })),
);

export type ActiveSong = (typeof activeSongs)[number];
