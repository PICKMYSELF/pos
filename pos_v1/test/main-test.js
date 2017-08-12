'use strict';

describe('pos', () => {

  it('should print text', () => {

    let tags1 = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2.5',
      'ITEM000005',
      'ITEM000005-2',
    ];

    spyOn(console, 'log');

    printReceipt(tags1);

    const expectText = `***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：2.5斤，单价：15.00(元)，小计：37.50(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：58.50(元)
节省：7.50(元)
**********************`;

    expect(console.log).toHaveBeenCalledWith(expectText);
  });
  it('should print text', () => {

    let tags2 = [
      'ITEM000002-3',
      'ITEM000003-2.5',
      'ITEM000004-2',
    ];

    spyOn(console, 'log');

    printReceipt(tags2);

    const expectText = `***<没钱赚商店>收据***
名称：苹果，数量：3斤，单价：5.50(元)，小计：16.50(元)
名称：荔枝，数量：2.5斤，单价：15.00(元)，小计：37.50(元)
名称：电池，数量：2个，单价：2.00(元)，小计：4.00(元)
----------------------
总计：58.00(元)
节省：0.00(元)
**********************`;

    expect(console.log).toHaveBeenCalledWith(expectText);
  });
  it('should print text', () => {

    let tags3 = [
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
    ];

    spyOn(console, 'log');

    printReceipt(tags3);

    const expectText = `***<没钱赚商店>收据***
名称：可口可乐，数量：3瓶，单价：3.00(元)，小计：6.00(元)
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：27.00(元)
节省：10.50(元)
**********************`;
    expect(console.log).toHaveBeenCalledWith(expectText);
});});
