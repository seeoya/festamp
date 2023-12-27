const customRandom = (startNum, endNum) => {
    // startNum 이상 ~ endNum 이하 랜덤 정수 return
    let result = Math.floor(Math.random() * (endNum - 1) + startNum);
    console.log(result);

    return result;
};

export { customRandom };
