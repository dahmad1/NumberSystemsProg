
function ConversionPart3() {
  var floatToConvert = parseFloat(document.getElementById("3_Float").value);
  var negative = floatToConvert<0;
  var leftHalf = Math.abs(Math.trunc(floatToConvert));
  var rightHalf = Math.abs(floatToConvert % 1);
  var mantessa;
  var negativeExp = false;

  var leftDec = "";
  while (leftHalf != 0) {
    leftDec = assignChar(leftHalf % 2) + leftDec;
    leftHalf = Math.trunc(leftHalf / 2);
  }

  var rightDec = "";
  while (rightHalf!=0){
    rightHalf= rightHalf*2;
    rightDec += Math.trunc(rightHalf);
    rightHalf = rightHalf % 1;
  }

  if (leftDec!=0){
    var exp = leftDec.length -1;
    leftDec = "" + leftDec;
    mantessa = leftDec.substring(1)+ rightDec;
  }
  else{
    var c =0;
    while (rightDec.charAt(c)!=1){
      c++;
    }
    var exp = -c -1;
    mantessa = rightDec.substring(c+1);
  }

  while (mantessa.length<23){
    mantessa+="0";
  }
  mantessa = mantessa.substring(0,24);

  exp += 128;
  if (exp<0){
    negativeExp = true;
    exp = Math.abs(exp);
  }
  var binaryExp="";
  while (exp!=0){
    binaryExp = (exp % 2) + binaryExp;
    exp = Math.trunc(exp/2);
  }
  while (binaryExp.length<8){
    binaryExp = "0" + binaryExp;
  }
  if (negativeExp){
    var newBinExp;
    for (var i =0; i< binaryExp.length; i++){
      if (binaryExp.charAt(i)==0){
        newBinExp += 1;
      }
      else {
        newBinExp += 0;
      }
    }

    for (var i = newBinExp.length -1; i>=0 ; i--){
      if (newBinExp.charAt(i)=="0"){
        newBinExp= newBinExp.substring(0, i)+"1"+newBinExp.substring(i+1);
        i = -10;
      }
      else{
        newBinExp= newBinExp.substring(0, i)+"0"+newBinExp.substring(i+1);
       }
    }
    binaryExp = newBinExp;
  }

  if (negative){
    negative = "1";
  }
  else{
    negative = "0";
  }
  var output32BitScientificNotation = mantessa + binaryExp + negative;
  // Show the output on the screen
  FormatAndShowOutput([floatToConvert, output32BitScientificNotation], 3);
}


// If you dare read a comment before starting to program..
// 3434000.5 has a binary representation of
//  1101000110011000010000.1
// In NORMALIZED scientific notation (i.e. scientific notation for Base 2)
// 1.1010001100110000100001 * 2^21
// ... so mantissa is 11010001100110000100001

// For the final 32 bits.. we have
// ... so 1010001100110000100001 for mantissa (because of explicit leading 1)
// ... so for bits (0-22) 10100011001100001000010
// ... so exponent representation in +128 format is 21+128 = 149 = (bits 23-30) 10010101
// ... so final sign bit = (bit 31) 0
