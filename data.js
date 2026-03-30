
window.MAS_DATA = {
  restaurant: {
    name: "Mas Salsa Tex Mex Restaurant",
    shortName: "Mas Salsa",
    tagline: "Tex-Mex favorites, margaritas, and live music in Springtown.",
    phone: "(817) 220-6555",
    phoneHref: "tel:+18172206555",
    addressLine1: "5500 W Highway 199",
    cityStateZip: "Springtown, TX 76082",
    address: "5500 W Highway 199, Springtown, TX 76082",
    mapsUrl: "https://maps.google.com/?q=5500+W+Highway+199,+Springtown,+TX+76082",
    facebookUrl: "https://www.facebook.com/profile.php?id=100051324955884",
    services: ["Dine-in", "Outdoor seating", "In-store pickup"],
    hours: [
      { day: "Monday", open: "11:00 AM", close: "8:00 PM" },
      { day: "Tuesday", open: "11:00 AM", close: "8:00 PM" },
      { day: "Wednesday", open: "11:00 AM", close: "8:00 PM" },
      { day: "Thursday", open: "11:00 AM", close: "8:00 PM" },
      { day: "Friday", open: "11:00 AM", close: "9:00 PM" },
      { day: "Saturday", open: "11:00 AM", close: "9:00 PM" },
      { day: "Sunday", open: "Closed", close: "" }
    ]
  },
  featuredItems: [
    { name: "Queso", price: 5.00, image: "assets/food-flight-tacos.jpg", tag: "Starter" },
    { name: "Street Tacos Dinner", price: 14.00, image: "assets/food-tacos-beer.jpg", tag: "Best Seller" },
    { name: "Fajita Trio", price: 19.00, image: "assets/food-shrimp-plate.jpg", tag: "Shareable" },
    { name: "California Burrito", price: 14.00, image: "assets/food-burrito-plate.jpg", tag: "Lunch + Dinner" },
    { name: "Skinny Margarita", price: 13.50, image: "assets/food-margarita-quesadilla.jpg", tag: "Cocktail" },
    { name: "Fried Ice Cream", price: 5.99, image: "assets/food-skillet.jpg", tag: "Dessert" }
  ],
  upcomingEvents: [
    {
      title: "Texas Backroads Return Night",
      dateLabel: "Saturday, May 16 • 6–9 PM",
      description: "Acoustic blend of popular classic rock and country.",
      image: "assets/event-texas-backroads.jpg",
      cta: "View live music page"
    },
    {
      title: "Texas Backroads Holiday Set",
      dateLabel: "Saturday, July 4 • 6–9 PM",
      description: "Summer return date promoted on the restaurant flyer.",
      image: "assets/event-texas-backroads.jpg",
      cta: "See event details"
    }
  ],
  pastEvents: [
    {
      title: "Mas Salsa Music Night",
      dateLabel: "Friday, March 20 • 6:30–9:30 PM",
      description: "Featuring Alf Evans, Neal Cowan, and Red Dirt Remedy.",
      image: "assets/event-mas-salsa-music.jpg"
    },
    {
      title: "Medicine Song",
      dateLabel: "Friday, March 27 • 6:30 PM",
      description: "Recent live music flyer from the restaurant Facebook page.",
      image: "assets/event-medicine-song.jpg"
    },
    {
      title: "Brandon McLaughlin",
      dateLabel: "Saturday, March 28 • 6 PM",
      description: "Recent live set promoted by Mas Salsa.",
      image: "assets/event-brandon.jpg"
    },
    {
      title: "Gary and Red Acoustic Show",
      dateLabel: "Saturday, March 28",
      description: "Recent acoustic show promoted on the restaurant page.",
      image: "assets/event-gary-red.jpg"
    }
  ],
  menuCategories: [
    {
      id: "appetizers",
      title: "Appetizers",
      group: "food",
      orderable: true,
      items: [
        { name: "Queso", price: 5.00, startsAt: true },
        { name: "Queso Supreme", price: 9.00 },
        { name: "Guacamole", price: 4.00, startsAt: true },
        { name: "Flautitas", price: 10.00 },
        { name: "Fiesta Plate", price: 17.00 },
        { name: "Fajita Fries", price: 11.00 },
        { name: "Serrano queso", price: 5.00, startsAt: true },
        { name: "ChoriQueso", price: 10.50 }
      ]
    },
    {
      id: "lunch",
      title: "Lunch",
      group: "food",
      orderable: true,
      items: [
        { name: "ENCHILADA LUNCH", price: 11.00 },
        { name: "TORTA", price: 13.00 },
        { name: "GORDITAS", price: 12.00 },
        { name: "HAMBURGESA", price: 10.00 },
        { name: "HUEVOS CON ENCHILADAS", price: 12.00 },
        { name: "CALIFORNIA BURRITO", price: 13.00 },
        { name: "TACO LUNCH", price: 10.00 },
        { name: "Lunch Special", price: 12.50 },
        { name: "STREET TACO LUNCH", price: 12.00 },
        { name: "Tostada plate", price: 11.00 },
        { name: "Lunch Special #2", price: 11.50 }
      ]
    },
    {
      id: "enchiladas",
      title: "Enchiladas",
      group: "food",
      orderable: true,
      items: [
        { name: "Avocado enchiladas", price: 13.50 },
        { name: "Fajita enchiladas", price: 14.00 },
        { name: "Enchiladas delight", price: 13.00 },
        { name: "Enchiladas verdes", price: 14.00 },
        { name: "Tex-mex enchiladas", price: 13.00 },
        { name: "Skillet enchiladas", price: 13.50 }
      ]
    },
    {
      id: "tacos",
      title: "Tacos",
      group: "food",
      orderable: true,
      items: [
        { name: "Street Tacos Dinner", price: 14.00 },
        { name: "Taco dinner", price: 13.00 },
        { name: "Tacos all carbon", price: 15.00 },
        { name: "Ribeye tacos", price: 23.00 },
        { name: "Tacos presidente", price: 15.50 }
      ]
    },
    {
      id: "fajitas",
      title: "Fajitas",
      group: "food",
      orderable: true,
      items: [
        { name: "Fajita For 1", price: 17.50 },
        { name: "Shrimp Fajita", price: 19.00 },
        { name: "Fajita trio", price: 19.00, startsAt: true },
        { name: "Gran parillada", price: 23.00, startsAt: true },
        { name: "Fajitas For 2", price: 34.00 }
      ]
    },
    {
      id: "nachos",
      title: "Nachos",
      group: "food",
      orderable: true,
      items: [
        { name: "Nachos", price: 10.00, startsAt: true },
        { name: "Fajita nachos", price: 12.00, startsAt: true },
        { name: "Nachos toreados", price: 13.00, startsAt: true },
        { name: "Nachos locos", price: 12.00 }
      ]
    },
    {
      id: "salads",
      title: "Salads",
      group: "food",
      orderable: true,
      items: [
        { name: "Taco salad", price: 12.00 },
        { name: "Fajita salad", price: 13.00 },
        { name: "Cowboy salad", price: 14.00 },
        { name: "Ana's favorite", price: 14.00 },
        { name: "Buffalo chicken salad", price: 13.00 },
        { name: "Crispy chicken salad", price: 13.00 },
        { name: "Shrimp Cocktail", price: 9.00, startsAt: true },
        { name: "Side salad", price: 4.50 }
      ]
    },
    {
      id: "burritos",
      title: "Burritos",
      group: "food",
      orderable: true,
      items: [
        { name: "Burrito Gordo", price: 14.00 },
        { name: "Grilled stuffed burrito", price: 14.00 },
        { name: "California burrito", price: 14.00 },
        { name: "Carne asada burrito", price: 14.00 },
        { name: "Carnita chipotle burrito", price: 14.00 },
        { name: "Burrito plate", price: 12.00 },
        { name: "Chimichanga", price: 14.00 }
      ]
    },
    {
      id: "joses-tex-mex",
      title: "Joses Tex-Mex",
      group: "food",
      orderable: true,
      subtitle: "Tex-Mex Plates",
      items: [
        { name: "Dolores H plate", price: 13.00 },
        { name: "Don miguel plate", price: 13.00 },
        { name: "Quesadilla plate", price: 14.00 },
        { name: "Flauta plate", price: 13.00 },
        { name: "Tamale plate", price: 12.00 },
        { name: "Monterrey chicken", price: 16.00 },
        { name: "Bacon Wrapped shrimp meal", price: 16.00 },
        { name: "Carnitas en adobo", price: 16.00 },
        { name: "Favorite steak", price: 24.00 },
        { name: "Camarones al diabla", price: 16.00 },
        { name: "Chile Relleno", price: 13.00 },
        { name: "Carne Asada", price: 17.50 },
        { name: "Beef Guiso", price: 13.00 }
      ]
    },
    {
      id: "drinks",
      title: "Drinks",
      group: "drinks",
      orderable: true,
      sections: [
        {
          title: "Soda",
          items: [
            { name: "Coke", price: 3.00 },
            { name: "Diet Coke", price: 3.00 },
            { name: "Fanta", price: 3.00 },
            { name: "Dr. Pepper", price: 3.00 },
            { name: "Lemonade", price: 3.00 },
            { name: "Sprite", price: 3.00 },
            { name: "Mexican coke", price: 4.50 },
            { name: "Jarritos", price: 4.00 },
            { name: "Topo chico", price: 4.00 },
            { name: "Water", price: null },
            { name: "Soda W. Cherry", price: 3.50 },
            { name: "Soda Can", price: 2.00 },
            { name: "Juice", price: 3.00 },
            { name: "Soda Water", price: null }
          ]
        },
        { title: "Coffee", items: [{ name: "coffee", price: 2.00 }] },
        {
          title: "Iced Tea",
          items: [
            { name: "Sweet tea", price: 3.00 },
            { name: "Unsweet", price: 3.00 },
            { name: "Half & half", price: 3.00 },
            { name: "Arnold Palmer", price: 3.00 }
          ]
        },
        { title: "Milk", items: [{ name: "Milk", price: 3.00 }] },
        {
          title: "Kid Drink",
          items: [
            { name: "Kid Coke", price: 1.50 },
            { name: "Kid Sprite", price: 1.50 },
            { name: "Kid Diet Coke", price: 1.50 },
            { name: "Kid Dr. Pepper", price: 1.50 },
            { name: "Kid Fanta", price: 1.50 },
            { name: "Kid Lemonade", price: 1.50 },
            { name: "Kid Soda W. Cherry", price: 2.00 },
            { name: "Kid Water", price: null },
            { name: "Kid Soda Water", price: null },
            { name: "kid tea", price: 1.50 }
          ]
        }
      ]
    },
    {
      id: "beer",
      title: "Beer",
      group: "bar",
      orderable: false,
      note: "Shown for menu accuracy. For the demo order flow, alcohol stays call-in or in-house only.",
      items: [
        { name: "Dos XX draft LARGE", price: 7.00 },
        { name: "Dos XX draft SMALL", price: 6.00 },
        { name: "Dos XX bottle", price: 4.00 },
        { name: "Michelob bottle", price: 3.75 },
        { name: "Miller bottle", price: 3.75 },
        { name: "Coors Light bottle", price: 3.75 },
        { name: "Bud light", price: 3.75 },
        { name: "Coors Banquet", price: 4.00 },
        { name: "Corona", price: 4.00 },
        { name: "Shiner", price: 3.75 },
        { name: "Lone Star", price: 3.75 },
        { name: "Modelo Especial", price: 4.00 },
        { name: "Negra Modelo", price: 4.00 },
        { name: "Bucket (domestic)", price: 19.00 },
        { name: "Bucket (imported)", price: 21.00 },
        { name: "Budwiser", price: 3.75 },
        { name: "LG michelob draft", price: 6.50 },
        { name: "SM Michelob draft", price: 5.00 },
        { name: "Lg modelo", price: 7.00 },
        { name: "Sm modelo", price: 6.00 },
        { name: "Pitcher of beer", price: 25.00 },
        { name: "All Pro Beer", price: 3.00 }
      ]
    },
    {
      id: "liquor",
      title: "Liquor",
      group: "bar",
      orderable: false,
      note: "Top shelf and extra shots shown as menu reference only.",
      sections: [
        {
          title: "Well Liquor",
          items: [
            { name: "Well Tequila", price: 5.50, startsAt: true },
            { name: "Well Vodka", price: 5.50, startsAt: true },
            { name: "Well Whiskey", price: 5.50, startsAt: true },
            { name: "Well Gin", price: 5.50, startsAt: true },
            { name: "Well Rum", price: 5.50, startsAt: true }
          ]
        },
        {
          title: "Top Shelf",
          items: [
            { name: "Patron", price: null },
            { name: "Don Julio", price: null },
            { name: "1800 silver", price: null },
            { name: "1800 gold", price: null },
            { name: "Casamigos", price: null },
            { name: "Hornitos", price: null },
            { name: "Jose Cuervo silver", price: null },
            { name: "Jose cuervo Gold", price: null },
            { name: "Crown Royal", price: null },
            { name: "Jack Daniels", price: null },
            { name: "TX whiskey", price: null },
            { name: "Jameson", price: null },
            { name: "Tito’s vodka", price: null },
            { name: "Grey goose vodka", price: null },
            { name: "Bacardi", price: null },
            { name: "Makers mark", price: null },
            { name: "Southern Comfort", price: null },
            { name: "Jim Beam", price: null },
            { name: "Seagram 7", price: null },
            { name: "Captain Morgan silver", price: null },
            { name: "Captain Morgan gold", price: null },
            { name: "Jaeger", price: null },
            { name: "Wild Turkey", price: null }
          ]
        },
        {
          title: "Extras",
          items: [
            { name: "Grand Marnier", price: 1.00 },
            { name: "Kahlua", price: null },
            { name: "Baileys", price: null },
            { name: "Fireball", price: 1.00 },
            { name: "Rumple Minze", price: 1.00 },
            { name: "Malibu", price: 0.50 },
            { name: "Deep Eddys", price: 0.50 },
            { name: "Crown Apple", price: 1.00 },
            { name: "Crown Vanilla", price: 1.00 },
            { name: "Triple Sec", price: null },
            { name: "Watermelon", price: null },
            { name: "Blue Curacao", price: null },
            { name: "Peach Schnapps", price: null },
            { name: "Sour Apple", price: null },
            { name: "Melon", price: null },
            { name: "Amaretto", price: null },
            { name: "Baileys Chocolate", price: null },
            { name: "Vanilla Vodka", price: null },
            { name: "Strawberry Vodka", price: null },
            { name: "Banana", price: null }
          ]
        }
      ]
    },
    {
      id: "cocktails",
      title: "Cocktails",
      group: "bar",
      orderable: false,
      note: "Available on the dine-in menu. Demo checkout excludes alcohol.",
      sections: [
        {
          title: "Margaritas",
          items: [
            { name: "Skinny Margarita", price: 13.50 },
            { name: "Beer Rita", price: 11.00 },
            { name: "Mega Rita", price: 30.00 },
            { name: "SM margarita", price: 5.75 },
            { name: "LG margarita", price: 8.50 },
            { name: "Topshelf marg", price: 13.50 },
            { name: "Margarita Flight", price: 16.50 }
          ]
        },
        {
          title: "Cocktails",
          items: [
            { name: "Pina colada", price: 8.00 },
            { name: "Blue Hawaiian", price: 8.00 },
            { name: "Bloody Mary", price: 8.95 },
            { name: "Tequila sunrise", price: 8.00 },
            { name: "Michelada", price: 9.00 },
            { name: "Daiquiri", price: 8.00 },
            { name: "Mangonada", price: 8.95 },
            { name: "Drink special #1", price: 5.00 },
            { name: "Long Island", price: 9.00 },
            { name: "Paloma", price: 8.00 },
            { name: "Green tea shot", price: 6.50 },
            { name: "Amaretto sour", price: 7.50 },
            { name: "Ranch water", price: 11.50 },
            { name: "Bahama Mama", price: 8.95 },
            { name: "Paleta shot", price: 5.00 },
            { name: "Paleta drink", price: 8.00 },
            { name: "Drink Spcl. #2", price: 4.00 },
            { name: "Starburst Shot", price: 5.00 },
            { name: "White Tea Shot", price: 5.50 }
          ]
        }
      ]
    },
    {
      id: "mocktails",
      title: "Mocktails",
      group: "drinks",
      orderable: true,
      subtitle: "Mocktail",
      items: [
        { name: "NON-ALCOHOLIC MARG", price: 7.00 },
        { name: "NON-ALCOHOLIC DAQUIRI", price: 7.00 },
        { name: "NON-ALCOHOLIC PINA COLADA", price: 7.00 }
      ]
    },
    {
      id: "alc",
      title: "A La Carte",
      group: "food",
      orderable: true,
      items: [
        { name: "Grilled Burrito ALC", price: 9.50 },
        { name: "Torta ALC", price: 9.50 },
        { name: "Carne Asada Burrito ALC", price: 8.99 },
        { name: "Quesadilla ALC", price: 8.00 },
        { name: "Tamale ALC", price: 2.50 },
        { name: "Chalupa ALC", price: 3.50 },
        { name: "Burrito ALC", price: 2.99 },
        { name: "Taco Carbon ALC", price: 3.75 },
        { name: "Flauta ALC", price: 2.20 },
        { name: "Fajita Burrito ALC", price: 4.50 },
        { name: "Chimichanga ALC", price: 8.75 },
        { name: "Grilled Shrimp ALC", price: 2.00 },
        { name: "Bacon Wrap Shrimp ALC", price: 3.50 },
        { name: "Relleno ALC", price: 7.50 },
        { name: "Ribeye Taco ALC (3)", price: 18.00 },
        { name: "Faj Taco ALC", price: 4.00 },
        { name: "Ench ALC", price: 2.50 },
        { name: "Avocado Ench ALC", price: 3.50 },
        { name: "Street taco alc", price: 3.15 },
        { name: "Taco ALC", price: 1.99 },
        { name: "Burrito gordo alc", price: 6.50 },
        { name: "Camarones ala diabla ALC (7)", price: 13.00 },
        { name: "Chipotle Shrimp ALC (6)", price: 13.50 },
        { name: "Guiso alc", price: 10.50 },
        { name: "Gordita ALC", price: 3.50 },
        { name: "Soup ALC", price: 5.50 },
        { name: "Arroz con pollo", price: 10.95 },
        { name: "California burrito ALC", price: 9.50 },
        { name: "6 Mesquite Shrimp ALC", price: 13.00 },
        { name: "Chipotle Burrito ALC", price: 9.50 },
        { name: "HAMBURGESA ALC", price: 8.00 }
      ]
    },
    {
      id: "sides",
      title: "Sides",
      group: "food",
      orderable: true,
      items: [
        { name: "Sd Ground Beef", price: 3.50 },
        { name: "Sd of Jala", price: 0.99 },
        { name: "Sd Grilled Bell Pep.", price: 2.50 },
        { name: "Sd Lettuce", price: 0.75 },
        { name: "Sd Grilled Onions", price: 2.50 },
        { name: "Sd Tomatoes", price: 0.75 },
        { name: "Sd Ranch", price: 1.00 },
        { name: "One Dollar", price: 1.00 },
        { name: "Dozen Tamales", price: 16.00 },
        { name: "Sm Chip & Salsa", price: 4.50 },
        { name: "Chicken Breast", price: 9.00 },
        { name: "Md Chip & Salsa", price: 5.50 },
        { name: "Sd Queso", price: 2.00 },
        { name: "Lg Chip and Salsa", price: 6.50 },
        { name: "Sd Fajita Meat", price: 10.00 },
        { name: "Sd Onions", price: 0.50 },
        { name: "Sd Pico", price: 0.75 },
        { name: "Sd Sauce", price: 1.00 },
        { name: "Sd Toreados(1)", price: 1.50 },
        { name: "Sd Grilled Onions and Peppers", price: 3.50 },
        { name: "Sd Rice", price: 2.50 },
        { name: "Sd of Beans", price: 2.50 },
        { name: "Sd Sour Cream", price: 1.00 },
        { name: "Sd Charros", price: 2.50 },
        { name: "Sd Guaca", price: 2.00 },
        { name: "Sd of Rice and Beans", price: 5.50 },
        { name: "Extra Set Up", price: 8.00 },
        { name: "Sd Shredded Cheese", price: 0.75 },
        { name: "Sd Fries", price: 3.75 },
        { name: "Sd Cilantro", price: 0.50 },
        { name: "Sd Veggies", price: 3.50 },
        { name: "Sd Avocado", price: 2.00 },
        { name: "Sd Tortillas", price: 1.50 },
        { name: "Sd Taquera", price: 2.00 }
      ]
    },
    {
      id: "kids",
      title: "Kids",
      group: "food",
      orderable: true,
      subtitle: "Kids Menu",
      items: [
        { name: "Kids Taco", price: 8.25 },
        { name: "Kids Quesadilla", price: 8.25 },
        { name: "Kids Tamale", price: 8.25 },
        { name: "Kids Burrito", price: 8.25 },
        { name: "Kids Hamburger", price: 8.25 },
        { name: "Kids Chicken Fingers", price: 8.25 },
        { name: "Kids Grilled Cheese", price: 8.25 },
        { name: "Kid Enchilada", price: 8.25 },
        { name: "Kids Nachos", price: 8.25 },
        { name: "Kid fajitas", price: 9.00 }
      ]
    },
    {
      id: "desserts",
      title: "Desserts",
      group: "dessert",
      orderable: true,
      items: [
        { name: "Cheesecake", price: 4.50 },
        { name: "Fried Ice Cream", price: 5.99 },
        { name: "Sopapillas", price: 4.50 },
        { name: "Sopapilla ALC", price: 1.50 },
        { name: "Ice Cream Scoop", price: 3.50 },
        { name: "Cheesecake Chimichanga", price: 6.50 },
        { name: "Churro w ice cream", price: 6.00 },
        { name: "Cookie skillet", price: 7.00 },
        { name: "Flan", price: 5.00 }
      ]
    },
    {
      id: "specials",
      title: "Specials",
      group: "food",
      orderable: true,
      items: [
        { name: "Dinner special", price: 15.50 },
        { name: "stuffed avo", price: 15.50 },
        { name: "Soup", price: 11.50 },
        { name: "Special #2", price: 9.00 },
        { name: "40 oz rice", price: 16.00 },
        { name: "40 oz beans", price: 16.00 },
        { name: "20 enchiladas", price: 30.00 },
        { name: "30 street tacos", price: 60.00 },
        { name: "20 tacos", price: 30.00 },
        { name: "Team enchilada", price: 12.00 },
        { name: "Kate Spcl.", price: 23.00 },
        { name: "Shirts", price: 25.00 },
        { name: "Dozen Enchiladas", price: 18.00 }
      ]
    },
    {
      id: "wine",
      title: "Wine",
      group: "bar",
      orderable: false,
      note: "Wine is listed for menu accuracy and dine-in reference.",
      items: [
        { name: "Merlot", price: 5.50 },
        { name: "Chardonnay", price: 5.50 },
        { name: "Prosecco", price: 4.50 },
        { name: "Cabernet", price: 5.50 },
        { name: "White Zinfandel", price: 5.50 },
        { name: "Sangria", price: 4.50 }
      ]
    }
  ]
};
