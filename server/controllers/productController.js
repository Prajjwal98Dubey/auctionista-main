import { nanoid } from "nanoid";
import auctionPool from "../db/connectDB.js";
import { categoryToDBCategory } from "../helpers/mapping.js";
import { connectRedisServer } from "../redisClient.js";
import { convertDateToUsageTime } from "../helpers/dateFormatter.js";

export const addProduct = async (req, res) => {
  const user = req.user;
  const {
    set_price,
    original_price,
    title,
    desc,
    category,
    usage_time,
    bid_start_time,
    product_appeal,
    product_images,
    bid_time,
  } = req.body;
  try {
    if (
      !set_price ||
      !original_price ||
      !title ||
      !category ||
      !usage_time ||
      !bid_start_time
    )
      return res.json({ message: "insufficient data" }).status(400);
    const product_id = nanoid();
    await auctionPool.query(
      "INSERT INTO PRODUCT (product_id, product_user_id, product_set_price, product_original_price, product_title, product_desc, product_category, product_usage_time, bid_start_time, highest_bid, product_appeal, product_images,bid_time) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",
      [
        product_id,
        user,
        set_price,
        original_price,
        title.trim(),
        desc.trim(),
        category.trim(),
        usage_time,
        bid_start_time,
        0,
        product_appeal.trim(),
        product_images,
        bid_time,
      ]
    );
    return res
      .json({
        message: "product added",
        product_id,
        set_price,
        original_price,
        title: title.trim(),
        desc: desc.trim(),
        category: category.trim(),
        usage_time,
        bid_start_time,
        product_appeal: product_appeal.trim(),
        product_images,
      })
      .status(201);
  } catch (error) {
    return res.json({ message: "error" }).status(400);
  }
};

export const editProduct = async (req, res) => {
  const { new_value, attr, product_id } = req.body;
  if (!new_value || !attr || !product_id)
    return res.json({ message: "insufficient data to edit" }).status(400);
  try {
    let updatedProd = await auctionPool.query(
      `UPDATE PRODUCT SET ${attr} = $1 WHERE PRODUCT_ID = $2`,
      [new_value.trim(), product_id]
    );
    if (!updatedProd.rowCount)
      return res.json({ message: "no product with this id." }).status(404);
    return res.json({ message: "update success" }).status(200);
  } catch (error) {
    return res.json({ message: "error" }).status(400);
  }
};

export const deleteProduct = async (req, res) => {
  const product_id = req.query.product_id;
  try {
    let deletedProd = await auctionPool.query(
      "DELETE FROM PRODUCT WHERE PRODUCT_ID = $1",
      [product_id]
    );
    if (!deletedProd.rowCount)
      return res.json({ message: "no product with this id" }).status(404);
    return res.json({ message: "product deleted !!!" }).status(200);
  } catch (error) {
    return res.json({ message: "error" }).status;
  }
};

export const addMobile = async (req, res) => {
  const {
    brand_name,
    model_name,
    ram_storage,
    rom_storage,
    operating_system,
    rear_camera,
    front_camera,
    product_color,
    screen_size,
    set_price,
    original_price,
    title,
    desc,
    usage_time,
    bid_start_time,
    product_appeal,
    product_images,
    bid_time,
    cpu,
  } = req.body;

  const user = req.user;

  try {
    const productId = nanoid();
    if (
      !brand_name ||
      !model_name ||
      !ram_storage ||
      !rom_storage ||
      !operating_system ||
      !rear_camera ||
      !front_camera ||
      !product_color ||
      !screen_size ||
      !set_price ||
      !original_price ||
      !title ||
      !usage_time ||
      !bid_start_time ||
      !bid_time ||
      !cpu ||
      product_images.length === 0
    ) {
      return res.json({ message: "insufficient data" }).status(400);
    }
    await auctionPool.query(
      "INSERT INTO PRODUCT VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)",
      [
        productId,
        user,
        set_price,
        original_price,
        title,
        desc,
        "mobile",
        usage_time,
        bid_start_time,
        0,
        product_appeal,
        product_images,
      ]
    );
    await auctionPool.query(
      "INSERT INTO MOBILE_SPEC VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22)",
      [
        productId,
        brand_name,
        model_name,
        ram_storage,
        rom_storage,
        operating_system,
        rear_camera,
        front_camera,
        product_color,
        screen_size,
        product_images,
        set_price,
        original_price,
        title,
        desc,
        usage_time,
        bid_start_time,
        product_appeal,
        0,
        bid_time,
        user,
        cpu,
      ]
    );
    return res.json({ message: "product added!!!" }).status(201);
  } catch (error) {
    console.log(error);
  }
};

export const addLaptop = async (req, res) => {
  const {
    brand_name,
    model_name,
    ram_storage,
    rom_storage,
    operating_system,
    product_color,
    screen_size,
    set_price,
    original_price,
    title,
    desc,
    usage_time,
    bid_start_time,
    product_appeal,
    product_images,
    bid_time,
    cpu,
  } = req.body;

  const user = req.user;

  try {
    const productId = nanoid();
    if (
      !brand_name ||
      !model_name ||
      !ram_storage ||
      !rom_storage ||
      !operating_system ||
      !product_color ||
      !screen_size ||
      !set_price ||
      !original_price ||
      !title ||
      !usage_time ||
      !bid_start_time ||
      !bid_time ||
      !cpu ||
      product_images.length === 0
    ) {
      return res.json({ message: "insufficient data" }).status(400);
    }
    await auctionPool.query(
      "INSERT INTO PRODUCT VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)",
      [
        productId,
        user,
        set_price,
        original_price,
        title,
        desc,
        "laptop",
        usage_time,
        bid_start_time,
        0,
        product_appeal,
        product_images,
      ]
    );
    await auctionPool.query(
      "INSERT INTO LAPTOP_SPEC VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20)",
      [
        productId,
        brand_name,
        model_name,
        ram_storage,
        rom_storage,
        operating_system,
        product_color,
        screen_size,
        product_images,
        set_price,
        original_price,
        title,
        desc,
        usage_time,
        bid_start_time,
        product_appeal,
        0,
        bid_time,
        user,
        cpu,
      ]
    );
    return res.json({ message: "product added!!!" }).status(201);
  } catch (error) {
    console.log(error);
  }
};

export const addWatch = async (req, res) => {
  const {
    brand_name,
    model_name,
    product_color,
    set_price,
    original_price,
    title,
    desc,
    usage_time,
    bid_start_time,
    product_appeal,
    bid_time,
    diameter,
    is_digital,
    is_calling_available,
    have_fitness_tracker,
    product_images,
  } = req.body;
  const user = req.user;
  try {
    const productId = nanoid();
    if (
      !brand_name ||
      !model_name ||
      !product_color ||
      !set_price ||
      !original_price ||
      !title ||
      !usage_time ||
      !bid_start_time ||
      !bid_time ||
      !is_digital ||
      !diameter
    ) {
      return res.json({ message: "insufficient data" }).status(400);
    }
    await auctionPool.query(
      "INSERT INTO PRODUCT VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)",
      [
        productId,
        user,
        set_price,
        original_price,
        title,
        desc,
        "watch",
        usage_time,
        bid_start_time,
        0,
        product_appeal,
        product_images,
      ]
    );
    await auctionPool.query(
      "INSERT INTO WATCH_SPEC VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19)",
      [
        productId,
        brand_name,
        model_name,
        product_color,
        parseInt(diameter),
        is_digital,
        is_calling_available,
        have_fitness_tracker,
        user,
        product_images,
        set_price,
        original_price,
        title,
        desc,
        usage_time,
        bid_start_time,
        product_appeal,
        0,
        bid_time,
      ]
    );

    return res.json({ message: "product added!!!" }).status(201);
  } catch (error) {
    return res.json({ message: "error" }).status(400);
  }
};

export const addMonitor = async (req, res) => {
  const {
    brand_name,
    model_name,
    product_color,
    screen_size,
    set_price,
    original_price,
    title,
    desc,
    usage_time,
    bid_start_time,
    product_appeal,
    bid_time,
    product_images,
  } = req.body;
  const user = req.user;
  try {
    if (
      !brand_name ||
      !model_name ||
      !product_color ||
      !screen_size ||
      !set_price ||
      !original_price ||
      !title ||
      !desc ||
      !usage_time ||
      !bid_start_time ||
      !bid_time ||
      product_images.length === 0
    ) {
      return res.json({ message: "insufficient data" }).status(400);
    }
    const productId = nanoid();
    await auctionPool.query(
      "INSERT INTO PRODUCT VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)",
      [
        productId,
        user,
        set_price,
        original_price,
        title,
        desc,
        "monitor",
        usage_time,
        bid_start_time,
        0,
        product_appeal,
        product_images,
      ]
    );
    await auctionPool.query(
      "INSERT INTO MONITOR_SPEC VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)",
      [
        productId,
        brand_name,
        model_name,
        product_color,
        screen_size,
        set_price,
        original_price,
        title,
        desc,
        usage_time,
        bid_start_time,
        product_appeal,
        0,
        bid_time,
        user,
        product_images,
      ]
    );
    return res.json({ message: "product added!!" }).status(201);
  } catch (error) {
    return res.json({ message: "error" }).status(400);
  }
};

export const addKeyBoard = async (req, res) => {
  const {
    brand_name,
    model_name,
    product_color,
    set_price,
    original_price,
    title,
    desc,
    usage_time,
    bid_start_time,
    product_appeal,
    bid_time,
    product_images,
  } = req.body;
  const user = req.user;
  try {
    console.log(desc, usage_time, bid_start_time, product_appeal, bid_time);
    if (
      !brand_name ||
      !model_name ||
      !product_color ||
      !set_price ||
      !original_price ||
      !title ||
      !desc ||
      !usage_time ||
      !bid_start_time ||
      !bid_time ||
      product_images.length === 0
    ) {
      return res.json({ message: "insufficient data" }).status(400);
    }
    const productId = nanoid();
    await auctionPool.query(
      "INSERT INTO PRODUCT VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)",
      [
        productId,
        user,
        set_price,
        original_price,
        title,
        desc,
        "keyboard",
        usage_time,
        bid_start_time,
        0,
        product_appeal,
        product_images,
      ]
    );
    await auctionPool.query(
      "INSERT INTO KEYBOARD_SPEC VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)",
      [
        productId,
        brand_name,
        model_name,
        product_color,
        set_price,
        original_price,
        title,
        desc,
        usage_time,
        bid_start_time,
        product_appeal,
        0,
        bid_time,
        user,
        product_images,
      ]
    );
    return res.json({ mesage: "product added!!!" }).status(201);
  } catch (error) {
    console.log(error);
    return res.json({ message: "error" }).status(400);
  }
};

export const addHeadPhone = async (req, res) => {
  const {
    brand_name,
    model_name,
    product_color,
    is_wireless,
    set_price,
    original_price,
    title,
    desc,
    usage_time,
    bid_start_time,
    product_appeal,
    bid_time,
    product_images,
  } = req.body;
  const user = req.user;
  try {
    if (
      !brand_name ||
      !model_name ||
      !product_color ||
      !is_wireless ||
      !set_price ||
      !original_price ||
      !title ||
      !desc ||
      !usage_time ||
      !bid_start_time ||
      !bid_time ||
      product_images.length === 0
    ) {
      return res.json({ message: "insufficient data" }).status(400);
    }
    const productId = nanoid();
    await auctionPool.query(
      "INSERT INTO PRODUCT VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)",
      [
        productId,
        user,
        set_price,
        original_price,
        title,
        desc,
        "headphone",
        usage_time,
        bid_start_time,
        0,
        product_appeal,
        product_images,
      ]
    );
    await auctionPool.query(
      "INSERT INTO HEADPHONE_SPEC VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)",
      [
        productId,
        brand_name,
        model_name,
        product_color,
        is_wireless,
        set_price,
        original_price,
        title,
        desc,
        usage_time,
        bid_start_time,
        product_appeal,
        0,
        bid_time,
        user,
        product_images,
      ]
    );
    return res.json({ mesage: "product added!!!" }).status(201);
  } catch (error) {
    return res.json({ message: "error" }).status(400);
  }
};

export const addMouse = async (req, res) => {
  const {
    brand_name,
    model_name,
    product_color,
    is_wireless,
    set_price,
    original_price,
    title,
    desc,
    usage_time,
    bid_start_time,
    product_appeal,
    bid_time,
    product_images,
  } = req.body;
  const user = req.user;
  try {
    if (
      !brand_name ||
      !model_name ||
      !product_color ||
      !is_wireless ||
      !set_price ||
      !original_price ||
      !title ||
      !desc ||
      !usage_time ||
      !bid_start_time ||
      !bid_time ||
      product_images.length === 0
    ) {
      return res.json({ message: "insufficient data" }).status(400);
    }
    const productId = nanoid();
    await auctionPool.query(
      "INSERT INTO PRODUCT VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)",
      [
        productId,
        user,
        set_price,
        original_price,
        title,
        desc,
        "mouse",
        usage_time,
        bid_start_time,
        0,
        product_appeal,
        product_images,
      ]
    );
    await auctionPool.query(
      "INSERT INTO MOUSE_SPEC VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)",
      [
        productId,
        brand_name,
        model_name,
        product_color,
        is_wireless == "no" ? 0 : 1,
        set_price,
        original_price,
        title,
        desc,
        usage_time,
        bid_start_time,
        product_appeal,
        0,
        bid_time,
        user,
        product_images,
      ]
    );
    return res.json({ mesage: "product added!!!" }).status(201);
  } catch (error) {
    console.log(error);
    return res.json({ message: "error" }).status(400);
  }
};

export const addGeneralElectronics = async (req, res) => {
  const {
    brand_name,
    model_name,
    product_color,
    set_price,
    original_price,
    title,
    desc,
    usage_time,
    bid_start_time,
    product_appeal,
    bid_time,
    product_images,
  } = req.body;
  const user = req.user;
  try {
    if (
      !brand_name ||
      !model_name ||
      !product_color ||
      !set_price ||
      !original_price ||
      !title ||
      !desc ||
      !product_appeal ||
      !usage_time ||
      !bid_start_time ||
      !bid_time ||
      product_images.length === 0
    ) {
      return res.json({ message: "insufficient data" }).status(400);
    }
    const productId = nanoid();
    await auctionPool.query(
      "INSERT INTO PRODUCT VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)",
      [
        productId,
        user,
        set_price,
        original_price,
        title,
        desc,
        "general-electronics",
        usage_time,
        bid_start_time,
        0,
        product_appeal,
        product_images,
      ]
    );
    await auctionPool.query(
      "INSERT INTO GENERAL_ELECTRONICS_SPEC VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)",
      [
        productId,
        brand_name,
        model_name,
        product_color,
        set_price,
        original_price,
        title,
        desc,
        usage_time,
        bid_start_time,
        product_appeal,
        0,
        bid_time,
        user,
        product_images,
      ]
    );
    return res.json({ mesage: "product added!!!" }).status(201);
  } catch (error) {
    return res.json({ message: "error" }).status(400);
  }
};

export const displayProducts = async (req, res) => {
  let { category } = req.query;
  category.toLowerCase();
  if (category === "electronics") category = "general-electronics";
  try {
    let latestProducts =
      category === "all" || category === undefined
        ? await auctionPool.query(
            "SELECT PROD.PRODUCT_ID, PROD.PRODUCT_SET_PRICE,PROD.PRODUCT_TITLE,PROD.PRODUCT_USAGE_TIME,PROD.BID_START_TIME,PROD.PRODUCT_IMAGES,PROD.PRODUCT_USER_ID, PROD.PRODUCT_CATEGORY, PROD.CREATED_AT,US.USER_NAME,US.USER_PHOTO FROM PRODUCT PROD INNER JOIN USERS US ON PROD.PRODUCT_USER_ID = US.USER_ID"
          )
        : await auctionPool.query(
            "SELECT PROD.PRODUCT_ID, PROD.PRODUCT_SET_PRICE,PROD.PRODUCT_TITLE,PROD.PRODUCT_USAGE_TIME,PROD.BID_START_TIME,PROD.PRODUCT_IMAGES,PROD.PRODUCT_USER_ID, PROD.PRODUCT_CATEGORY, PROD.CREATED_AT, US.USER_NAME,US.USER_PHOTO FROM PRODUCT PROD INNER JOIN USERS US ON PROD.PRODUCT_USER_ID = US.USER_ID WHERE PROD.PRODUCT_CATEGORY = $1",
            [category]
          );

    latestProducts.rows.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    return res.json({ products: latestProducts.rows }).status(200);
  } catch (error) {
    console.log(error);
  }
};

export const getProductDetails = async (req, res) => {
  const { prodId, category } = req.query;

  try {
    if (categoryToDBCategory[category] === undefined)
      return res.json({ message: "category does not exists." }).status(400);
    let results = await auctionPool.query(
      `SELECT * FROM ${categoryToDBCategory[category]} WHERE PRODUCT_ID = $1`,
      [prodId]
    );
    if (results.rows.length === 0) return res.json;
    let userDetails = await auctionPool.query(
      "SELECT USER_NAME,USER_PHOTO FROM USERS WHERE USER_ID = $1",
      [results.rows[0].user_id]
    );
    let commonAttr = {
      brand_name: results.rows[0].brand_name,
      model_name: results.rows[0].model_name,
      product_color: results.rows[0].product_color,
      product_images: results.rows[0].product_images,
      product_set_price: results.rows[0].product_set_price,
      bid_start_time: results.rows[0].bid_start_time,
      original_price: results.rows[0].original_price,
      title: results.rows[0].title,
      desc: results.rows[0].description,
      // product_appeal: results.rows[0].product_appeal,
      usage_time: `${convertDateToUsageTime(results.rows[0].usage_time)}`,
      bid_time: results.rows[0].bid_time,
      user_name: userDetails.rows[0].user_name,
      user_photo: userDetails.rows[0].user_photo,
      highest_bid: results.rows[0].highest_bid,
      product_id: results.rows[0].product_id,
      product_category: category,
    };
    switch (category) {
      case "mobile":
        return res
          .json({
            details: {
              ...commonAttr,
              ram_storage: `${results.rows[0].ram_storage} GB`,
              rom_storage: `${results.rows[0].rom_storage} GB`,
              operating_system: results.rows[0].operating_system,
              rear_camera: `${results.rows[0].rear_camera} MP`,
              front_camera: `${results.rows[0].front_camera} MP`,
              screen_size: `${results.rows[0].screen_size} inch (${(
                results.rows[0].screen_size * 2.54
              ).toFixed(2)}) cm`,
              cpu: results.rows[0].cpu,
            },
          })
          .status(200);
      case "laptop":
        return res
          .json({
            details: {
              ...commonAttr,
              ram_storage: `${results.rows[0].ram_storage} GB`,
              rom_storage: `${results.rows[0].rom_storage} GB`,
              operating_system: results.rows[0].operating_system,
              rear_camera: `${results.rows[0].rear_camera} MP`,
              front_camera: `${results.rows[0].front_camera} MP`,
              screen_size: `${results.rows[0].screen_size} inch (${(
                results.rows[0].screen_size * 2.54
              ).toFixed(2)}) cm`,
              cpu: results.rows[0].cpu,
            },
          })
          .status(200);
      case "monitor":
        return res
          .json({
            details: {
              ...commonAttr,
              screen_size: `${results.rows[0].screen_size} inch (${(
                results.rows[0].screen_size * 2.54
              ).toFixed(2)}) cm`,
            },
          })
          .status(200);
      case "keyboard":
        return res
          .json({
            details: {
              ...commonAttr,
            },
          })
          .status(200);
      case "watch":
        return res
          .json({
            details: {
              ...commonAttr,
              diameter: `${results.rows[0].diameter} mm`,
              is_digital: results.rows[0].is_digital,
              is_calling_available: results.rows[0].is_calling_available,
              have_fitness_tracker: results.rows[0].have_fitness_tracker,
            },
          })
          .status(200);
      case "mouse":
        return res
          .json({
            details: {
              ...commonAttr,
              is_wireless: results.rows[0].is_wireless,
            },
          })
          .status(200);
      case "headphone":
        return res
          .json({
            details: {
              ...commonAttr,
              is_wireless: results.rows[0].is_wireless,
            },
          })
          .status(200);
      case "general-electronics":
        return res
          .json({
            details: {
              ...commonAttr,
              is_wireless: results.rows[0].is_wireless,
            },
          })
          .status(200);
      default:
        return res.json({ message: "something went wrong." }).status(400);
    }
  } catch (error) {
    console.log(error);
  }
};

export const singleProductDetails = async (req, res) => {
  const { prodId } = req.query;
  try {
    const prodDetails = await auctionPool.query(
      "SELECT * FROM PRODUCT WHERE PRODUCT_ID = $1",
      [prodId]
    );
    const userDetails = await auctionPool.query(
      "SELECT USER_NAME,USER_PHOTO,USER_CITY,USER_COUNTRY FROM USERS WHERE USER_ID = $1",
      [prodDetails.rows[0].product_user_id]
    );
    return res
      .json({ ...prodDetails.rows[0], ...userDetails.rows[0] })
      .status(200);
  } catch (err) {
    console.log(err);
  }
};

export const getMyProducts = async (req, res) => {
  const user = req.user;
  try {
    let productDetails = await auctionPool.query(
      "SELECT PRODUCT_TITLE,PRODUCT_SET_PRICE,PRODUCT_USAGE_TIME,PRODUCT_IMAGES,PRODUCT_CATEGORY,PRODUCT_ID FROM PRODUCT WHERE PRODUCT_USER_ID = $1",
      [user]
    );
    return res.json({ products: productDetails.rows });
  } catch (error) {
    console.log(error);
  }
};

export const updateHighestBidOfProduct = async (req, res) => {
  const { prodId } = req.query;
  try {
    let redisClient = await connectRedisServer();
    let isProductPresentInRedis = await redisClient.get(prodId);
    if (isProductPresentInRedis == null) {
      return res.json({
        message: "something went wrong while fetching highest bid.",
      });
    } else {
      await auctionPool.query(
        "UPDATE PRODUCT SET HIGHEST_BID = $1 WHERE PRODUCT_ID = $2",
        [parseInt(isProductPresentInRedis), prodId]
      );
      return res.json({ message: "highest bid update success." }).status(201);
    }
  } catch {
    (e) => console.log(e);
  }
};

export const updateHighestBidOfSpecificProduct = async (req, res) => {
  const { prodId, category } = req.query;
  try {
    let redisClient = await connectRedisServer();
    let isKeyPresent = await redisClient.get(prodId);
    if (isKeyPresent == null)
      return res.json({
        message: "something went wrong while fetching highest bid.",
      });
    else {
      await auctionPool.query(
        `UPDATE ${categoryToDBCategory[category]} SET HIGHEST_BID = $1 WHERE PRODUCT_ID = $2`,
        [parseInt(isKeyPresent), prodId]
      );
      return res.json({ message: "highest bid update success." }).status(201);
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllWatchListProductDetails = async (req, res) => {
  const { prodIds } = req.body;
  try {
    let allProdDetails = prodIds.map((id) =>
      auctionPool
        .query("SELECT * FROM PRODUCT WHERE PRODUCT_ID = $1", [id])
        .then((res) => res.rows[0])
    );
    let prodDetails = await Promise.all(allProdDetails);
    return res.json(prodDetails).status(200);
  } catch (error) {
    console.log(error);
  }
};

export const getRelatedProducts = async (req, res) => {
  const { category, prodId } = req.query;
  try {
    let prodDetails = await auctionPool.query(
      "SELECT PRODUCT_ID,PRODUCT_IMAGES,PRODUCT_TITLE,PRODUCT_SET_PRICE FROM PRODUCT WHERE PRODUCT_CATEGORY=$1 AND PRODUCT_ID <> $2",
      [category.toLowerCase(), prodId]
    );
    return res.json(prodDetails.rows).status(200);
  } catch (error) {
    console.log(error);
  }
};
