export const mapCategoriesToComponent = {
  mobile: {
    brand_name: "Brand",
    model_name: "Model",
    ram_storage: "RAM",
    rom_storage: "Storage",
    operating_system: "Operating System",
    rear_camera: "Rear Camera",
    front_camera: "Front Camera",
    product_color: "Color",
    screen_size: "Screen",
    usage_time: "Usage History",
    product_appeal: "Appeal",
    cpu: "CPU",
  },
  laptop: {
    brand_name: "Brand",
    model_name: "Model",
    ram_storage: "RAM",
    rom_storage: "Storage",
    operating_system: "Operating System",
    front_camera: "Front Camera",
    product_color: "Color",
    screen_size: "Screen",
    usage_time: "Usage History",
    product_appeal: "Appeal",
    cpu: "CPU",
  },
  monitor: {
    brand_name: "Brand",
    model_name: "Model",
    product_color: "Color",
    screen_size: "Screen",
    usage_time: "Usage History",
    product_appeal: "Appeal",
  },
  keyboard: {
    brand_name: "Brand",
    model_name: "Model",
    product_color: "Color",
    usage_time: "Usage History",
    product_appeal: "Appeal",
  },
  mouse: {
    brand_name: "Brand",
    model_name: "Model",
    product_color: "Color",
    usage_time: "Usage History",
    product_appeal: "Appeal",
    is_wireless: "Wireless",
  },
  headphone: {
    brand_name: "Brand",
    model_name: "Model",
    product_color: "Color",
    usage_time: "Usage History",
    product_appeal: "Appeal",
    is_wireless: "Wireless",
  },
  "general-electronics": {
    brand_name: "Brand",
    model_name: "Model",
    product_color: "Color",
    usage_time: "Usage History",
    product_appeal: "Appeal",
  },
  watch: {
    brand_name: "Brand",
    model_name: "Model",
    product_color: "Color",
    usage_time: "Usage History",
    product_appeal: "Appeal",
    diameter: "Diameter",
    is_digital: "Digital",
    is_calling_available: "Calling",
    have_fitness_tracker: "Fitness Tracker",
  },
};

export const mapCategoriesToOptions = {
  mobile: [
    "ram_storage",
    "rom_storage",
    "operating_system",
    "rear_camera",
    "front_camera",
    "screen_size",
    "cpu",
  ],
  laptop: [
    "ram_storage",
    "rom_storage",
    "operating_system",
    "screen_size",
    "cpu",
  ],
  watch: [
    "diameter",
    "is_digital",
    "is_calling_available",
    "have_fitness_tracker",
  ],
  monitor: ["screen_size"],
  keyboard: [],
  mouse: ["is_wireless"],
  headphone: ["is_wireless"],
  electronics: [],
  common: [
    "brand_name",
    "model_name",
    "product_color",
    "set_price",
    "original_price",
    "title",
    "desc",
    "usage_time",
    "bid_start_time",
    "product_appeal",
    "bid_time",
  ],
};
