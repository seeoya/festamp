export const getDateTime = () => {
    let currentDate = new Date().toLocaleDateString("ko-KR", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    });

    return currentDate;
};
