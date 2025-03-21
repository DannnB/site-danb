const formatDatetime = (datetime: string) => {
  const myDatetime = new Date(datetime);
  return (
    myDatetime.toLocaleDateString([], {
      year: "numeric",
      month: "long",
      day: "2-digit",
    }) // +
    //" | " +
    //myDatetime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );
};

export default formatDatetime;
