export type ResourceId="food"|"wood"|"stone"|"fiber"|"knowledge";
export type ItemId="rope"|"timber"|"cutStone"|"stoneAxe"|"huntingKit"|"settlementCore";
export const RESOURCES={food:{name:"Yiyecek",icon:"🍖"},wood:{name:"Odun",icon:"🪵"},stone:{name:"Taş",icon:"🪨"},fiber:{name:"Lif",icon:"🌿"},knowledge:{name:"Bilgi",icon:"🧠"}} as const;
export const ITEMS={rope:{name:"Halat",icon:"🪢"},timber:{name:"İşlenmiş Kereste",icon:"🪵"},cutStone:{name:"Yontulmuş Taş",icon:"🧱"},stoneAxe:{name:"Taş Balta",icon:"🪓"},huntingKit:{name:"Av Takımı",icon:"🏹"},settlementCore:{name:"Yerleşim Anıtı",icon:"🗿"}} as const;
export const RECIPES=[
{id:"rope",out:"rope" as ItemId,qty:1,name:"Halat Ör",requires:{fiber:12},unlockKnowledge:20},
{id:"timber",out:"timber" as ItemId,qty:1,name:"Kereste İşle",requires:{wood:18,stone:3},unlockKnowledge:45},
{id:"cutStone",out:"cutStone" as ItemId,qty:1,name:"Taş Yont",requires:{stone:22,food:8},unlockKnowledge:80},
{id:"stoneAxe",out:"stoneAxe" as ItemId,qty:1,name:"Taş Balta Yap",requires:{timber:2,cutStone:2,rope:1},unlockKnowledge:140},
{id:"huntingKit",out:"huntingKit" as ItemId,qty:1,name:"Av Takımı Yap",requires:{timber:3,rope:3,cutStone:1},unlockKnowledge:240},
{id:"settlementCore",out:"settlementCore" as ItemId,qty:1,name:"Yerleşim Anıtı İnşa Et",requires:{timber:10,cutStone:12,rope:8,stoneAxe:2,huntingKit:1},unlockKnowledge:600},
] as const;
export const AGE_REQUIREMENTS={knowledge:1800,population:18,fireLevel:5,items:{settlementCore:1,stoneAxe:3,huntingKit:2,cutStone:20}} as const;