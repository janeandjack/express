export const calculateFee = (goodWeight, goodType, goodLength, goodWidth, goodHeight, expressOptions) =>{
    let goodSize_Weight = Math.round((goodLength * goodWidth * goodHeight)/5000);
    let realGoodWeight = goodSize_Weight > goodWeight ? goodSize_Weight :goodWeight;
    if(realGoodWeight <= 21){
        let goodTypeFactor = 0;
        if(goodType==0){
            goodTypeFactor = 1;
        }
        else if(goodType==1){
            goodTypeFactor = 1.2;
        }
        else if(goodType==2){
            goodTypeFactor = 1.3;
        }
        else if(goodType==3){
            goodTypeFactor = 1.4;
        }
        else if(goodType==4){
            goodTypeFactor = 1.5;
        }
        else{
            goodTypeFactor = 1;
        }
        let firstAmount = 120*goodTypeFactor;
        let secondAmount = realGoodWeight > 0.5 ? (realGoodWeight-0.5)*2*20*goodTypeFactor : 0;
        let totalAmount = firstAmount + secondAmount;
        let nextAmount = 20*goodTypeFactor;
        return expressOptions.map(object=>{
            return{
                label: object.label,
                realWeight: realGoodWeight,
                firstAmount: firstAmount,
                secondAmount: nextAmount,
                totalAmount: totalAmount,
                deliveryTime: object.time,
                note: object.note,
                icon: object.icon,
            }
        });
    }
     else if(realGoodWeight > 21){
        let goodTypeFactor = 0;
        if(goodType==0){
            goodTypeFactor = 1;
        }
        else if(goodType==1){
            goodTypeFactor = 1.2;
        }
        else if(goodType==2){
            goodTypeFactor = 1.3;
        }
        else if(goodType==3){
            goodTypeFactor = 1.4;
        }
        else if(goodType==4){
            goodTypeFactor = 1.5;
        }
        else{
            goodTypeFactor = 1;
        }
        let firstAmount = 20*goodTypeFactor;
        let secondAmount = (realGoodWeight-0.5)*2*20*goodTypeFactor;
        let totalAmount = firstAmount + secondAmount;
        let nextAmount = 20*goodTypeFactor;
        return expressOptions.map(object=>{
            return{
                label: object.label,
                realWeight: realGoodWeight,
                firstAmount: firstAmount,
                secondAmount: nextAmount,
                totalAmount: totalAmount,
                deliveryTime: object.time,
                note: object.note,
                icon: object.icon,
            }
        });
    }
};

export const toPercent = (point, position) =>{
    if (point==0) {
        return 0;
    }
    var str=Number(point*100).toFixed(position);
    str+="%";
    return str;
}