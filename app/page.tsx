'use client';

import { useState } from 'react';

const WORDS = {
  동물: [
    { emoji: '🐕', en: 'dog', ko: '강아지' },
    { emoji: '🐱', en: 'cat', ko: '고양이' },
    { emoji: '🐦', en: 'bird', ko: '새' },
    { emoji: '🐟', en: 'fish', ko: '물고기' },
    { emoji: '🐰', en: 'rabbit', ko: '토끼' },
    { emoji: '🐻', en: 'bear', ko: '곰' },
    { emoji: '🐘', en: 'elephant', ko: '코끼리' },
    { emoji: '🦁', en: 'lion', ko: '사자' },
    { emoji: '🐒', en: 'monkey', ko: '원숭이' },
    { emoji: '🦆', en: 'duck', ko: '오리' },
    { emoji: '🐄', en: 'cow', ko: '소' },
    { emoji: '🐷', en: 'pig', ko: '돼지' },
  ],
  과일: [
    { emoji: '🍎', en: 'apple', ko: '사과' },
    { emoji: '🍌', en: 'banana', ko: '바나나' },
    { emoji: '🍊', en: 'orange', ko: '오렌지' },
    { emoji: '🍇', en: 'grape', ko: '포도' },
    { emoji: '🍓', en: 'strawberry', ko: '딸기' },
    { emoji: '🍉', en: 'watermelon', ko: '수박' },
    { emoji: '🍑', en: 'peach', ko: '복숭아' },
    { emoji: '🍒', en: 'cherry', ko: '체리' },
    { emoji: '🥭', en: 'mango', ko: '망고' },
    { emoji: '🍐', en: 'pear', ko: '배' },
  ],
  신체: [
    { emoji: '👁️', en: 'eye', ko: '눈' },
    { emoji: '👃', en: 'nose', ko: '코' },
    { emoji: '👄', en: 'mouth', ko: '입' },
    { emoji: '👂', en: 'ear', ko: '귀' },
    { emoji: '✋', en: 'hand', ko: '손' },
    { emoji: '🦶', en: 'foot', ko: '발' },
    { emoji: '🦷', en: 'tooth', ko: '이' },
    { emoji: '👆', en: 'finger', ko: '손가락' },
    { emoji: '💪', en: 'arm', ko: '팔' },
    { emoji: '🦵', en: 'leg', ko: '다리' },
  ],
  가족: [
    { emoji: '👩', en: 'mama', ko: '엄마' },
    { emoji: '👨', en: 'papa', ko: '아빠' },
    { emoji: '👶', en: 'baby', ko: '아기' },
    { emoji: '👵', en: 'grandma', ko: '할머니' },
    { emoji: '👴', en: 'grandpa', ko: '할아버지' },
    { emoji: '👧', en: 'sister', ko: '언니/누나' },
    { emoji: '👦', en: 'brother', ko: '오빠/형' },
    { emoji: '👨‍👩‍👧', en: 'family', ko: '가족' },
  ],
};

const CAT_COLORS: Record<string, string> = {
  동물: 'bg-green-400',
  과일: 'bg-orange-400',
  신체: 'bg-blue-400',
  가족: 'bg-pink-400',
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
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'en-US';
  utter.rate = 0.8;
  utter.pitch = 1.2;
  window.speechSynthesis.speak(utter);
}

export default function Home() {
  const [cat, setCat] = useState<keyof typeof WORDS>('동물');
  const [active, setActive] = useState<number | null>(null);

  const words = WORDS[cat];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-white">
      {/* 헤더 */}
      <div className="text-center pt-8 pb-4 px-4">
        <p className="text-4xl mb-1">🌟</p>
        <h1 className="text-2xl font-black text-sky-500">Baby Words</h1>
        <p className="text-sm text-gray-400">단어를 눌러서 들어봐요!</p>
      </div>

      {/* 카테고리 */}
      <div className="flex justify-center gap-2 flex-wrap px-4 mb-6">
        {(Object.keys(WORDS) as (keyof typeof WORDS)[]).map(c => (
          <button key={c} onClick={() => { setCat(c); setActive(null); }}
            className={`px-5 py-2 rounded-full text-white font-bold text-sm shadow-sm transition-all ${CAT_COLORS[c]} ${cat === c ? 'scale-110 shadow-md' : 'opacity-60'}`}>
            {c}
          </button>
        ))}
      </div>

      {/* 단어 카드 */}
      <div className="grid grid-cols-2 gap-3 px-4 pb-10 max-w-lg mx-auto">
        {words.map((w, i) => (
          <button key={w.en} onClick={() => { speak(w.en); setActive(i); }}
            className={`${CARD_COLORS[i % CARD_COLORS.length]} border-2 rounded-3xl p-4 flex flex-col items-center gap-1 shadow-sm active:scale-95 transition-all ${active === i ? 'scale-105 shadow-lg' : ''}`}>
            <span className="text-5xl">{w.emoji}</span>
            <span className="text-xl font-black text-gray-700 mt-1">{w.en}</span>
            <span className="text-sm text-gray-500 font-medium">{w.ko}</span>
            <span className="text-xs text-gray-300 mt-1">🔊 눌러봐요</span>
          </button>
        ))}
      </div>
    </div>
  );
}
