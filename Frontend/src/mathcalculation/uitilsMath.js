export const discountCal = (price, mrp) => {
  return Math.ceil(((mrp - price) / mrp) * 100);
};


export const formatDate = (today)=>{
  const date = new Date(today);
  return date.toLocaleDateString("en-IN",{
    day:"2-digit",
    month:"short",
    year:"numeric"
    })
}