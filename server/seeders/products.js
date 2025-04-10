const products = [
  {
    name: "Classic White T-Shirt",
    description:
      "A comfortable and versatile white t-shirt made from 100% cotton",
    price: 29.99,
    image:
      "https://www.frenchconnection.com/cdn/shop/files/LEAD_569ZE10_600copy.jpg?v=1716301996",
    size: "M",
    color: "White",
    stock: 100,
    sales: 5,
    SubCategoryId: 1, 
  },
  {
    name: "Black Graphic T-Shirt",
    description: "Stylish black t-shirt with a unique graphic design",
    price: 34.99,
    image:
      "https://assets.ajio.com/medias/sys_master/root/20230629/nDDs/649cd4e8a9b42d15c91c7cc3/-473Wx593H-466021226-black-MODEL.jpg",
    size: "L",
    color: "Black",
    stock: 75,
    sales: 5,

    SubCategoryId: 1, 
  },
  {
    name: "Classic  T-Shirt",
    description:
      "A comfortable  t-shirt made from 100% cotton",
    price: 39.99,
    image:
      "https://i.pinimg.com/originals/58/c5/64/58c5642ee053a40202983f070373f0f6.jpg",
    size: "XL",
    color: "White",
    stock: 100,
    sales: 4,
    SubCategoryId: 1, // Men's T-Shirts
  },

  // Men's Shirts
  {
    name: "Blue Oxford Shirt",
    description: "Classic blue oxford shirt for a preppy look",
    price: 49.99,
    image:
      "https://images.hawesandcurtis.com/tr:q-80/WE/WEPRH302-B40-186375-1400px-1820px.jpg",
    size: "M",
    color: "Blue",
    stock: 50,
    sales: 5,

    SubCategoryId: 2,
  },
  {
    name: "White Dress Shirt",
    description: "Formal white dress shirt for special occasions",
    price: 59.99,
    image:
      "https://www.trueclassictees.com/cdn/shop/files/4220_WHITE_3.jpg?v=1690561644",
    size: "L",
    color: "White",
    stock: 40,
    sales: 5,

    SubCategoryId: 2,
  },
  {
    name: "Slim Fit Blue Jeans",
    description: "Modern slim fit jeans in classic blue denim",
    price: 79.99,
    image:
      "https://omiz.com.tn/uploads/articles/Jean%20Slim%20Fit-14621-0-2-1703326961.webp",
    size: "32",
    color: "Blue",
    stock: 60,
    sales: 5,

    SubCategoryId: 3,
  },
  {
    name: "Regular Fit Black Jeans",
    description: "Classic regular fit jeans in black denim",
    price: 69.99,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvX4_l4umSvz9anIuCj_fuSyVnLmm7tL3n6A&s",
    size: "34",
    color: "Black",
    stock: 45,
    sales: 5,

    SubCategoryId: 3,
  },
  {
    name: "Pantalon Cargo Jogger Fit",
    description: "Classic regular fit Jogger in green denim",
    price: 69.99,
    image:
      "https://noonclo.com/cdn/shop/files/G2.1_d0dd7c41-8d0e-4ffb-b8f9-cebdbce79977_720x.jpg?v=1721038999",
    size: "34",
    color: "Green",
    stock: 45,
    sales: 5,

    SubCategoryId: 3, // Men's Jeans
  },
  {
    name: "Pantalon Jeans Fit",
    description: "Classic regular fit Jeans in blue denim",
    price: 79.99,
    image:
      "https://noonclo.com/cdn/shop/files/IMG_4906_720x.png?v=1742475185",
    size: "34",
    color: "Blue",
    stock: 45,
    sales: 5,

    SubCategoryId: 3, // Men's Jeans
  },

  // Men's Pants
  {
    name: "Khaki Chino Pants",
    description: "Versatile khaki chino pants for a casual look",
    price: 59.99,
    image:
      "https://americantall.com/cdn/shop/products/American-Tall-Men-Carman-Chinos-Desert-Khaki-front.jpg?v=1657112294",
    size: "32",
    color: "Khaki",
    stock: 55,
    sales: 5,

    SubCategoryId: 4,
  },
  {
    name: "Black Dress Pants",
    description: "Formal black dress pants for business attire",
    price: 69.99,
    image:
      "https://cdn.shopify.com/s/files/1/1025/3059/products/CLASSIC_BLACK_SUIT__008_55ea9747-29ec-4bef-a165-726158b4b255_900x1250_crop_center.jpg?v=1638390750",
    size: "34",
    color: "Black",
    stock: 40,
    sales: 5,

    SubCategoryId: 4,
  },
  {
    name: "Winter Puffer Jacket",
    description: "Warm and cozy puffer jacket for cold weather",
    price: 149.99,
    image:
      "https://woodpeckercanada.com/cdn/shop/files/woodpecker-mens-long-winter-coat-penguin-blue-diamond-5.jpg?v=1740078348",
    size: "L",
    color: "Black",
    stock: 30,
    sales: 7,

    SubCategoryId: 5,
  },
  {
    name: "Light Denim Jacket",
    description: "Classic light denim jacket for mild weather",
    price: 89.99,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqm1377vUbVmZEIRAUCAFjpOcu1zfdSzAltQ&s",
    size: "M",
    color: "Blue",
    stock: 35,
    sales: 7,

    SubCategoryId: 5,
  },
  {
    name: "Dark Indigo",
    description: "Classic light denim jacket for mild weather",
    price: 99.99,
    image:
      "https://sfycdn.speedsize.com/02c6093b-0da5-471d-911b-60169ce0c907/www.tog24.com/cdn/shop/files/61856_NORTHJ002_02.jpg?v=1724332563&width=720",
    size: "M",
    color: "Black",
    stock: 35,
    sales: 7,

    SubCategoryId: 5, // Men's Jackets
  },
  {
    name: "Dark Indigo",
    description: "Classic light denim jacket for mild weather",
    price: 99.99,
    image:
      "https://sfycdn.speedsize.com/02c6093b-0da5-471d-911b-60169ce0c907/www.tog24.com/cdn/shop/files/61856_NORTHJ002_02.jpg?v=1724332563&width=720",
    size: "M",
    color: "Black",
    stock: 35,
    sales: 7,

    SubCategoryId: 5, // Men's Jackets
  },
  {
    name: "Winter Button Coat Lapel",
    description: "Classic light denim jacket for mild weather",
    price: 99.99,
    image:
      "https://m.media-amazon.com/images/I/71j5nx98bAL._AC_SX569_.jpg",
    size: "M",
    color: "Brown",
    stock: 35,
    sales: 7,

    SubCategoryId: 5, // Men's Jackets
  },
  // Men's Sweaters
  {
    name: "Gray Crewneck Sweater",
    description: "Comfortable gray crewneck sweater for layering",
    price: 69.99,
    image:
      "https://thehelmclothing.com/cdn/shop/files/uijfy5ckodriococtksr.jpg?format=webp&quality=65&v=1728427513&width=2400",
    size: "M",
    color: "Gray",
    stock: 40,
    sales: 7,

    SubCategoryId: 6,
  },
  {
    name: "Navy V-Neck Sweater",
    description: "Stylish navy v-neck sweater for a polished look",
    price: 79.99,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYWtyyRx4pUnGXkCEsKO_V5TZvZZ243s8YdA&s",
    size: "L",
    color: "Navy",
    stock: 35,
    sales: 7,

    SubCategoryId: 6,
  },
  {
    name: "Black Sweater",
    description: "Stylish black sweater for a polished look",
    price: 59.99,
    image:
      "https://noonclo.com/cdn/shop/files/KIC_122-3572-1296-9300_prod1_06b03698-7af3-4d5f-bd76-ca134cf5a2ec_720x.jpg?v=1695996485",
    size: "L",
    color: "Black",
    stock: 35,
    sales: 7,

    SubCategoryId: 6, // Men's Sweaters
  },

  // Men's Suits
  {
    name: "Black Two-Piece Suit",
    description: "Classic black two-piece suit for formal occasions",
    price: 299.99,
    image:
      "https://www.mrmunro.co.uk/wp-content/uploads/2022/08/house-of-cavani-tux-two-piece-suit-p1330-21105_image.jpeg",
    size: "40R",
    color: "Black",
    stock: 20,
    sales: 9,

    SubCategoryId: 7,
  },
  {
    name: "Navy Blue Suit",
    description: "Modern navy blue suit for business and formal events",
    price: 329.99,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWD6A2YptxGM9XjIlxvuyP0m5T9Skhu0aU_A&s",
    size: "42R",
    color: "Navy",
    stock: 15,
    sales: 9,

    SubCategoryId: 7,
  },
  {
    name: "Navy Blue Suit",
    description: "Modern navy blue suit for business and formal events",
    price: 329.99,
    image:
      "https://cdn.suitdirect.co.uk/upload/siteimages/large/0079479_150_a.jpg",
    size: "42R",
    color: "Navy",
    stock: 15,
    sales: 9,

    SubCategoryId: 7, // Men's Suits
  },
  {
    name: "Slim Fit Blake Ecru Suit",
    description: "Modern Slim Fit Blake Ecru Suit for business and formal events",
    price: 329.99,
    image:
      "https://www.suitdirect.co.uk/api/product/getzoomimages/23364#0",
    size: "42R",
    color: "Navy",
    stock: 15,
    sales: 9,

    SubCategoryId: 7, // Men's Suits
  },
  {
    name: "Black Suit",
    description: "Modern Black suit for business and formal events",
    price: 329.99,
    image:
      "https://www.suitdirect.co.uk/api/product/getzoomimages/22953#0",
    size: "42R",
    color: "Navy",
    stock: 15,
    sales: 9,

    SubCategoryId: 7, // Men's Suits
  },
  {
    name: "Slim Fit Grey Texture Suit",
    description: "Modern Slim Fit Grey Texture Suit for business and formal events",
    price: 329.99,
    image:
      "https://www.suitdirect.co.uk/api/product/getzoomimages/21298#0",
    size: "42R",
    color: "Navy",
    stock: 15,
    sales: 9,

    SubCategoryId: 7, // Men's Suits
  },
  // Women's Tops
  {
    name: "White Blouse",
    description: "Elegant white blouse for a professional look",
    price: 49.99,
    image:
      "https://www.moderncitizen.com/cdn/shop/files/chidi-structured-short-sleeve-wrap-blouse-white-1_78cb471d-3c88-45e4-9041-ba0f5513562c.jpg?v=1709681903&width=2000",
    size: "M",
    color: "White",
    stock: 45,
    sales: 9,

    SubCategoryId: 8,
  },
  {
    name: "Striped T-Shirt",
    description: "Casual striped t-shirt for everyday wear",
    price: 34.99,
    image:
      "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/476248/item/goods_69_476248_3x4.jpg?width=494",
    size: "S",
    color: "Blue/White",
    stock: 60,
    sales: 9,

    SubCategoryId: 8,
  },
  {
    name: "Floral Summer Dress",
    description: "Light and breezy summer dress with floral pattern",
    price: 59.99,
    image:
      "https://images.riverisland.com/image/upload/t_ProductImagePortraitMedium/f_auto/q_auto/901878_main",
    size: "S",
    color: "Blue",
    stock: 40,
    sales: 9,

    SubCategoryId: 9, 
  },
  {
    name: "Black Evening Gown",
    description: "Elegant black evening dress for special occasions",
    price: 129.99,
    image:
      "https://loreta.com.au/cdn/shop/products/womens_black_evening_gown_dress_glitter_sequin_loreta_australia_melbourne_boutique_express-7_1024x1024.jpg?v=1674979281",
    size: "M",
    color: "Black",
    stock: 25,
    sales: 9,

    SubCategoryId: 9, 
  },
  {
    name: "Casual Flowy Pleated Loose Dress",
    description: "Elegant black evening dress for special occasions",
    price: 129.99,
    image:
      "https://m.media-amazon.com/images/I/61ytThx3j-L._AC_SX522_.jpg",
    size: "M",
    color: "Black",
    stock: 25,
    sales: 9,

    SubCategoryId: 9, // Women's Dresses
  },
  // Women's Jeans
  {
    name: "High-Waisted Skinny Jeans",
    description: "Flattering high-waisted skinny jeans in dark wash",
    price: 79.99,
    image:
      "https://freakins.com/cdn/shop/files/Aniwarya01525-Edit_54ec0cce-3005-4ec8-abfb-c6781cb95cad.jpg?v=1718094249",
    size: "28",
    color: "Blue",
    stock: 50,
    sales: 9,

    SubCategoryId: 10,
  },
  {
    name: "Boyfriend Jeans",
    description: "Relaxed fit boyfriend jeans for a casual look",
    price: 69.99,
    image: "https://i.ebayimg.com/images/g/l70AAOSwCdhmn31g/s-l400.jpg",
    size: "30",
    color: "Light Blue",
    stock: 45,
    sales: 9,

    SubCategoryId: 10,
  },
  {
    name: "Black Skinny Pants",
    description: "Versatile black skinny pants for any occasion",
    price: 59.99,
    image:
      "https://lagence.com/cdn/shop/files/2294DNM_MARGOT_NOIR_01.jpg?v=1689719415",
    size: "28",
    color: "Black",
    stock: 55,
    sales: 9,

    SubCategoryId: 11, 
  },
  {
    name: "Pleated Wide-Leg Pants",
    description: "Stylish pleated wide-leg pants for a modern look",
    price: 69.99,
    image:
      "https://www.vicicollection.com/cdn/shop/files/trueelegancesatinpleatedbeltedwidelegpantslighttaupe161_9b4b91cb-4283-4579-8f9e-dda752999fba.jpg?v=1695775789",
    size: "30",
    color: "Navy",
    stock: 40,
    sales: 9,

    SubCategoryId: 11, 
  },
  {
    name: "Pleated Mini Skirt",
    description: "Stylish pleated mini skirt in navy blue",
    price: 49.99,
    image:
      "https://media.mangooutlet.com/is/image/punto/57045969_43-99999999_01?wid=2048",
    size: "S",
    color: "Navy",
    stock: 35,
    sales: 9,

    SubCategoryId: 12, 
  },
  {
    name: "Floral Midi Skirt",
    description: "Elegant floral print midi skirt",
    price: 59.99,
    image:
      "https://www.lulus.com/images/product/xlarge/7636681_1547316.jpg?w=375&hdpi=1",
    size: "M",
    color: "Multi",
    stock: 30,
    sales: 9,

    SubCategoryId: 12,
  },
  {
    name: "Faux Leather Jacket",
    description: "Stylish faux leather jacket for a cool look",
    price: 89.99,
    image:
      "https://images.asos-media.com/products/jdy-collarless-faux-leather-jacket-in-black/204323473-1-black?$n_640w$&wid=513&fit=constrain",
    size: "M",
    color: "Black",
    stock: 25,
    sales: 10,

    SubCategoryId: 13,
  },
  {
    name: "Trench Coat",
    description: "Classic trench coat for a sophisticated look",
    price: 129.99,
    image:
      "https://joliesse.com.tn/21325-large_default/trench-coat-pour-femme.jpg",
    size: "S",
    color: "Beige",
    stock: 20,
    sales: 10,

    SubCategoryId: 13,
  },
  {
    name: "Oversized Knit Sweater",
    description: "Comfortable oversized knit sweater for cozy days",
    price: 69.99,
    image:
      "https://www.na-kd.com/globalassets/loose_knitted_oversized_sweater-1100-006959-0196_0067.jpg?ref=47CD0A8E50",
    size: "M",
    color: "Gray",
    stock: 30,
    sales: 10,

    SubCategoryId: 14,
  },
  {
    name: "Turtleneck Sweater",
    description: "Stylish turtleneck sweater for a polished look",
    price: 59.99,
    image:
      "https://saintandsofia.com/cdn/shop/products/pocket-turtle-neck-burgundy-women-s-sweaters-saint-sofia-usa-32556937019569.jpg?crop=center&v=1664200694&width=600",
    size: "S",
    color: "Burgundy",
    stock: 25,
    sales: 10,

    SubCategoryId: 14,
  },
  {
    name: "Superhero T-Shirt",
    description: "Fun superhero t-shirt for boys",
    price: 24.99,
    image:
      "https://assets.ajio.com/medias/sys_master/root/20230812/sNoi/64d780f4eebac147fcc52d79/-473Wx593H-463457376-blue-MODEL.jpg",
    size: "8",
    color: "Blue",
    stock: 50,
    sales: 10,

    SubCategoryId: 15,
  },
  {
    name: "Striped T-Shirt",
    description: "Classic striped t-shirt for boys",
    price: 19.99,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs2Luoaj801fgVbqwq_Gt2rmG0tuKhqZ3_yQ&s",
    size: "10",
    color: "Blue/White",
    stock: 45,
    sales: 13,

    SubCategoryId: 15, 
  },
  {
    name: "Unicorn T-Shirt",
    description: "Fun unicorn t-shirt for girls",
    price: 24.99,
    image: "https://www.character.com/cdn/shop/files/uats2710.jpg?v=1711013958",
    size: "8",
    color: "Pink",
    stock: 50,
    sales: 13,

    SubCategoryId: 16,
  },
  {
    name: "Floral T-Shirt",
    description: "Pretty floral t-shirt for girls",
    price: 19.99,
    image:
      "https://shop.mango.com/assets/rcs/pics/static/T8/fotos/S/87050613_02.jpg?imwidth=2048&imdensity=1&ts=1730907286678",
    size: "10",
    color: "White",
    stock: 45,
    sales: 13,

    SubCategoryId: 16,
  },
  {
    name: "Cargo Pants",
    description: "Durable cargo pants for boys",
    price: 34.99,
    image:
      "https://img-lcwaikiki.mncdn.com/mnresize/1020/1360/pim/productimages/20242/7208986/v1/l_20242-w46777z4-gby_5.jpg",
    size: "8",
    color: "Khaki",
    stock: 40,
    sales: 13,

    SubCategoryId: 17,
  },
  {
    name: "Jeans",
    description: "Classic jeans for boys",
    price: 29.99,
    image:
      "https://media.boohoo.com/i/boohoo/kzz97475_blue_xl_1/male-blue-boys-skinny-jeans",
    size: "10",
    color: "Blue",
    stock: 35,
    sales: 14,

    SubCategoryId: 17,
  },
  {
    name: "Leggings",
    description: "Comfortable leggings for girls",
    price: 24.99,
    image:
      "https://www.terez.com/cdn/shop/files/Terez65ef738cbcf95165ef738cbd1b8.2573699965ef738cbd1b8.jpg?v=1710191644",
    size: "8",
    color: "Black",
    stock: 40,
    sales: 13,

    SubCategoryId: 18, 
  },
  {
    name: "Jeans",
    description: "Stylish jeans for girls",
    price: 29.99,
    image:
      "https://drest.s3.eu-west-3.amazonaws.com/wp-content/uploads/2021/04/18024437/girls-bright-blue-high-waist-yazmin-skinny-jeans-5.jpg",
    size: "10",
    color: "Blue",
    stock: 35,
    sales: 13,

    SubCategoryId: 18,
  },
  {
    name: "Casual Romper",
    description: "Comfortable romper for boys",
    price: 34.99,
    image:
      "https://www.dhresource.com/webp/m/0x0/f2/albu/g5/M01/CE/45/rBVaI1myZoiAZH93AADkdlpgKH0254.jpg",
    size: "8",
    color: "Blue",
    stock: 30,
    sales: 13,

    SubCategoryId: 19, 
  },
  {
    name: "Summer Jumpsuit",
    description: "Fun summer jumpsuit for boys",
    price: 39.99,
    image: "https://m.media-amazon.com/images/I/51yf8BPBYgL.jpg",
    size: "10",
    color: "Green",
    stock: 25,
    sales: 13,

    SubCategoryId: 19,
  },
  {
    name: "Floral Party Dress",
    description: "Pretty floral dress for girls",
    price: 39.99,
    image:
      "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/AG9802s.jpg?im=Resize,width=750",
    size: "8",
    color: "Pink",
    stock: 30,
    sales: 13,

    SubCategoryId: 20,
  },
  {
    name: "Tutu Dress",
    description: "Fun tutu dress for girls",
    price: 44.99,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFCezNA5DfNQ-ILOfmH_-oLfDrXvQpyKqhLg&s",
    size: "10",
    color: "Purple",
    stock: 25,
    sales: 15,

    SubCategoryId: 20,
  },
  {
    name: "Winter Puffer Jacket",
    description: "Warm puffer jacket for boys",
    price: 59.99,
    image:
      "https://media.johnlewiscontent.com/i/JohnLewis/006979327?fmt=auto&$background-off-white$",
    size: "8",
    color: "Blue",
    stock: 20,
    sales: 15,

    SubCategoryId: 21,
  },
  {
    name: "Lightweight Jacket",
    description: "Lightweight jacket for boys",
    price: 49.99,
    image:
      "https://www.macinasac.com/cdn/shop/files/SSP_142123.jpg?v=1741089429&width=1946",
    size: "10",
    color: "Green",
    stock: 15,
    sales: 15,
    SubCategoryId: 21,
  },
  {
    name: "Winter Puffer Jacket",
    description: "Warm puffer jacket for girls",
    price: 59.99,
    image:
      "https://nickis.com/cdn/shop/files/6805851901-8.jpg?v=1726501274&width=1125",
    size: "8",
    color: "Pink",
    stock: 20,
    sales: 15,
    SubCategoryId: 22,
  },
  {
    name: "Lightweight Jacket",
    description: "Lightweight jacket for girls",
    price: 49.99,
    image:
      "https://i5.walmartimages.com/asr/79f5505b-3edb-4d95-a2c5-b37ee3aa067b.5b57f4dbe616eb319366ba232b0a8a5b.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
    size: "10",
    color: "Purple",
    stock: 15,
    sales: 15,
    SubCategoryId: 22,
  },
  {
    name: "Striped Sweater",
    description: "Warm striped sweater for boys",
    price: 39.99,
    image:
      "https://assets.myntassets.com/w_412,q_60,dpr_2,fl_progressive/assets/images/10909640/2019/12/27/16f2cf1c-8591-4a5a-84ef-a4f51f0e4b3c1577422842241-LC-Waikiki-Boys-Navy-Blue--White-Striped-Pullover-Sweater-56-1.jpg",
    size: "8",
    color: "Blue/White",
    stock: 25,
    sales: 16,
    SubCategoryId: 23,
  },
  {
    name: "Hooded Sweater",
    description: "Comfortable hooded sweater for boys",
    price: 44.99,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXRj66mJItQzZsAHVJy4DVZAVm9gJL8A1Unw&s",
    size: "10",
    color: "Gray",
    stock: 20,
    sales: 16,
    SubCategoryId: 23,
  },
  {
    name: "Cardigan Sweater",
    description: "Pretty cardigan sweater for girls",
    price: 39.99,
    image:
      "https://kw.redtagfashion.com/cdn/shop/files/129793275-1_201-Girls_20Junior_20Sweater-Pale_20Pink-2-3_20Years_31841959-2be1-4636-b92e-d7eac793e45d.jpg?v=1727415265",
    size: "8",
    color: "Pink",
    stock: 25,
    sales: 16,
    SubCategoryId: 24,
  },
  {
    name: "Hooded Sweater",
    description: "Comfortable hooded sweater for girls",
    price: 44.99,
    image:
      "https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/24464870/2023/8/11/d5e9e1a6-7480-4332-a189-b9f1200f43a61691777437424AlanJonesGirlsPurpleHoodedSweatshirt1.jpg",
    size: "10",
    color: "Purple",
    stock: 20,
    sales: 16,
    SubCategoryId: 24,
  },
];

module.exports = products;
