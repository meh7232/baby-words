'use client';

import { useState } from 'react';

const WORDS = {
  동물: [
    { emoji: '🐕', en: 'dog', ko: '강아지', pron: '독' },
    { emoji: '🐱', en: 'cat', ko: '고양이', pron: '캣' },
    { emoji: '🐦', en: 'bird', ko: '새', pron: '버드' },
    { emoji: '🐟', en: 'fish', ko: '물고기', pron: '피쉬' },
    { emoji: '🐰', en: 'rabbit', ko: '토끼', pron: '래빗' },
    { emoji: '🐻', en: 'bear', ko: '곰', pron: '베어' },
    { emoji: '🐘', en: 'elephant', ko: '코끼리', pron: '엘리펀트' },
    { emoji: '🦁', en: 'lion', ko: '사자', pron: '라이언' },
    { emoji: '🐒', en: 'monkey', ko: '원숭이', pron: '멍키' },
    { emoji: '🦆', en: 'duck', ko: '오리', pron: '덕' },
    { emoji: '🐄', en: 'cow', ko: '소', pron: '카우' },
    { emoji: '🐷', en: 'pig', ko: '돼지', pron: '피그' },
    { emoji: '🐴', en: 'horse', ko: '말', pron: '홀스' },
    { emoji: '🐑', en: 'sheep', ko: '양', pron: '쉽' },
    { emoji: '🐔', en: 'chicken', ko: '닭', pron: '치킨' },
    { emoji: '🐯', en: 'tiger', ko: '호랑이', pron: '타이거' },
    { emoji: '🐸', en: 'frog', ko: '개구리', pron: '프로그' },
    { emoji: '🦋', en: 'butterfly', ko: '나비', pron: '버터플라이' },
    { emoji: '🐧', en: 'penguin', ko: '펭귄', pron: '펭귄' },
    { emoji: '🦊', en: 'fox', ko: '여우', pron: '팍스' },
  ],
  과일: [
    { emoji: '🍎', en: 'apple', ko: '사과', pron: '애플' },
    { emoji: '🍌', en: 'banana', ko: '바나나', pron: '바나나' },
    { emoji: '🍊', en: 'orange', ko: '오렌지', pron: '오렌지' },
    { emoji: '🍇', en: 'grape', ko: '포도', pron: '그레입' },
    { emoji: '🍓', en: 'strawberry', ko: '딸기', pron: '스트로베리' },
    { emoji: '🍉', en: 'watermelon', ko: '수박', pron: '워터멜론' },
    { emoji: '🍑', en: 'peach', ko: '복숭아', pron: '피치' },
    { emoji: '🍒', en: 'cherry', ko: '체리', pron: '체리' },
    { emoji: '🥭', en: 'mango', ko: '망고', pron: '망고' },
    { emoji: '🍐', en: 'pear', ko: '배', pron: '페어' },
    { emoji: '🍋', en: 'lemon', ko: '레몬', pron: '레몬' },
    { emoji: '🍍', en: 'pineapple', ko: '파인애플', pron: '파인애플' },
    { emoji: '🥝', en: 'kiwi', ko: '키위', pron: '키위' },
    { emoji: '🥥', en: 'coconut', ko: '코코넛', pron: '코코넛' },
    { emoji: '🍈', en: 'melon', ko: '멜론', pron: '멜론' },
    { emoji: '🫐', en: 'blueberry', ko: '블루베리', pron: '블루베리' },
  ],
  신체: [
    { emoji: '👁️', en: 'eye', ko: '눈', pron: '아이' },
    { emoji: '👃', en: 'nose', ko: '코', pron: '노우즈' },
    { emoji: '👄', en: 'mouth', ko: '입', pron: '마우스' },
    { emoji: '👂', en: 'ear', ko: '귀', pron: '이어' },
    { emoji: '✋', en: 'hand', ko: '손', pron: '핸드' },
    { emoji: '🦶', en: 'foot', ko: '발', pron: '풋' },
    { emoji: '🦷', en: 'tooth', ko: '이', pron: '투스' },
    { emoji: '👆', en: 'finger', ko: '손가락', pron: '핑거' },
    { emoji: '💪', en: 'arm', ko: '팔', pron: '암' },
    { emoji: '🦵', en: 'leg', ko: '다리', pron: '레그' },
    { emoji: '🧠', en: 'head', ko: '머리', pron: '헤드' },
    { emoji: '👍', en: 'thumb', ko: '엄지', pron: '썸' },
    { emoji: '🦴', en: 'bone', ko: '뼈', pron: '본' },
    { emoji: '❤️', en: 'heart', ko: '심장', pron: '하트' },
    { emoji: '🫦', en: 'lip', ko: '입술', pron: '립' },
    { emoji: '🤜', en: 'fist', ko: '주먹', pron: '피스트' },
  ],
  가족: [
    { emoji: '👩', en: 'mama', ko: '엄마', pron: '마마' },
    { emoji: '👨', en: 'papa', ko: '아빠', pron: '파파' },
    { emoji: '👶', en: 'baby', ko: '아기', pron: '베이비' },
    { emoji: '👵', en: 'grandma', ko: '할머니', pron: '그랜마' },
    { emoji: '👴', en: 'grandpa', ko: '할아버지', pron: '그랜파' },
    { emoji: '👧', en: 'sister', ko: '언니/누나', pron: '시스터' },
    { emoji: '👦', en: 'brother', ko: '오빠/형', pron: '브라더' },
    { emoji: '👨‍👩‍👧', en: 'family', ko: '가족', pron: '패밀리' },
    { emoji: '👩‍👧', en: 'mother', ko: '어머니', pron: '마더' },
    { emoji: '👨‍👦', en: 'father', ko: '아버지', pron: '파더' },
    { emoji: '👫', en: 'friend', ko: '친구', pron: '프렌드' },
    { emoji: '👩‍🍼', en: 'aunt', ko: '이모/고모', pron: '앤트' },
    { emoji: '👨‍💼', en: 'uncle', ko: '삼촌', pron: '엉클' },
  ],
  동작: [
    { emoji: '🏃', en: 'run', ko: '달리다', pron: '런' },
    { emoji: '🛑', en: 'stop', ko: '멈추다', pron: '스탑' },
    { emoji: '🦘', en: 'jump', ko: '점프하다', pron: '점프' },
    { emoji: '🚶', en: 'walk', ko: '걷다', pron: '워크' },
    { emoji: '🪑', en: 'sit', ko: '앉다', pron: '싯' },
    { emoji: '🧍', en: 'stand', ko: '서다', pron: '스탠드' },
    { emoji: '😴', en: 'sleep', ko: '자다', pron: '슬립' },
    { emoji: '🍽️', en: 'eat', ko: '먹다', pron: '잇' },
    { emoji: '🥤', en: 'drink', ko: '마시다', pron: '드링크' },
    { emoji: '💃', en: 'dance', ko: '춤추다', pron: '댄스' },
    { emoji: '🎵', en: 'sing', ko: '노래하다', pron: '씽' },
    { emoji: '👏', en: 'clap', ko: '박수치다', pron: '클랩' },
    { emoji: '👋', en: 'wave', ko: '손흔들다', pron: '웨이브' },
    { emoji: '🦩', en: 'balance', ko: '한쪽발들기', pron: '발란스' },
    { emoji: '🌀', en: 'spin', ko: '돌다', pron: '스핀' },
    { emoji: '🤗', en: 'hug', ko: '안아주다', pron: '허그' },
    { emoji: '😂', en: 'laugh', ko: '웃다', pron: '래프' },
    { emoji: '🎯', en: 'throw', ko: '던지다', pron: '쓰로우' },
    { emoji: '🙌', en: 'catch', ko: '잡다', pron: '캣치' },
    { emoji: '🦵', en: 'kick', ko: '발차기', pron: '킥' },
  ],
};

const SONGS = [
  { emoji: '🦈', title: 'Baby Shark', ko: '아기상어', id: 'XqZsoesa55w' },
  { emoji: '⭐', title: 'Twinkle Twinkle', ko: '작은별', id: 'yCjJyiqpAuU' },
  { emoji: '🎵', title: '엄마가 찾은 노래', ko: '직접 추가한 노래', id: 'fPMjnlTEZwU' },
];

const CAT_COLORS: Record<string, string> = {
  동물: 'bg-green-400',
  과일: 'bg-orange-400',
  신체: 'bg-blue-400',
  가족: 'bg-pink-400',
  동작: 'bg-purple-400',
};

const CARD_COLORS = [
  'bg-yellow-100 border-yellow-300',
  'bg-pink-100 border-pink-300',
  'bg-green-100 border-green-300',
  'bg-blue-100 border-blue-300',
  'bg-purple-100 border-purple-300',
  'bg-orange-100 border-orange-300',
];

function speak(text: string) {
  if (typeof window === 'undefined') return;
  const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=en&client=tw-ob`;
  const audio = new Audio(url);
  audio.play().catch(() => {
    const synth = window.speechSynthesis;
    synth.cancel();
    setTimeout(() => {
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'en-US';
      utter.rate = 0.8;
      synth.speak(utter);
    }, 100);
  });
}

function isInAppBrowser() {
  if (typeof window === 'undefined') return false;
  const ua = navigator.userAgent;
  return /NAVER|KAKAOTALK|Instagram|FBAN|FBAV|Line\/|wv\)/.test(ua);
}

export default function Home() {
  const [cat, setCat] = useState<keyof typeof WORDS | '노래'>('동물');
  const [active, setActive] = useState<number | null>(null);
  const inApp = isInAppBrowser();

  const isSong = cat === '노래';
  const words = isSong ? [] : WORDS[cat as keyof typeof WORDS];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-white">

      {/* 인앱 브라우저 경고 */}
      {inApp && (
        <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-3 text-center">
          <p className="text-sm text-yellow-800 font-bold">🔈 소리가 안 들리면 크롬으로 열어주세요!</p>
          <a
            href={`intent://${window.location.host}${window.location.pathname}#Intent;scheme=https;package=com.android.chrome;end;`}
            className="text-xs text-blue-600 underline mt-1 inline-block"
          >
            크롬으로 열기 →
          </a>
        </div>
      )}

      {/* 헤더 */}
      <div className="text-center pt-8 pb-4 px-4">
        <p className="text-4xl mb-1">🌟</p>
        <h1 className="text-2xl font-black text-sky-500">Baby Words</h1>
        <p className="text-sm text-gray-400">{isSong ? '노래를 눌러서 들어봐요!' : '카드를 눌러서 발음을 들어봐요!'}</p>
      </div>

      {/* 카테고리 */}
      <div className="flex justify-center gap-2 flex-wrap px-4 mb-6">
        {(Object.keys(WORDS) as (keyof typeof WORDS)[]).map(c => (
          <button key={c} onClick={() => { setCat(c); setActive(null); }}
            className={`px-4 py-2 rounded-full text-white font-bold text-sm shadow-sm transition-all ${CAT_COLORS[c]} ${cat === c ? 'scale-110 shadow-md' : 'opacity-60'}`}>
            {c} ({WORDS[c].length})
          </button>
        ))}
        <button onClick={() => { setCat('노래'); setActive(null); }}
          className={`px-4 py-2 rounded-full text-white font-bold text-sm shadow-sm transition-all bg-red-400 ${cat === '노래' ? 'scale-110 shadow-md' : 'opacity-60'}`}>
          🎵 노래 ({SONGS.length})
        </button>
      </div>

      {/* 노래 탭 */}
      {isSong && (
        <div className="flex flex-col gap-5 px-4 pb-10 max-w-lg mx-auto">
          {SONGS.map(s => (
            <div key={s.id} className="bg-white rounded-3xl shadow-md overflow-hidden border border-gray-100">
              <div className="flex items-center gap-3 px-4 py-3 bg-red-50">
                <span className="text-3xl">{s.emoji}</span>
                <div>
                  <p className="font-black text-gray-700">{s.title}</p>
                  <p className="text-xs text-gray-400">{s.ko}</p>
                </div>
              </div>
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${s.id}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 단어 카드 */}
      {!isSong && (
        <div className="grid grid-cols-2 gap-3 px-4 pb-10 max-w-lg mx-auto">
          {words.map((w, i) => (
            <button key={w.en} onClick={() => { speak(w.en); setActive(i); }}
              className={`${CARD_COLORS[i % CARD_COLORS.length]} border-2 rounded-3xl p-4 flex flex-col items-center gap-1 shadow-sm active:scale-95 transition-all ${active === i ? 'scale-105 shadow-lg ring-2 ring-sky-300' : ''}`}>
              <span className="text-5xl">{w.emoji}</span>
              <span className="text-xl font-black text-gray-700 mt-1">{w.en}</span>
              <span className="text-xs font-bold text-sky-500">{w.pron}</span>
              <span className="text-xs text-gray-400">{w.ko}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
