// export const calculateDiscountPrice = (price,discount) => {
//     const priceWithoutSpaces = parseFloat(price.replace(/\s/g, ""));
//     const discountWithoutSpaces = discount!="0" ? parseFloat(discount.replace(/\s/g, "")) : 0;
//     const discountPrice = priceWithoutSpaces - discountWithoutSpaces;
//     return discountPrice.toLocaleString("fr-FR") + " F CFA";
//   };

export const calculateDiscountPrice = (price,discount) => {
    const priceWithoutSpaces = parseFloat(price.replace(/\s/g, ""));
    const discountWithoutSpaces = parseFloat(discount.replace(/\s/g, "")) ;
    const discountPrice = priceWithoutSpaces - discountWithoutSpaces;
    return discountPrice.toLocaleString("fr-FR") + " F CFA";
  };

