function productHasTags(product, tags) {
  return (
    tags.filter((tag) => {
      return products.tags.includes(tag);
    }).length > 0
  );
}

function productInCollections(product, collections) {
  return (
    collections.filter((collection) => {
      return collection.productIds.includes(product.id);
    }).length > 0
  );
}

function calcPrice({ option, amount }, price) {
  switch (option) {
    case "price": {
      return Math.min(price, amount);
    }
    case "amount": {
      return Math.max(0, price - amount);
    }
    case "percent": {
      return Math.max(0, price * (1 - amount / 100));
    }
    default: {
      return price;
    }
  }
}

function calculateNewPrices(
  products = [],
  tags = [],
  collections = [],
  discounts = []
) {
  if (
    !Array.isArray(products) ||
    !Array.isArray(collections) ||
    !Array.isArray(tags) ||
    !Array.isArray(discounts)
  ) {
    return [];
  }

  let result = [...products];
  for (let i = 0; i < products.length; i++) {
    let bestDiscountIndex = -1;
    let bestPrice = products[i].price;
    let price = products[i].price;

    for (let j = 0; j < discounts.length; j++) {
      if (
        discounts[j].status === "enable" &&
        (bestDiscountIndex < 0 ||
          discounts[bestDiscountIndex].priority <= discounts[j].priority)
      ) {
        let suitableDiscount = false;

        switch (discounts[j].apply) {
          case "all": {
            suitableDiscount = true;
            break;
          }
          case "product": {
            if (discounts[j].productIds.includes(products[i].id)) {
              suitableDiscount = true;
            }
            break;
          }
          case "collection": {
            suitableDiscount = productInCollections(
              products[i],
              collections.filter((collection) => {
                return discounts[j].collectionIds.includes(collection.id);
              })
            );
            break;
          }
          case "tag": {
            suitableDiscount = productHasTags(products[i], discounts[j].tagIds);
            break;
          }
          default: {
            break;
          }
        }

        if (suitableDiscount) {
          let tempPrice = calcPrice(discounts[j].decrease, price);

          if (
            bestDiscountIndex < 0 ||
            discounts[bestDiscountIndex].priority <= discounts[j].priority ||
            bestPrice > tempPrice
          ) {
            bestPrice = tempPrice;
            bestDiscountIndex = j;
          }
        }
      }
    }

    result[i].currentPrice = bestPrice;
    result[i].currentDiscountIndex = bestDiscountIndex;
  }
  return result.filter((item) => item.currentDiscountIndex >= 0);
}

export { calculateNewPrices };
