function updateprice(response){
  console.log('hii');
  document.getElementById('btcvalueinr').innerHTML = response.btcvalue.price_inr;
  document.getElementById('btcvalueusd').innerHTML = response.btcvalue.price_usd;
  if(response.btcvalue.percent_change_1h > 0){
    if(document.getElementById('btc1hchangered') != null){    document.getElementById('btc1hchangered').style.visibility = 'hidden';}
    document.getElementById('btc1hchangegreen').innerHTML = '+' + response.btcvalue.percent_change_1h + ' %';
  }else{
    if(document.getElementById('btc1hchangegreen') != null){    document.getElementById('btc1hchangegreen').style.visibility = 'hidden';}
    document.getElementById('btc1hchangered').innerHTML = response.btcvalue.percent_change_1h + ' %';
  }
  if(response.btcvalue.percent_change_24h > 0){
    if(document.getElementById('btc24hchangered') != null){    document.getElementById('btc24hchangered').style.visibility = 'hidden';}
    document.getElementById('btc24hchangegreen').innerHTML = '+' + response.btcvalue.percent_change_24h + ' %';
  }else{
    if(document.getElementById('btc24hchangegreen') != null){    document.getElementById('btc24hchangegreen').style.visibility = 'hidden';}
    document.getElementById('btc24hchangered').innerHTML = response.btcvalue.percent_change_24h + ' %';
  }
  document.getElementById('btcavail').innerHTML = response.btcvalue.available_supply;
  document.getElementById('btctotal').innerHTML = response.btcvalue.total_supply;
  document.getElementById('btcmax').innerHTML = response.btcvalue.max_supply;
  document.getElementById('btccap').innerHTML = response.btcvalue.market_cap_inr;
  document.getElementById('btcday').innerHTML = response.onedayBtc;
  document.getElementById('btctime').innerHTML = response.btcTimeStamp;



// Ethereum
  document.getElementById('ethvalueinr').innerHTML = response.ethvalue.price_inr;
  document.getElementById('ethvalueusd').innerHTML = response.ethvalue.price_usd;
  if(response.ethvalue.percent_change_1h > 0){
    if(document.getElementById('eth1hchangered') != null){    document.getElementById('btc1hchangered').style.visibility = 'hidden';}
    document.getElementById('eth1hchangegreen').innerHTML = '+' + response.ethvalue.percent_change_1h + ' %';
  }else{
    if(document.getElementById('eth1hchangegreen') != null){    document.getElementById('btc1hchangegreen').style.visibility = 'hidden';}
    document.getElementById('eth1hchangered').innerHTML = response.ethvalue.percent_change_1h + ' %';
  }
  if(response.ethvalue.percent_change_24h > 0){
    if(document.getElementById('eth24hchangered') != null){    document.getElementById('btc24hchangered').style.visibility = 'hidden';}
    document.getElementById('eth24hchangegreen').innerHTML = '+' + response.ethvalue.percent_change_24h + ' %';
  }else{
    if(document.getElementById('eth24hchangegreen') != null){    document.getElementById('btc24hchangegreen').style.visibility = 'hidden';}
    document.getElementById('eth24hchangered').innerHTML = response.ethvalue.percent_change_24h + ' %';
  }
  document.getElementById('ethavail').innerHTML = response.ethvalue.available_supply;
  document.getElementById('ethtotal').innerHTML = response.ethvalue.total_supply;
  document.getElementById('ethmax').innerHTML = response.ethvalue.market_cap_inr;
  document.getElementById('ethday').innerHTML = response.onedayEth;
  document.getElementById('ethtime').innerHTML = response.ethTimeStamp;




//Ripple

document.getElementById('xrpvalueinr').innerHTML = response.xrpvalue.price_inr;
document.getElementById('xrpvalueusd').innerHTML = response.xrpvalue.price_usd;
if(response.xrpvalue.percent_change_1h > 0){
  if(document.getElementById('xrp1hchangered') != null){    document.getElementById('btc1hchangered').style.visibility = 'hidden';}
  document.getElementById('xrp1hchangegreen').innerHTML = '+' + response.xrpvalue.percent_change_1h + ' %';
}else{
  if(document.getElementById('xrp1hchangegreen') != null){    document.getElementById('btc1hchangegreen').style.visibility = 'hidden';}
  document.getElementById('xrp1hchangered').innerHTML = response.xrpvalue.percent_change_1h + ' %';
}
if(response.xrpvalue.percent_change_24h > 0){
  if(document.getElementById('xrp24hchangered') != null){    document.getElementById('btc24hchangered').style.visibility = 'hidden';}
  document.getElementById('xrp24hchangegreen').innerHTML = '+' + xrpvalue.percent_change_24h + ' %';
}else{
  if(document.getElementById('xrp24hchangegreen') != null){    document.getElementById('btc24hchangegreen').style.visibility = 'hidden';}
  document.getElementById('xrp24hchangered').innerHTML = response.xrpvalue.percent_change_24h + ' %';
}
document.getElementById('xrpavail').innerHTML = response.xrpvalue.available_supply;
document.getElementById('xrptotal').innerHTML = response.xrpvalue.total_supply;
document.getElementById('xrpmax').innerHTML = response.xrpvalue.max_supply;
document.getElementById('xrpcap').innerHTML = response.xrpvalue.market_cap_inr;
document.getElementById('xrpday').innerHTML = response.onedayXrp;
document.getElementById('xrptime').innerHTML = response.xrpTimeStamp;



//btcx

if(response.btcxvalue.ask != null){
  document.getElementById('btcxvalueinr').innerHTML = response.btcxvalue.ask;

}
if(response.btcxvalue.last_traded_price != null){
  document.getElementById('btcxtrade').innerHTML = response.btcxvalue.last_traded_price;

}
if(response.btcxvalue.total_volume_24h !=null){
  document.getElementById('btcxvol').innerHTML = response.btcxvalue.total_volume_24h;

}

}
