export async function find(model, params, skip, limit) {
  try {
    return model.find(params).lean().skip(skip).limit(limit);
  } catch (error) {
    console.error(`mongodb error:`, error);
    throw new Error("mongodb find error");
  }
}

export async function find_sorted(model, params, skip, limit, sort) {
  try {
    const query = model.find(params).lean();
    if (sort && typeof sort === "object" && Object.keys(sort).length) {
      query.sort(sort);
    }
    return query.skip(skip).limit(limit);
  } catch (error) {
    console.error(`mongodb error:`, error);
    throw new Error("mongodb find error");
  }
}

export async function insert(model, data) {
  try {
    return (await model.create(data)).toObject();
  } catch (error) {
    console.error("mongodb insert error:", error);
    throw new Error("mongodb insert error");
  }
}

export async function get_count(model, params) {
  try {
    return model.countDocuments(params);
  } catch (error) {
    throw new Error("mongodb get count error");
  }
}

export async function get(model, params, skip, limit) {
  try {
    return model.findOne(params).lean().skip(skip).limit(limit);
  } catch (error) {
    console.error(`mongodb error:`, error);
    throw new Error("mongodb get error");
  }
}

export async function update(model, params) {
  try {
    return model.findOneAndUpdate(
      params.filter,
      { $set: params.update },
      { new: true, lean: true, upsert: true }
    );
  } catch (error) {
    console.error(`mongodb error:`, error);
    throw new Error("mongodb update error");
  }
}

export async function getAndUpdate(
  model,
  {
    filter,
    updateOnceParams = {},
    updateAlwaysParams = {},
    push = {},
    options = {},
  }
) {
  const update = {};
  if (Object.keys(updateOnceParams).length)
    update.$setOnInsert = updateOnceParams;
  if (Object.keys(updateAlwaysParams).length) update.$set = updateAlwaysParams;
  if (Object.keys(push).length) update.$push = push;

  try {
    return await model.findOneAndUpdate(filter, update, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
      runValidators: true,
      context: "query",
      ...options,
    });
  } catch (e) {
    console.error("mongodb error:", e);
    throw new Error("mongodb getAndUpdate error");
  }
}

export async function getLastArrayItem(model, filter, arrayPath) {
  try {
    const projection = { [arrayPath]: { $slice: -1 } };
    const doc = await model.findOne(filter, projection).lean();
    const arr = doc?.[arrayPath];
    return Array.isArray(arr) && arr.length ? arr[0] : null;
  } catch (error) {
    console.error("mongodb error:", error);
    throw new Error("mongodb getLastArrayItem error");
  }
}

export async function bulkWrite(model, ops) {
  try {
    const bulkQuery = ops.map((query) => {
      return {
        updateOne: {
          filter: query.filter,
          update: {
            $setOnInsert: query.updateOnce,
            $set: query.updateAlways,
          },
          upsert: true,
          new: true,
          setDefaultsOnInsert: true,
          runValidators: true,
          context: "query",
        },
      };
    });
    if (bulkQuery.length) {
      const response = await model.bulkWrite(bulkQuery, { ordered: false });
      if (response.mongoose?.results) console.log(response.mongoose.results);
    }
  } catch (error) {
    console.error(`mongodb error:`, error);
    throw new Error("mongodb bulkWrite error");
  }
}
