function ConversionPart2() {

    var SignedDecimalInt = document.getElementById("2_SignedInt").value;
    var value = Math.abs(parseInt(document.getElementById("2_SignedInt").value));

    var outputValue = "";
    while (value != 0)
    {
      outputValue = value % 2 + outputValue;
      value = Math.trunc(value / 2);
    }
    while (outputValue.length<32){
      outputValue = "0"+ outputValue;
    }

    var outputValueTwosComplement = "";

    for (var i =0; i< outputValue.length; i++){
      if (outputValue.charAt(i)==0){
        outputValueTwosComplement += 1;
      }
      else {
        outputValueTwosComplement += 0;
      }
    }

    for (var i = outputValueTwosComplement.length -1; i>=0 ; i--){
      if (outputValueTwosComplement.charAt(i)=="0"){
        outputValueTwosComplement= outputValueTwosComplement.substring(0, i)+"1"+outputValueTwosComplement.substring(i+1);
        i = -10;
      }
      else{
        outputValueTwosComplement= outputValueTwosComplement.substring(0, i)+"0"+outputValueTwosComplement.substring(i+1);
       }
    }

    {
    var UnsignedInt = outputValue;
    var UnsignedIntBaseFrom = 2;
    var UnsignedIntBaseTo = 16;

    var value = 0;
    while (UnsignedInt != "") {
      value = value * UnsignedIntBaseFrom + parseChar(UnsignedInt.charAt(0));
      UnsignedInt = UnsignedInt.substring(1, UnsignedInt.length);
    }

    var medValue = "";

    while (value != 0) {
      medValue = assignChar(value % UnsignedIntBaseTo) + medValue;
      value = Math.trunc(value / UnsignedIntBaseTo);
    }

    outputValue =medValue;
    while (outputValue.length<8){
      outputValue = "0" + outputValue;
    }
  }

    {
  var UnsignedInt = outputValueTwosComplement;
  var UnsignedIntBaseFrom = 2;
  var UnsignedIntBaseTo = 16;

  var value = 0;
  while (UnsignedInt != "") {
    value = value * UnsignedIntBaseFrom + parseChar(UnsignedInt.charAt(0));
    UnsignedInt = UnsignedInt.substring(1, UnsignedInt.length);
  }

  var medValue = "";

  while (value != 0) {
    medValue = assignChar(value % UnsignedIntBaseTo) + medValue;
    value = Math.trunc(value / UnsignedIntBaseTo);
  }

  outputValueTwosComplement =medValue;
}

    if (SignedDecimalInt.charAt(0)=="-"){
      FormatAndShowOutput([outputValueTwosComplement, outputValue, SignedDecimalInt], 2);

    }
    else{
      FormatAndShowOutput([outputValue, outputValueTwosComplement, SignedDecimalInt], 2);

    }
}
