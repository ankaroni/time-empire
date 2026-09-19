import{STONE_BUILDING_LABELS,stoneBuildingAsset,type StoneBuildingId}from"../sceneAssets";

export default function SettlementBuilding({type,level}:{type:StoneBuildingId;level:number}){
  if(level<1)return null;
  const{src,visualLevel}=stoneBuildingAsset(type,level);
  return <div className={"sceneAsset sceneAssetImageWrap "+type+" visualLv"+visualLevel}>
    <img className="sceneAssetImage" src={src} alt="" draggable={false}/>
    <span className="assetLabel">{STONE_BUILDING_LABELS[type]}<b>Sv. {level}</b><em>Görsel Aşama {visualLevel}/5</em></span>
  </div>;
}
