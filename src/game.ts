export type BuildingId="hut"|"farm"|"mine"|"workshop";
export type GameState={food:number;wood:number;stone:number;knowledge:number;shards:number;buildings:Record<BuildingId,number>;upgrades:string[];age:number;lastTick:number;startedAt:number;};
export const BUILDINGS=[
{id:"hut" as BuildingId,name:"Toplayıcı Kulübesi",icon:"⛺",desc:"Yiyecek toplar.",base:15,resource:"food",rate:1},
{id:"farm" as BuildingId,name:"İlkel Çiftlik",icon:"🌾",desc:"Düzenli yiyecek üretir.",base:80,resource:"food",rate:5},
{id:"mine" as BuildingId,name:"Taş Ocağı",icon:"⛏️",desc:"Taş çıkarır.",base:150,resource:"stone",rate:3},
{id:"workshop" as BuildingId,name:"Atölye",icon:"⚒️",desc:"Bilgi üretir.",base:500,resource:"knowledge",rate:1},
] as const;
export const initial=():GameState=>({food:25,wood:0,stone:0,knowledge:0,shards:0,buildings:{hut:0,farm:0,mine:0,workshop:0},upgrades:[],age:0,lastTick:Date.now(),startedAt:Date.now()});
export const cost=(b:(typeof BUILDINGS)[number],n:number)=>Math.floor(b.base*Math.pow(1.16,n));
export const multiplier=(s:GameState)=>1+s.shards*.1+(s.upgrades.includes("tools")?.5:0);
export const rates=(s:GameState)=>{let r={food:0,wood:0,stone:0,knowledge:0};for(const b of BUILDINGS)(r as any)[b.resource]+=s.buildings[b.id]*b.rate*multiplier(s);return r};
export const load=():GameState=>{try{const raw=localStorage.getItem("time-empire-save");if(!raw)return initial();const s=JSON.parse(raw) as GameState;const now=Date.now(),sec=Math.min((now-s.lastTick)/1000,8*3600),r=rates(s);s.food+=r.food*sec;s.wood+=r.wood*sec;s.stone+=r.stone*sec;s.knowledge+=r.knowledge*sec;s.lastTick=now;return s}catch{return initial()}};
export const save=(s:GameState)=>localStorage.setItem("time-empire-save",JSON.stringify({...s,lastTick:Date.now()}));