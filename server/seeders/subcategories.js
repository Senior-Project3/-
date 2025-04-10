const subcategories = [
  {
    name: "T-Shirts",
    description: "Casual and comfortable t-shirts for men",
    image: "https://rukminim2.flixcart.com/image/850/1000/xif0q/t-shirt/x/o/y/s-c02-sy-trip-makers-original-imagpxbyg8wucwc3.jpeg?q=90&crop=false",
    CategoryId: 1 
  },
  {
    name: "Shirts",
    description: "Formal and casual shirts for men",
    image: "https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/28219632/2024/3/12/2f53aaab-40e1-4c5b-8148-6ad150e5f4341710256687634CampusSutraMenClassicOpaqueCheckedCasualShirt2.jpg",
    CategoryId: 1 
  },
  {
    name: "Jeans",
    description: "Classic denim jeans for men",
    image: "https://www.thefashionisto.com/wp-content/uploads/2024/01/Baggy-Jeans-Men.jpg",
    CategoryId: 1 
  },
  {
    name: "Pants",
    description: "Casual and formal pants for men",
    image: "https://offduty.in/cdn/shop/products/Screenshot2023-06-16174613_1_1_1080x.jpg?v=1717842941",
    CategoryId: 1 
  },
  {
    name: "Jackets",
    description: "Warm and stylish jackets for men",
    image: "https://www.thejacketmaker.co.uk/cdn/shop/files/Men-Leather-Jackets-1582970628214_d6c2af3e-cd7e-44b8-88cb-94527f33218d_2048x.webp?v=1719244852",
    CategoryId: 1 
  },
  {
    name: "Sweaters",
    description: "Comfortable sweaters for men",
    image: "https://i.pinimg.com/736x/d6/3e/bb/d63ebbc278df7bd60dcfe5079dd60ccd.jpg",
    CategoryId: 1 
  },
  {
    name: "Suits",
    description: "Formal suits for men",
    image: "https://www.bonsoir.co.in/cdn/shop/files/Teal_tuxedo_Suit.jpg?crop=center&height=3669&v=1730281909&width=2446",
    CategoryId: 1 
  },
  {
    name: "Tops",
    description: "Casual and formal tops for women",
    image: "https://pictures.kartmax.in/cover/live/600x800/quality=6/sites/aPfvUDpPwMn1ZadNKhP7/product-images/8905745840282/660/TTCE000254_1.JPG",
    CategoryId: 2 
  },
  {
    name: "Dresses",
    description: "Elegant dresses for women",
    image: "https://nolabels.in/cdn/shop/files/1_690e91b9-d53f-4a24-a452-184dbd6682f0.jpg?v=1721197169&width=1080",
    CategoryId: 2 
  },
  {
    name: "Jeans",
    description: "Stylish jeans for women",
    image: "https://vader-prod.s3.amazonaws.com/1737112779-1730215419-best-jeans-women-6720fde100387.jpg",
    CategoryId: 2 
  },
  {
    name: "Pants",
    description: "Casual and formal pants for women",
    image: "https://hips.hearstapps.com/hmg-prod/images/best-workwear-trousers-for-women-64f085e159495.jpg?crop=0.9993333333333334xw:1xh;center,top&resize=980:*",
    CategoryId: 2 
  },
  {
    name: "Skirts",
    description: "Stylish skirts for women",
    image: "https://m.media-amazon.com/images/I/51zfKjsNLYL._AC_UY1100_.jpg",
    CategoryId: 2 
  },
  {
    name: "Jackets",
    description: "Warm and stylish jackets for women",
    image: "https://jungecoats.com/cdn/shop/articles/Sommejakker_blogindlaeg.jpg?v=1714736601&width=1080",
    CategoryId: 2 
  },
  {
    name: "Sweaters",
    description: "Comfortable sweaters for women",
    image: "https://images.jdmagicbox.com/quickquotes/images_main/women-cardigan-women-s-knitted-sweater-2011840246-7p5gz4r6.jpg",
    CategoryId: 2 
  },
  
  {
    name: "Boys' T-Shirts",
    description: "Fun and comfortable t-shirts for boys",
    image: "https://assets.mayoral.com/images/t_auto_img,f_auto,c_limit,w_1920/v1730740913/25-06001-085-XL-2/boy-skyscraper-t-shirt-bone-XL-2.jpg",
    CategoryId: 3 
  },
  {
    name: "Girls' T-Shirts",
    description: "Fun and comfortable t-shirts for girls",
    image: "https://dfcdn.defacto.com.tr/376/E0820A8_25SM_WT16_01_03.jpg",
    CategoryId: 3 
  },
  {
    name: "Boys' Pants",
    description: "Durable pants for boys",
    image: "https://hellojackalo.com/cdn/shop/products/jules-jeans-jackalo-4_1200x.jpg",
    CategoryId: 3 
  },
  {
    name: "Girls' Pants",
    description: "Durable pants for girls",
    image: "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/71652c8cd921bce5a30f2f4f6b848ec8.jpg?imageView2/2/w/500/q/60/format/webp",
    CategoryId: 3 
  },
  {
    name: "Boys' Dresses",
    description: "Casual dresses for boys",
    image: "https://www.mumkins.in/cdn/shop/products/party-wear-for-boys-bs121145-rama.jpg?v=1667026901&width=1080",
    CategoryId: 3 
  },
  {
    name: "Girls' Dresses",
    description: "Fun and colorful dresses for girls",
    image: "https://peekaabookids.com/cdn/shop/files/HC_08218.jpg?v=1739291761&width=533",
    CategoryId: 3 
  },
  {
    name: "Boys' Jackets",
    description: "Warm jackets for boys",
    image: "https://media.vertbaudet.co.uk/Pictures/vertbaudet/311154/hooded-jacket-lined-in-polar-fleece-with-gloves-for-boys.jpg",
    CategoryId: 3 
  },
  {
    name: "Girls' Jackets",
    description: "Warm jackets for girls",
    image: "https://xcdn.next.co.uk/Common/Items/Default/Default/ItemImages/3_4Ratio/SearchINT/Lge/Q81857.jpg?im=Resize,width=450",
    CategoryId: 3 
  },
  {
    name: "Boys' Sweaters",
    description: "Comfortable sweaters for boys",
    image: "https://cdn11.bigcommerce.com/s-scgdirr/products/24577/images/119686/SH5237_-_Peacock_1__56722.1664789162.560.850.jpg?c=2",
    CategoryId: 3 
  },
  {
    name: "Girls' Sweaters",
    description: "Comfortable sweaters for girls",
    image: "https://www.miabellebaby.com/cdn/shop/files/FALL91CPOUT6LP_1.jpg?v=1721141628&width=1080",
    CategoryId: 3 
  }
];

module.exports = subcategories; 