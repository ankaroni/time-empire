export type BuildingId="hut"|"farm"|"mine"|"workshop";
export type GameState={food:number;stone:number;knowledge:number;shards:number;buildings:Record<BuildingId,number>;upgrades:string[];lastTick:number;startedAt:number;clicks:number;combo:number;comboAt:number;frenzyUntil:number};
export const BUILDINGS=[
{id:"hut" as BuildingId,name:"Toplayıcı Kampı",icon:"⛺",desc:"Avcılar ve toplayıcılar ateşi besler.",base:15,rate:1,unlock:0},
{id:"farm" as BuildingId,name:"Yabani Tarla",icon:"🌾",desc:"İlk düzenli yiyecek kaynağın.",base:85,rate:5,unlock:1},
{id:"mine" as BuildingId,name:"Taş Ocağı",icon:"⛏️",desc:"Taş ve cevher bilgisi üretime dönüşür.",base:260,rate:14,unlock:3},
{id:"workshop" as BuildingId,name:"İlkel Atölye",icon:"⚒️",desc:"Ustalar yeni fikirler geliştirir.",base:900,rate:38,unlock:6},
] as const;
export const UPGRADES=[
{id:"tools",name:"Keskin Taş Aletler",icon:"🪨",desc:"Tüm pasif üretim +%50",cost:50},
{id:"hands",name:"Usta Eller",icon:"✋",desc:"Tıklama gücü ×2",cost:125},
{id:"embers",name:"Kor Ateş",icon:"🔥",desc:"Combo bonusu iki kat etkili",cost:300},
] as const;
export const initial=():GameState=>({food:25,stone:0,knowledge:0,shards:0,buildings:{hut:0,farm:0,mine:0,workshop:0},upgrades:[],lastTick:Date.now(),startedAt:Date.now(),clicks:0,combo:0,comboAt:0,frenzyUntil:0});
export const cost=(b:(typeof BUILDINGS)[number],n:number)=>Math.floor(b.base*Math.pow(1.155,n));
export const baseMultiplier=(s:GameState)=>1+s.shards*.12+(s.upgrades.includes("tools")?.5:0);
export const production=(s:GameState)=>BUILDINGS.reduce((a,b)=>a+s.buildings[b.id]*b.rate,0)*baseMultiplier(s)*(Date.now()<s.frenzyUntil?3:1);
export const clickPower=(s:GameState)=>Math.max(1,1+Math.floor(production(s)*.08))*(s.upgrades.includes("hands")?2:1);
export const totalBuildings=(s:GameState)=>Object.values(s.buildings).reduce((a,b)=>a+b,0);
export const knowledgeRate=(s:GameState)=>s.buildings.workshop*.7*baseMultiplier(s);
export const stoneRate=(s:GameState)=>s.buildings.mine*.45*baseMultiplier(s);
export const load=():GameState=>{try{const raw=localStorage.getItem("time-empire-save");if(!raw)return initial();const old=JSON.parse(raw);const s={...initial(),...old};const sec=Math.min(Math.max(0,(Date.now()-s.lastTick)/1000),8*3600);s.food+=production(s)*sec;s.stone+=stoneRate(s)*sec;s.knowledge+=knowledgeRate(s)*sec;s.lastTick=Date.now();return s}catch{return initial()}};
export const save=(s:GameState)=>localStorage.setItem("time-empire-save",JSON.stringify({...s,lastTick:Date.now()}));
