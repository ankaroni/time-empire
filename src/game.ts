export type BuildingId="hut"|"farm"|"mine"|"workshop"; export type Resource="food"|"stone"|"knowledge";
export type GameState={food:number;stone:number;knowledge:number;shards:number;buildings:Record<BuildingId,number>;upgrades:string[];lastTick:number;startedAt:number;clicks:number;combo:number;comboAt:number;frenzyUntil:number;fireLevel:number};
export const BUILDINGS=[
{id:"hut" as BuildingId,name:"Toplayıcı Kampı",icon:"⛺",desc:"Yiyecek toplar.",base:80,rate:1.2,resource:"food" as Resource,unlock:0},
{id:"farm" as BuildingId,name:"Yabani Tarla",icon:"🌾",desc:"Düzenli yiyecek üretir.",base:450,rate:5,resource:"food" as Resource,unlock:2},
{id:"mine" as BuildingId,name:"Taş Ocağı",icon:"⛏️",desc:"Taş çıkarır.",base:1600,rate:1.1,resource:"stone" as Resource,unlock:5},
{id:"workshop" as BuildingId,name:"İlkel Atölye",icon:"⚒️",desc:"Taş ve yiyeceği bilgiye dönüştürür.",base:6500,rate:.45,resource:"knowledge" as Resource,unlock:9},
] as const;
export const UPGRADES=[{id:"tools",name:"Keskin Taş Aletler",icon:"🪨",desc:"Bütün üretim +%25",cost:120},{id:"hands",name:"Usta Eller",icon:"✋",desc:"Ateş tıklaması ×2",cost:350},{id:"embers",name:"Kor Ateş",icon:"🔥",desc:"Combo etkisi ×2",cost:900}] as const;
export const initial=():GameState=>({food:25,stone:0,knowledge:0,shards:0,buildings:{hut:0,farm:0,mine:0,workshop:0},upgrades:[],lastTick:Date.now(),startedAt:Date.now(),clicks:0,combo:0,comboAt:0,frenzyUntil:0,fireLevel:1});
export const totalBuildings=(s:GameState)=>Object.values(s.buildings).reduce((a,b)=>a+b,0);
export const cost=(b:(typeof BUILDINGS)[number],n:number)=>Math.floor(b.base*Math.pow(1.22,n));
export const fireCost=(s:GameState)=>({food:Math.floor(180*Math.pow(2.05,s.fireLevel-1)),stone:Math.floor(12*Math.pow(1.85,Math.max(0,s.fireLevel-2)))});
export const mult=(s:GameState)=>1+s.shards*.1+(s.upgrades.includes("tools")?.25:0)+(s.fireLevel-1)*.08;
export const resourceRates=(s:GameState)=>{const m=mult(s)*(Date.now()<s.frenzyUntil?2:1);const food=(s.buildings.hut*1.2+s.buildings.farm*5)*m;const stone=s.buildings.mine*1.1*m;const workshop=s.buildings.workshop*.45*m;const possible=Math.min(workshop,s.food/8,s.stone/2);return{food:food-possible*8,stone:stone-possible*2,knowledge:possible,rawFood:food,rawStone:stone,conversion:possible}};
export const clickPower=(s:GameState)=>Math.max(1,Math.floor((1+s.fireLevel*1.4)*(s.upgrades.includes("hands")?2:1)*(1+s.shards*.1)));
export const load=():GameState=>{try{const raw=localStorage.getItem("time-empire-save");if(!raw)return initial();const s={...initial(),...JSON.parse(raw)};const sec=Math.min(Math.max(0,(Date.now()-s.lastTick)/1000),8*3600),r=resourceRates(s);s.food=Math.max(0,s.food+r.food*sec);s.stone=Math.max(0,s.stone+r.stone*sec);s.knowledge+=r.knowledge*sec;s.lastTick=Date.now();return s}catch{return initial()}};
export const save=(s:GameState)=>localStorage.setItem("time-empire-save",JSON.stringify({...s,lastTick:Date.now()}));