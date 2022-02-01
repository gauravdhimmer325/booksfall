
 export const emailValidate=(email)=> {

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email) === false)
      return "Email  is not correct";
     else
     return ;
}

export const mobileValidate=(mobile)=>{
    let reg= /^[0]?[789]\d{9}$/;
  if(reg.test(mobile)===false)
  return "Mobile No. is not correct";
  else 
  return ;
}

export const nameValidate=(data)=>{
    // let reg=/^[a-z\d]{2,12}$/i;
    let reg=/^[ a-zA-Z\-\']+$/;
    if(reg.test(data)===false)
    return "Please Enter Valid Data";
    else
    return true
}

export const dobValidate=(dob)=>{
    let reg=/^([0-2^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
    if(reg.test(dob)===false)
    return "Please Enter Valid DOB";
    else
    return 
}
