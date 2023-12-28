export const getDateTime = () => {
    console.log('getDateTime() Called!');
    let currentDate = new Date().toLocaleDateString("ko-KR", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      
      return currentDate;
 }
 