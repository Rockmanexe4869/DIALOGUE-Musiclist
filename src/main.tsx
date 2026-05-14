import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { activeSongs, releases, type ActiveSong } from './data/releases';
import { loadJson, saveJson } from './utils/storage';
import './styles.css';

type Tab = 'ranking' | 'setlist' | 'data';
type RankingState = {
  queueIds: string[];
  rankedGroups: string[][];
  currentId?: string;
  low: number;
  high: number;
  mid: number;
  done: boolean;
  history: Omit<RankingState, 'history'>[];
};
type SetlistItem = { uid: string; songId: string; section: 'MAIN' | 'ENCORE' };

const rankingKey = 'dialogue-plus-ranking-v1';
const setlistKey = 'dialogue-plus-setlist-v1';
const songMap = new Map(activeSongs.map((song) => [song.id, song]));

function shuffledIds() {
  return [...activeSongs.map((song) => song.id)].sort(() => Math.random() - 0.5);
}

function createRankingState(): RankingState {
  const [first, second, ...rest] = shuffledIds();
  return {
    queueIds: rest,
    rankedGroups: first ? [[first]] : [],
    currentId: second,
    low: 0,
    high: first ? 0 : -1,
    mid: 0,
    done: activeSongs.length <= 1,
    history: [],
  };
}

function normalizeRankingState(state: RankingState): RankingState {
  const valid = new Set(activeSongs.map((song) => song.id));
  const rankedGroups = state.rankedGroups
    .map((group) => group.filter((id) => valid.has(id)))
    .filter((group) => group.length > 0);
  const used = new Set(rankedGroups.flat());
  const pending = [...state.queueIds.filter((id) => valid.has(id) && !used.has(id) && id !== state.currentId), ...activeSongs.map((song) => song.id).filter((id) => !used.has(id) && id !== state.currentId && !state.queueIds.includes(id))];
  const currentId = state.currentId && valid.has(state.currentId) && !used.has(state.currentId) ? state.currentId : pending[0];
  const queueIds = currentId === state.currentId ? pending : pending.slice(1);
  return { ...state, rankedGroups, queueIds, currentId, done: rankedGroups.flat().length >= activeSongs.length };
}

function RankingTab() {
  const [state, setState] = useState<RankingState>(() => normalizeRankingState(loadJson(rankingKey, createRankingState())));

  useEffect(() => saveJson(rankingKey, state), [state]);

  const current = state.currentId ? songMap.get(state.currentId) : undefined;
  const opponentGroup = state.rankedGroups[state.mid] ?? [];
  const opponent = opponentGroup.map((id) => songMap.get(id)).filter(Boolean) as ActiveSong[];
  const comparedCount = state.rankedGroups.flat().length;
  const done = state.done || comparedCount >= activeSongs.length;

  function pushHistory(next: Omit<RankingState, 'history'>): RankingState {
    const { history: _history, ...snapshot } = state;
    return { ...next, history: [...state.history, snapshot].slice(-200) };
  }

  function startNext(rankedGroups: string[][], queueIds: string[]): Omit<RankingState, 'history'> {
    const [nextCurrent, ...rest] = queueIds;
    if (!nextCurrent) {
      return { queueIds: [], rankedGroups, currentId: undefined, low: 0, high: -1, mid: 0, done: true };
    }
    const high = rankedGroups.length - 1;
    return { queueIds: rest, rankedGroups, currentId: nextCurrent, low: 0, high, mid: Math.floor(high / 2), done: false };
  }

  function choose(result: 'current' | 'opponent' | 'tie') {
    if (!current) return;
    const groups = state.rankedGroups.map((group) => [...group]);
    if (result === 'tie') {
      groups[state.mid] = [...groups[state.mid], current.id];
      setState(pushHistory(startNext(groups, state.queueIds)));
      return;
    }
    const low = result === 'current' ? state.low : state.mid + 1;
    const high = result === 'current' ? state.mid - 1 : state.high;
    if (low > high) {
      groups.splice(low, 0, [current.id]);
      setState(pushHistory(startNext(groups, state.queueIds)));
      return;
    }
    setState(pushHistory({ queueIds: state.queueIds, rankedGroups: state.rankedGroups, currentId: state.currentId, low, high, mid: Math.floor((low + high) / 2), done: false }));
  }

  function copyResult() {
    const text = state.rankedGroups
      .flatMap((group, index) => group.map((id) => `${index + 1}. ${songMap.get(id)?.title ?? id}`))
      .join('\n');
    navigator.clipboard.writeText(`DIALOGUE＋ 好きな楽曲ランキング\n${text}`);
  }

  return (
    <section className="page ranking-page">
      <header className="hero card">
        <p className="eyebrow">好きな曲を選ぶだけ</p>
        <h1>楽曲ランキング作成</h1>
        <p>二分挿入ソート方式で、全組み合わせより少ない比較回数でランキングを作ります。途中経過は自動保存されます。</p>
        <div className="progress"><span style={{ width: `${Math.min(100, (comparedCount / activeSongs.length) * 100)}%` }} /></div>
        <small>{comparedCount} / {activeSongs.length} 曲を配置済み</small>
      </header>

      {done ? (
        <div className="card result-card">
          <h2>完成！</h2>
          <button className="primary" onClick={copyResult}>結果をテキストでコピー</button>
          <ol className="ranking-list">
            {state.rankedGroups.map((group, index) => (
              <li key={group.join('-')}><strong>{index + 1}位</strong><span>{group.map((id) => songMap.get(id)?.title).join(' / ')}</span></li>
            ))}
          </ol>
        </div>
      ) : current && opponent.length ? (
        <div className="compare-area">
          <button className="song-choice card" onClick={() => choose('current')}>
            <span>こっちが好き</span><strong>{current.title}</strong><small>{current.releaseTitle}</small>
          </button>
          <button className="tie-button" onClick={() => choose('tie')}>引き分け</button>
          <button className="song-choice card" onClick={() => choose('opponent')}>
            <span>こっちが好き</span><strong>{opponent.map((song) => song.title).join(' / ')}</strong><small>現在の {state.mid + 1}位</small>
          </button>
        </div>
      ) : <p className="card">ランキングを準備中です。</p>}

      <div className="sticky-actions">
        <button disabled={!state.history.length} onClick={() => setState({ ...state.history.at(-1)!, history: state.history.slice(0, -1) })}>戻る</button>
        <button className="danger" onClick={() => confirm('ランキングをリセットしますか？') && setState(createRankingState())}>リセット</button>
      </div>
    </section>
  );
}

function SetlistTab() {
  const [items, setItems] = useState<SetlistItem[]>(() => loadJson(setlistKey, []));
  const [query, setQuery] = useState('');

  useEffect(() => saveJson(setlistKey, items), [items]);

  const filtered = useMemo(() => activeSongs.filter((song) => song.title.toLowerCase().includes(query.toLowerCase())).slice(0, 30), [query]);

  function add(song: ActiveSong) {
    setItems([...items, { uid: `${song.id}-${crypto.randomUUID()}`, songId: song.id, section: 'MAIN' }]);
  }

  function move(index: number, delta: -1 | 1) {
    const next = [...items];
    const target = index + delta;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setItems(next);
  }

  function copySetlist() {
    const lines = items.map((item, index) => `${index + 1}. [${item.section}] ${songMap.get(item.songId)?.title ?? item.songId}`);
    navigator.clipboard.writeText(`俺だけのDIALOGUE＋セットリスト\n${lines.join('\n')}`);
  }

  return (
    <section className="page">
      <div className="card">
        <p className="eyebrow">同じ曲も何回でも追加OK</p>
        <h1>セットリスト作成</h1>
        <input className="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="曲名で検索" />
        <div className="song-grid">
          {filtered.map((song) => <button key={song.id} onClick={() => add(song)}>{song.title}<small>{song.releaseTitle}</small></button>)}
        </div>
      </div>

      <div className="card">
        <div className="section-title"><h2>セットリスト</h2><button onClick={copySetlist} disabled={!items.length}>コピー</button></div>
        {items.length === 0 ? <p className="empty">曲をタップして追加してください。</p> : (
          <ol className="setlist">
            {items.map((item, index) => {
              const song = songMap.get(item.songId);
              return <li key={item.uid}>
                <div><strong>{song?.title}</strong><small>{index + 1}曲目 / {item.section}</small></div>
                <div className="row-actions">
                  <button onClick={() => move(index, -1)}>↑</button><button onClick={() => move(index, 1)}>↓</button>
                  <button onClick={() => setItems(items.map((entry) => entry.uid === item.uid ? { ...entry, section: entry.section === 'MAIN' ? 'ENCORE' : 'MAIN' } : entry))}>{item.section === 'MAIN' ? 'EN' : 'MAIN'}</button>
                  <button className="danger" onClick={() => setItems(items.filter((entry) => entry.uid !== item.uid))}>削除</button>
                </div>
              </li>;
            })}
          </ol>
        )}
      </div>
    </section>
  );
}

function DataTab() {
  const [showExcluded, setShowExcluded] = useState(true);
  return (
    <section className="page">
      <div className="card">
        <p className="eyebrow">テキスト情報のみ</p>
        <h1>楽曲データ確認</h1>
        <p>曲名・作品名・発売日・公式URLだけを管理しています。音源、動画、ジャケット画像、歌詞は含みません。</p>
        <label className="switch"><input type="checkbox" checked={showExcluded} onChange={(event) => setShowExcluded(event.target.checked)} /> 除外曲も表示</label>
      </div>
      {releases.map((release) => (
        <article className="card release-card" key={release.id}>
          <h2>{release.title}</h2>
          <p className="meta">発売日: {release.releaseDate} / <a href={release.sourceUrl} target="_blank" rel="noreferrer">公式ディスコグラフィ</a></p>
          <ul>
            {release.songs.filter((song) => showExcluded || !song.excluded).map((song) => (
              <li key={song.id} className={song.excluded ? 'excluded' : ''}>
                <strong>{song.title}</strong>
                {song.excluded ? <span>除外: {song.excludeReason}</span> : <span>表示対象</span>}
                {song.notes && <small>{song.notes}</small>}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </section>
  );
}

function App() {
  const [tab, setTab] = useState<Tab>('ranking');
  return (
    <>
      <main><div className="app-shell">{tab === 'ranking' && <RankingTab />}{tab === 'setlist' && <SetlistTab />}{tab === 'data' && <DataTab />}</div></main>
      <nav className="bottom-nav">
        <button className={tab === 'ranking' ? 'active' : ''} onClick={() => setTab('ranking')}>ランキング</button>
        <button className={tab === 'setlist' ? 'active' : ''} onClick={() => setTab('setlist')}>セットリスト</button>
        <button className={tab === 'data' ? 'active' : ''} onClick={() => setTab('data')}>楽曲データ</button>
      </nav>
    </>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
