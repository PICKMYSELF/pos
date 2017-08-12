'use strict';

class PosPrinter {
  constructor(tags,Promotion,Item) {
    this.tags = tags;
    this.promotions = Promotion.all()[0].barcodes;//Promotion.all().barcodes;
    this.allItems=Item.all();//Item.all();
    this.Count=[];
    this.beforeSummary = {};
  }

  countForGoods() {

    this.Count[0] = {};
    if (this.tags[0].length == 12) {
      this.Count[0].name = this.tags[0].substr(0, 10);
      this.Count[0].summary = parseInt(this.tags[0].charAt(11));
    } else if (this.tags[0].length == 14) {
      this.Count[0].name = this.tags[0].substr(0, 10);
      this.Count[0].summary = parseFloat(this.tags[0].substr(11, 3));
    } else {
      this.Count[0].name = this.tags[0];
      this.Count[0].summary = 1;
    }

    let length = 1;

    for (let i = 1; i <this. tags.length; i++) {
     let tempChar = this.tags[i].substr(0, 10);
     let tempCount = 1;
      if (this.tags[i].length == 12) {
        tempCount = parseInt(this.tags[i].charAt(11));
      }
      if (this.tags[i].length == 14) {
        tempCount = parseFloat(this.tags[i].substr(11, 3));
      }
      for (let j = 0; j < this.Count.length; j++) {

        if (tempChar == this.Count[j].name) {
          this.Count[j].summary += tempCount;
          break;
        }
        if (j == length - 1 && this.Count[j].name != tempChar) {
          this.Count[length] = {};
          this.Count[length].name = tempChar;
          this.Count[length].summary = 0;//
          this.Count[length].summary += tempCount;
          length++;
          break;
        }
      }

    }
  }

  forSale() {
    for (let countElement of this.Count) {
      for (let promotionElement of this.promotions) {
        if (countElement.name === promotionElement) {
          /* saveNum+=parseInt(arr[i].summary/2);*/
          countElement.summaryForSale = countElement.summary - parseInt(countElement.summary / 3);//js除法会变小数因为只有var一种数据类型
        }
      }
    }
    this.beforeSummary.afterArrSale = this.Count;
    /* beforeSummary.save =saveNum;*/
  }
  forSummary() {
    this.sumCarts=0;
   this.saveNum=0;
    for(let i=0;i<this.beforeSummary.afterArrSale.length;i++){
      for(let j=0;j<this.allItems.length;j++){
        if(this.beforeSummary.afterArrSale[i].name===this.allItems[j].barcode){
          this.beforeSummary.afterArrSale[i].unit=this.allItems[j].unit;
          this.beforeSummary.afterArrSale[i].cName=this.allItems[j].name;
          this.beforeSummary.afterArrSale[i].unitPrice=this.allItems[j].price;//赋值.00会有精度丢失，显示时直接toFixed（2）即可
          if("summaryForSale" in this.beforeSummary.afterArrSale[i]){
            this.beforeSummary.afterArrSale[i].unitSumPrice=this.beforeSummary.afterArrSale[i].unitPrice*this.beforeSummary.afterArrSale[i].summaryForSale;
            this.saveNum+=this.beforeSummary.afterArrSale[i].unitPrice*this.beforeSummary.afterArrSale[i].summary-this.beforeSummary.afterArrSale[i].unitPrice*this.beforeSummary.afterArrSale[i].summaryForSale;
          }
          else {
            this.beforeSummary.afterArrSale[i].unitSumPrice=this.beforeSummary.afterArrSale[i].unitPrice*this.beforeSummary.afterArrSale[i].summary;
          }
          this.sumCarts+=this.beforeSummary.afterArrSale[i].unitSumPrice;
        }
      }
    }
    this.beforeSummary.totalReceipt=this.sumCarts;
    this.beforeSummary.save=this.saveNum;

  }
  dateDigitToString(num) {
    if (num < 10)
      return `0${num}`;
    return `${num}`;
  }
  printReceipt(){
    let currentDate = new Date(),
      year = this.dateDigitToString(currentDate.getFullYear()),
      month = this.dateDigitToString(currentDate.getMonth() + 1),
      date = this.dateDigitToString(currentDate.getDate()),
      hour = this.dateDigitToString(currentDate.getHours()),
      minute = this.dateDigitToString(currentDate.getMinutes()),
      second = this.dateDigitToString(currentDate.getSeconds()),
      formattedDateString = `${year}年${month}月${date}日 ${hour}:${minute}:${second}`;
    let receipt= this.beforeSummary;
    let itemReceipt='';
    for (let i=0;i<receipt.afterArrSale.length;i++){
      itemReceipt+='名称：'+receipt.afterArrSale[i].cName+'，数量：'+receipt.afterArrSale[i].summary+receipt.afterArrSale[i].unit+'，单价：'+parseFloat(receipt.afterArrSale[i].unitPrice).toFixed(2)+'(元)，小计：'+parseFloat(receipt.afterArrSale[i].unitSumPrice).toFixed(2)+'(元)'+'\n';
    }
    let receiptString= '***<没钱赚商店>收据***'+'\n'+`打印时间：${formattedDateString}\n`+'----------------------\n'+itemReceipt+'----------------------\n总计：'+parseFloat(receipt.totalReceipt).toFixed(2)+'(元)\n节省：'+parseFloat(receipt.save).toFixed(2)+'(元)\n**********************';
    console.log(receiptString);
  }

  printPos(){
    this.countForGoods();
    this.forSale();
    this.forSummary();
    this.printReceipt();
  }

}
/*var forPrintReceipt=function(inputs){
  var  Cart1=new posPrinter(inputs,Promotion,Item);
  Cart1.printPos();
}*/


/*let tags3 = [
  'ITEM000000',
  'ITEM000000',
  'ITEM000000',
  'ITEM000001',
  'ITEM000001',
  'ITEM000001',
  'ITEM000001',
  'ITEM000001',
  'ITEM000005',
  'ITEM000005-2',
];*/
/*let  Cart1=new posPrinter(tags3,Promotion,Item);
Cart1.printPos();*/







