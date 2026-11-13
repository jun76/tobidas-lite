// この作品だけの絵。共通パーツ(theme/parts.js の A.*)に足す形で定義する。
// どれも「SVGの中身の文字列」を返す。描き方は themes/storybook/art-style.md。

// 登場人物は A.person を包んで作る(ポーズは使う側で armL/armR/mouth などを渡して変える)
A.hero = (o = {}) => A.person(Object.assign({
  top: '#d9534a', bottom: '#4a6fa5',
  hair: `<path d="M31 58Q30 26 60 26Q90 26 89 58Q82 40 60 40Q40 40 31 58Z" fill="#5a3a22"/>`,
}, o));

// 表紙 738×948(左端 38px は背の帯)。紙の縁取りは付かない
A.cover = () => `
  <defs><linearGradient id="cvg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3a6fa8"/><stop offset="1" stop-color="#1f3f66"/></linearGradient>
  <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f8e3a0"/><stop offset=".5" stop-color="#e0b23c"/><stop offset="1" stop-color="#b98a22"/></linearGradient></defs>
  <rect width="738" height="948" rx="14" fill="url(#cvg)"/><rect width="38" height="948" fill="#17304f"/>
  <rect x="64" y="34" width="640" height="880" rx="18" fill="none" stroke="url(#gold)" stroke-width="6"/>
  <g transform="translate(324 560) scale(1.4)">${A.hero({ armR: -150, mouth: 'big' })}</g>
  <text x="384" y="230" font-family='${FONT}' font-weight="900" font-size="96" text-anchor="middle" fill="url(#gold)">だいめい</text>
  <text x="384" y="84" font-family='${FONT}' font-weight="700" font-size="24" letter-spacing="10" text-anchor="middle" fill="#f8e3a0">とびだす えほん</text>`;
