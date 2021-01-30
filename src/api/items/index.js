  
const ItemService = require("../providers/meli");
const FakeRedis = require("../providers/redis");

const getCurrency = async id => {
  const callback = async () => {
    const { data } = await ItemService.getCurrencies();
    return (
      data &&
      data.reduce((collection, currency) => {
        collection[currency.id] = currency;
        return collection;
      }, {})
    );
  };

  const currencies = await FakeRedis.get("currencies", callback);
  return id ? currencies[id] : currencies;
};

const getItem = async (req, res, next) => {
  try {
    const [id] = isRequired(["id"], req.params);

    const payload = await FakeRedis.get("item=" + id, async () => {
      const [payload, description] = await Promise.all([
        await ItemService.getItem(id),
        await ItemService.getItemDescription(id)
      ]);

      payload.item.description = description;
      if (payload.item.price.currency) {
        const currency = await getCurrency(payload.item.price.currency);
        payload.item.price.symbol = currency.symbol;
        payload.item.price.decimals = currency.decimal_places;
      }

      return payload;
    });

    res.json(payload);
  } catch (err) {
    return next(err);
  }
};

const searchItems = async (req, res, next) => {
  let q;
  try {
    [q] = isRequired(["q"], req.query);
  } catch (err) {
    return next(err);
  }

  const cacheKey = "search=" + q;
  let payload = await FakeRedis.get(cacheKey);

  if (!payload) {
    try {
      payload = await ItemService.search(q, 4);

      const currencies = await getCurrency();
      payload.items = payload.items.map(item => {
        if (item.price.currency) {
          const currency = currencies[item.price.currency];
          item.price.symbol = currency.symbol;
          item.price.decimals = currency.decimal_places;
        }
        return item;
      });
    } catch (err) {
      return next(err);
    }

    payload = await FakeRedis.set(cacheKey, payload);
    return res.json(payload);
  }

  res.json(payload);
};

module.exports = { getItem, searchItems };