function updateprice(response){
  document.getElementById('btcvalueinr').innerHTML = " " + Number(response.btcvalue.price_inr).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  document.getElementById('btcvalueusd').innerHTML = Number(response.btcvalue.price_usd).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
  document.getElementById('btcavail').innerHTML = Number(response.btcvalue.available_supply).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  document.getElementById('btctotal').innerHTML = Number(response.btcvalue.total_supply).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  document.getElementById('btcmax').innerHTML = Number(response.btcvalue.max_supply).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  document.getElementById('btccap').innerHTML = Number(response.btcvalue.market_cap_inr).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  document.getElementById('btcday').innerHTML = Number(response.onedayBtc).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  document.getElementById('btctime').innerHTML = response.btcTimeStamp;



// Ethereum
  document.getElementById('ethvalueinr').innerHTML = Number(response.ethvalue.price_inr).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  document.getElementById('ethvalueusd').innerHTML = Number(response.ethvalue.price_usd).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
  document.getElementById('ethavail').innerHTML = Number(response.ethvalue.available_supply).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  document.getElementById('ethtotal').innerHTML = Number(response.ethvalue.total_supply).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  document.getElementById('ethmax').innerHTML = Number(response.ethvalue.market_cap_inr).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  document.getElementById('ethday').innerHTML = Number(response.onedayEth).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  document.getElementById('ethtime').innerHTML = response.ethTimeStamp;




//Ripple

document.getElementById('xrpvalueinr').innerHTML = Number(response.xrpvalue.price_inr).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
document.getElementById('xrpvalueusd').innerHTML = Number(response.xrpvalue.price_usd).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
if(response.xrpvalue.percent_change_1h > 0){
  if(document.getElementById('xrp1hchangered') != null){    document.getElementById('btc1hchangered').style.visibility = 'hidden';}
  document.getElementById('xrp1hchangegreen').innerHTML = '+' + response.xrpvalue.percent_change_1h + ' %';
}else{
  if(document.getElementById('xrp1hchangegreen') != null){    document.getElementById('btc1hchangegreen').style.visibility = 'hidden';}
  document.getElementById('xrp1hchangered').innerHTML = response.xrpvalue.percent_change_1h + ' %';
}
if(response.xrpvalue.percent_change_24h > 0){
  if(document.getElementById('xrp24hchangered') != null){    document.getElementById('btc24hchangered').style.visibility = 'hidden';}
  document.getElementById('xrp24hchangegreen').innerHTML = '+' + response.xrpvalue.percent_change_24h + ' %';
}else{
  if(document.getElementById('xrp24hchangegreen') != null){    document.getElementById('btc24hchangegreen').style.visibility = 'hidden';}
  document.getElementById('xrp24hchangered').innerHTML = response.xrpvalue.percent_change_24h + ' %';
}
document.getElementById('xrpavail').innerHTML = Number(response.xrpvalue.available_supply).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
document.getElementById('xrptotal').innerHTML = Number(response.xrpvalue.total_supply).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
document.getElementById('xrpmax').innerHTML = Number(response.xrpvalue.max_supply).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
document.getElementById('xrpcap').innerHTML = Number(response.xrpvalue.market_cap_inr).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
document.getElementById('xrpday').innerHTML = Number(response.onedayXrp).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
document.getElementById('xrptime').innerHTML = response.xrpTimeStamp;



//btcx

if(response.btcxvalue != null){
  console.log(response);
  if(response.btcxvalue.ask != null){
    if(document.getElementById('loader') != null){
      document.getElementById('loader').classList.remove("help");
    }
    document.getElementById('btcxvalueinr').innerHTML = Number(response.btcxvalue.market).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  }
  if(response.btcxvalue.last_traded_price != null){
    document.getElementById('btcxtrade').innerHTML = Number(response.btcxvalue.sell).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  }
  if(response.btcxvalue.total_volume_24h !=null){
    document.getElementById('btcxvol').innerHTML = Number(response.btcxvalue.volume).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  }
}



}
