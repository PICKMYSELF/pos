'use strict';

var printReceipt= function (s){
  var receipt= forSummary(forSale(countForFoods(s)));
  var itemReceipt='';
  for (let i=0;i<receipt.afterArrSale.length;i++){
    itemReceipt+='名称：'+receipt.afterArrSale[i].cName+'，数量：'+receipt.afterArrSale[i].summary+receipt.afterArrSale[i].unit+'，单价：'+parseFloat(receipt.afterArrSale[i].unitPrice).toFixed(2)+'(元)，小计：'+parseFloat(receipt.afterArrSale[i].unitSumPrice).toFixed(2)+'(元)'+'\n';
  }
  var receiptString= '***<没钱赚商店>收据***'+'\n'+itemReceipt+'----------------------\n总计：'+parseFloat(receipt.totalReceipt).toFixed(2)+'(元)\n节省：'+parseFloat(receipt.save).toFixed(2)+'(元)\n**********************'
  console.log(receiptString);
}

var countForFoods=function (collection) {
  var Count=[];
  Count[0]={};
  if (collection[0].length==12){
    Count[0].name=collection[0].substr(0,10);
    Count[0].summary=parseInt(collection[0].charAt(11));
  }else if (collection[0].length==14){
    Count[0].name=collection[0].substr(0,10);
    Count[0].summary=parseFloat(collection[0].substr(11,3));
  }else{
    Count[0].name=collection[0];
    Count[0].summary=1;}

  var length=1;

  for(let i=1;i<collection.length;i++){
    var tempChar=collection[i].substr(0,10);
    var tempCount=1;
    if (collection[i].length==12){
      tempCount=parseInt(collection[i].charAt(11));
    }
    if(collection[i].length==14){
      tempCount=parseFloat(collection[i].substr(11,3));
    }
    for(var j=0;j<Count.length;j++){

      if(tempChar==Count[j].name){
        Count[j].summary+=tempCount;
        break;
      }
      if(j==length-1&&Count[j].name!=tempChar){
        Count[length]={};
        Count[length].name=tempChar;
        Count[length].summary=0;//
        Count[length].summary+=tempCount;
        length++;
        break;
      }
    }

  }
  return Count;
}




var forSale=function (arr){
  var promotions=loadPromotions()[0].barcodes;
  /*var saveNum=0;*/
  var beforeSummary={};

  for(let i=0;i<arr.length;i++){
    for(let j=0;j<promotions.length;j++){
      if( arr[i].name ===promotions[j]) {
       /* saveNum+=parseInt(arr[i].summary/2);*/
        arr[i].summaryForSale=arr[i].summary-parseInt(arr[i].summary/3);//js除法会变小数因为只有var一种数据类型
      }
    }
  }
   beforeSummary.afterArrSale=arr;
 /* beforeSummary.save =saveNum;*/
  return beforeSummary;

}




var forSummary=function (object) {
  var allItems=loadAllItems();
  var sumCarts=0;
  var saveNum=0
  for(let i=0;i<object.afterArrSale.length;i++){
    for(let j=0;j<allItems.length;j++){
      if(object.afterArrSale[i].name===allItems[j].barcode){
        object.afterArrSale[i].unit=allItems[j].unit;
        object.afterArrSale[i].cName=allItems[j].name;
        object.afterArrSale[i].unitPrice=allItems[j].price;//赋值.00会有精度丢失，显示时直接toFixed（2）即可
        if("summaryForSale" in object.afterArrSale[i]){
          object.afterArrSale[i].unitSumPrice=object.afterArrSale[i].unitPrice*object.afterArrSale[i].summaryForSale;
          saveNum+=object.afterArrSale[i].unitPrice*object.afterArrSale[i].summary-object.afterArrSale[i].unitPrice*object.afterArrSale[i].summaryForSale;
        }
        else {
          object.afterArrSale[i].unitSumPrice=object.afterArrSale[i].unitPrice*object.afterArrSale[i].summary;
        }
      sumCarts+=object.afterArrSale[i].unitSumPrice;
      }
    }
  }
   object.totalReceipt=sumCarts;
   object.save=saveNum;
  return object;
}






