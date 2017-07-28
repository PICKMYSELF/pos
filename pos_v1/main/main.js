'use strict';
var tags=[];
var countForGoods=function (collection) {
  var Count=[];
  Count[0]={};
  Count[0].name=collection[0];
  Count[0].summary=1;
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
  var promotions=loadPromotions().barcodes;
  var saveNum=0;
  var beforeSummary={};

  for(let i=0;i<arr.length;i++){
    for(let j=0;j<promotions.length;j++){
      if( arr[i].name ===promotions[j]) {
        saveNum+=parseInt(arr[i].summary/2);
        arr[i].summaryForSale=arr[i].summary-parseInt(arr[i].summary/2);//js除法会变小数因为只有var一种数据类型
      }
    }
  }
   beforeSummary.afterArrSale=arr;
  beforeSummary.save =saveNum;
  return beforeSummary;

}




var forSummary=function (object) {
  var allItems=loadAllItems();
  var sumCarts=0;
  for(let i=0;i<object.afterArrSale.length;i++){
    for(let j=0;j<allItems.length;j++){
      if(object.afterArrSale[i].name===allItems[j].name){
        object.afterArrSale[i].unit=allItems[j].unit;
        object.afterArrSale[i].unitPrice=allItems[j].price;
        if("summaryForSale" in object.afterArrSale[i]){object.afterArrSale[i].unitSumPrice=object.afterArrSale[i].unitPrice*object.afterArrSale[i].summaryForSale;}
        else {object.afterArrSale[i].unitSumPrice=object.afterArrSale[i].unitPrice*object.afterArrSale[i].summary;}
      sumCarts+=object.afterArrSale[i].unitSumPrice;
      }
    }
  }
   object.totalReceipt=sumCarts;
  return object;
}




var printReceipt= function (){
 var receipt= forSummary(forSale(countForGoods(tags)));
 var itemReceipt='';
 for (let i=0;i<receipt.afterArrSale.length;i++){
   itemReceipt+='名称：'+receipt.afterArrSale[i].name+'，数量：'+receipt.afterArrSale[i].summary+'瓶，单价：'+receipt.afterArrSale[i].unitPrice+'(元)，小计：'+receipt.afterArrSale[i].unitSumPrice+'(元)'+'\n';
 }
var receiptString= '***<没钱赚商店>收据***'+'\n'+itemReceipt+'----------------------\n总计：'+receipt.totalReceipt+'(元)\n节省：'+receipt.save+'(元)\n**********************'
console.log(receiptString);
}

