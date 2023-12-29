let loginedId = '';

export const setLoginedId = (id='') => {
    console.log('setIsLoginedId() Called!');
        
         loginedId = 'aa';
        
  return loginedId; 
}

export const getLoginedId = () => {
    console.log('getIsLoginedId() Called!');
       
  return loginedId;  
}
