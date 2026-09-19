import{useEffect,useState}from"react";import{STONE_BUILDING_LABELS,stoneBuildingAsset,type StoneBuildingId}from"../sceneAssets";

const FALLBACK:Record<StoneBuildingId,string>={hut:"⛺",farm:"🌾",lumber:"🪵",gatherer:"🌿",mine:"🪨",workshop:"🔥"};

export default function SettlementBuilding({type,level}:{type:StoneBuildingId;level:number}){
  const[failed,setFailed]=useState(false);
  const[dropKey,setDropKey]=useState(level);
  useEffect(()=>{setFailed(false);setDropKey(level)},[level,type]);
  if(level<1)return null;
  const{src,visualLevel}=stoneBuildingAsset(type,level);
  return <div key={dropKey} className={"sceneAsset sceneAssetImageWrap "+type+" visualLv"+visualLevel+(failed?" assetMissing":"")+" assetDrop"}>
    {!failed&&<img className="sceneAssetImage" src={src} alt={STONE_BUILDING_LABELS[type]} draggable={false} onError={()=>setFailed(true)}/>}
    {failed&&<span className="assetFallback" aria-hidden="true">{FALLBACK[type]}</span>}
    <span className="assetLabel">{STONE_BUILDING_LABELS[type]}<b>Sv. {level}</b></span>
  </div>;
}