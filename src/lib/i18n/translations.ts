export type Locale = "en" | "zh";

const en = {
  nav: {
    home: "Home",
    about: "About Us",
    products: "Products",
    news: "News",
    contact: "Contact",
  },
  common: {
    viewProducts: "View Products",
    contactUs: "Contact Us",
    learnMore: "Learn More →",
    viewDetails: "View Details →",
    inquireNow: "Inquire Now",
    getInTouch: "Get in Touch",
    sendMessage: "Send Message",
    submitting: "Sending...",
    submitSuccess: "Thank you! Your inquiry has been submitted. We will contact you shortly.",
    submitError: "Submission failed. Please try again later.",
    allRightsReserved: "All rights reserved.",
  },
  company: {
    name: "Shandong Gaomi Gaoyuan Chemical Industry Co., Ltd.",
    shortName: "GAOYUAN CHEMICAL",
    brandTag: "Brand · SUNVIM Group",
    brandProduct: "YINZHOU Brand Sodium Chlorite",
    subsidiary: "A subsidiary of SUNVIM Group",
    address: "No. 2066 Xianghe Street (West), Gaomi City, Weifang, Shandong, China",
    emailWeb: "Email & Website",
  },
  footer: {
    quickLinks: "Quick Links",
    contact: "Contact",
    international: "International",
    domestic: "Domestic",
    fax: "Fax",
  },
  home: {
    heroTag: "YINZHOU Brand · Since 1992",
    heroTitle: "China's Largest Sodium Chlorite Manufacturer & Exporter",
    heroDesc:
      "A subsidiary of SUNVIM Group. Annual output: 20,000 tons solid & 60,000 tons liquid sodium chlorite. Exported to 40+ countries worldwide.",
    aboutTitle: "About Gaoyuan Chemical",
    aboutP1:
      "Shandong Gaomi Gaoyuan Chemical Industry Co., Ltd, a subsidiary of SUNVIM Group which is a large-scale listed enterprise. Founded in 1992, the company covers an area of 60,000 square meters with fixed assets of RMB 80 million and 150 employees.",
    aboutP2:
      "As the largest sodium chlorite manufacturer and exporter, our annual output is 20,000 tons of solid sodium chlorite and 60,000 tons of liquid sodium chlorite. As a unit for drafting national standards for sodium chlorite, our company has passed ISO9001 international quality system certification.",
    productsTitle: "Our Products",
    equipmentTitle: "Leading Technology, Advanced Equipment",
    equipmentP1:
      "Our company invests over RMB 80 million to introduce sodium chlorite production system from Canada. Stage II project was completed and put into operation in December 2015, producing about 20,000 tons of solid sodium chlorite and 60,000 tons of liquid sodium chlorite per year.",
    equipmentP2: "The production line is globally leading and the most advanced production system in China.",
    marketingTitle: "Based on the Whole Country, Expand to the Whole World",
    marketingDesc:
      "Yinzhou brand sodium chlorite sells well at home and abroad, exported to over 40 countries across the world, such as America, Brazil, Britain, Australia, Ethiopia and Japan. The annual export volume accounts for 70% of our total output, ranking first in the industry.",
    honorsTitle: "Honors & Certifications",
    ctaTitle: "Welcome to Visit Us for Business Cooperation",
    ctaDesc: "Warmly welcome friends at home and abroad to visit us for business negotiation and cooperation.",
    altFactory: "Gaoyuan Chemical Factory",
    altFacility: "Production facility",
    altEquipment: "Production equipment",
    altLine: "Production line",
  },
  stats: [
    { value: "1992", label: "Founded" },
    { value: "60,000", label: "㎡ Plant Area" },
    { value: "80,000", label: "Tons/Year Liquid" },
    { value: "40+", label: "Export Countries" },
  ],
  countries: ["USA", "Brazil", "UK", "Australia", "Ethiopia", "Japan", "40+ Countries"],
  certificates: [
    { title: "Business License" },
    { title: "National Industrial Product Production License" },
    { title: "China Export Commodity Brand Certificate" },
    { title: "High-tech Enterprise Certificate" },
    { title: "Honors & Qualifications" },
  ],
  products: {
    pageSubtitle: "High-quality industrial chemicals meeting national standards",
    list: [
      {
        slug: "sodium-chlorite",
        name: "Sodium Chlorite",
        formula: "NaClO₂",
        standard: "HG3250-2010",
        summary: "Solid and liquid types available. National standard drafter. Exported to 40+ countries.",
      },
      {
        slug: "sodium-chlorate",
        name: "Sodium Chlorate",
        formula: "NaClO₃",
        standard: "GB/T1618-2008",
        summary: "High-purity industrial grade. Strong oxidizer for diverse industrial applications.",
      },
    ],
    chlorite: {
      subtitle: "Industrial sodium chlorite (NaClO₂) — HG3250-2010",
      infoTitle: "Product Information",
      chemicalName: "Chemical Name",
      chemicalValue: "Industrial sodium chlorite (NaClO₂)",
      molecularWeight: "Molecular Weight",
      appearance: "Appearance",
      appearanceValue:
        "The product is classified into solid type and liquid type. The solid type is white crystal powder or particle, some slightly mixed with yellowish-green crystal; the liquid type is light yellow transparent solution.",
      standard: "Standard",
      standardValue:
        "Meets national chemical industry standard HG3250-2010. Gaoyuan Chemical is a drafting unit of this national standard.",
      ctaTitle: "YINZHOU Brand — Exported to 40+ Countries",
      ctaDesc: "Annual export volume accounts for 70% of total output, ranking first in the industry.",
      altDrums: "Sodium chlorite drums",
      altLiquid: "Liquid sodium chlorite storage",
      altEquipment: "Production equipment",
    },
    chlorate: {
      subtitle: "Industrial sodium chlorate (NaClO₃) — GB/T1618-2008",
      infoTitle: "Product Information",
      chemicalName: "Chemical Name",
      chemicalValue: "Industrial sodium chlorate (NaClO₃)",
      molecularWeight: "Molecular Weight",
      appearance: "Appearance",
      appearanceValue:
        "White or slightly mixed with yellow crystal, meeting national chemical industry standard GB/T1618-2008.",
      properties: "Properties",
      propertiesValue:
        "Usually white or slightly yellow isometric crystals. Salty and cool taste, easily soluble in water, slightly soluble in ethanol, ethylenediamine, glycerol and liquid ammonia. Hygroscopic with strong oxidizing power. Decomposes above 300°C releasing oxygen. Mixing with phosphorus, sulfur and organic matter can cause combustion and explosion upon friction or impact. Toxic!",
      specsTitle: "Technical Specifications",
      indicatorCol: "Indicator",
      contentCol: "Content",
      specs: [
        { name: "Sodium chlorate (dry basis) % ≥", value: "99.3" },
        { name: "Moisture % ≤", value: "0.60" },
        { name: "Insoluble in water % ≤", value: "0.01" },
        { name: "Chloride % ≤", value: "0.15" },
        { name: "Sulfate % ≤", value: "0.01" },
        { name: "Chromate % ≤", value: "0.01" },
        { name: "Iron (Fe) % ≤", value: "0.005" },
      ],
      applications: "Applications",
      applicationsValue:
        "Mainly used for manufacturing chlorine dioxide, sodium chlorite, perchlorate; also used for herbicides, oxidizers, papermaking, tanning, explosives, printing ink, matches, fireworks, medicine, metallurgical ore processing and bromine extraction from seawater.",
      packaging: "Packaging & Storage",
      packagingValue:
        "Packed in iron drums with plastic liner or plastic-coated woven bags, net weight 50kg per drum, or customized per customer requirements. Class 1 inorganic oxidizer — store in cool, ventilated, dry dedicated warehouse. Keep away from sugars, oils, charcoal and other organic materials.",
      safety: "Safety & Protection",
      safetyValue:
        "Sodium chlorate dust can irritate skin, mucous membranes and eyes. If splashed into eyes or on skin, rinse immediately with plenty of water. If ingested, drink salt water or warm soapy water to induce vomiting and seek medical treatment immediately. Lethal dose: 10g.",
    },
  },
  about: {
    bannerSubtitle: "Leading the industry, trend and the world",
    profileTitle: "Company Profile",
    profileP1:
      "Shandong Gaomi Gaoyuan Chemical Industry Co., Ltd, a subsidiary of SUNVIM Group which is a large-scale listed enterprise. Founded in 1992, the company covers an area of 60,000 square meters. It has fixed asset of RMB 80 million and 150 employees. In December 2014, its new plant was completed and put into operation. It introduced international leading automatic sodium chlorite production line, advanced technology, first class equipment and leading process, laying a solid foundation for improving product quality.",
    profileP2:
      "As the largest sodium chlorite manufacturer and exporter, our annual output is 20,000 tons of solid sodium chlorite and 60,000 tons of liquid sodium chlorite. Our company is located in economic developed Shandong Peninsula, taking less than one hour to the beautiful coast city Qingdao on the east and the world capital of kites, Weifang, with convenient transportation condition.",
    profileP3:
      "As a unit for drafting national standards for sodium chlorite, our company has passed ISO9001 international quality system certification. In addition, we have built complete quality testing and quality assurance system. Yinzhou brand sodium chlorite sells well at home and abroad, and is exported to over 40 countries across the world, such as America, Brazil, Britain, Australia, Ethiopia and Japan. The annual export volume accounts for 70% of our total output, ranking first in the industry.",
    profileP4:
      "Relying on stable and reliable quality, completed network and considerable service, our products are highly praised and supported by our customers across the world. Our company always takes science and technology as forerunner in optimizing product quality and firstly aims at meeting customer demands while improving enterprise competition and innovation capability.",
    historyTitle: "Development History",
    cultureTitle: "Enterprise Culture",
    equipmentTitle: "Production Equipments",
    equipmentSubtitle: "Leading Technology, Advanced Equipment",
    equipmentDesc:
      "Our company invests over RMB 80 million to introduce sodium chlorite production system from Canada. Stage II project of the system was completed construction and put into operation in December 2015, which will produce about 20,000 tons of solid sodium chlorite and 60,000 tons of liquid sodium chlorite per year. The production line is globally leading and the most advanced production system in China.",
    outlookTitle: "Future Outlook",
    outlookDesc:
      "Sodium chlorite produced with new process is extensively applicable to textile bleaching, sanitizer manufacturing, aquaculture and processing, water treatment, food, electronics, petrifaction and other fields. As the largest sodium chlorite manufacturer in China, we always adhere to the enterprise tenet of \"leading the industry, trend and the world\". Relying on production experience accumulated for many years and continuous technological innovation, our comprehensive quality is improving continuously and stably. Under the strongly support and help offered by friends in all walks of life, we will conquer more and more new peaks in sodium chlorite manufacturing field.",
    marketingTitle: "Marketing Network",
    marketingSubtitle: "Based on the Whole Country, Expand to the Whole World",
    marketingDesc:
      "Yinzhou brand sodium chlorite sells well at home and abroad, and is exported to over 40 countries across the world, such as America, Brazil, Britain, Australia, Ethiopia and Japan. The annual export volume accounts for 70% of our total output, ranking first in the industry.",
    honorsTitle: "Honors & Certifications",
    altFactory: "Factory",
    altHonors: "Honors wall",
    gallery: [
      { alt: "Advanced pumps" },
      { alt: "Production line interior" },
      { alt: "Liquid storage IBC totes" },
      { alt: "Warehouse drums" },
      { alt: "Factory exterior" },
    ],
  },
  history: [
    { year: "1996", text: "Started sodium chlorite production — among the first domestic manufacturers." },
    { year: "2003", text: "Entered international export market — one of the earliest exporters in the industry." },
    { year: "2007", text: "Ranked first in production and export volume in the industry." },
    { year: "2008", text: "Joined SUNVIM Group." },
    { year: "2010", text: "Participated in drafting and revising HG3250-2010 standard." },
    { year: "2015", text: "Relocated to new industrial park; new plant completed with Canadian production line successfully commissioned." },
  ],
  culture: [
    { title: "Enterprise Tenet", content: "Leading the industry, trend and the world" },
    { title: "Enterprise Mission", content: "Create value for customers, benefits for employees, and development for society" },
    { title: "Enterprise Spirit", content: "Loyalty, Harmony, Dedication" },
    { title: "Core Values", content: "Honesty in character, sincerity in relations, integrity in business" },
  ],
  news: {
    subtitle: "Latest company news and industry updates",
    footer: "For more information, please",
    contactLink: "contact us",
    loading: "Loading news...",
    empty: "No news articles yet.",
    notFound: "Article not found.",
    items: [
      {
        date: "2024-03-15",
        title: "Gaoyuan Chemical Continues Leading Sodium Chlorite Export",
        excerpt:
          "Our Yinzhou brand sodium chlorite maintains its position as the industry leader with exports to over 40 countries worldwide.",
      },
      {
        date: "2023-11-20",
        title: "New Production Line Achieves Full Capacity",
        excerpt:
          "The Canadian-imported automatic sodium chlorite production line has reached full operational capacity, producing 20,000 tons solid and 60,000 tons liquid annually.",
      },
      {
        date: "2023-06-10",
        title: "ISO9001 Quality System Recertification Completed",
        excerpt:
          "Gaoyuan Chemical successfully passed ISO9001 international quality system recertification, reaffirming our commitment to product excellence.",
      },
      {
        date: "2022-10-18",
        title: "National Industrial Product Production License Renewed",
        excerpt:
          "Our National Industrial Product Production License for hazardous chemical inorganic products has been renewed, valid until October 2027.",
      },
    ],
  },
  contact: {
    subtitle: "We welcome friends at home and abroad to visit us for business negotiation and cooperation",
    address: "Address",
    phone: "Phone",
    internationalDept: "International Dept.",
    domesticDept: "Domestic Dept.",
    serviceDept: "Customer Service",
    formTitle: "Send Inquiry",
    formDesc: "Fill out the form below and we will get back to you shortly.",
    name: "Name",
    email: "Email",
    company: "Company",
    productInterest: "Product Interest",
    message: "Message",
    productOptions: {
      chlorite: "Sodium Chlorite",
      chlorate: "Sodium Chlorate",
      other: "Other",
    },
  },
};

const zh: typeof en = {
  nav: {
    home: "首页",
    about: "关于我们",
    products: "产品展示",
    news: "新闻中心",
    contact: "联系我们",
  },
  common: {
    viewProducts: "产品展示",
    contactUs: "联系我们",
    learnMore: "了解更多 →",
    viewDetails: "查看详情 →",
    inquireNow: "立即询价",
    getInTouch: "联系我们",
    sendMessage: "发送留言",
    submitting: "提交中...",
    submitSuccess: "提交成功！我们将尽快与您联系。",
    submitError: "提交失败，请稍后重试。",
    allRightsReserved: "版权所有",
  },
  company: {
    name: "山东高密高源化工有限公司",
    shortName: "高源化工",
    brandTag: "银州品牌 · 孚日集团",
    brandProduct: "银州牌亚氯酸钠",
    subsidiary: "孚日集团旗下子公司",
    address: "山东省高密市祥和街2066号",
    emailWeb: "邮箱与网站",
  },
  footer: {
    quickLinks: "快速链接",
    contact: "联系方式",
    international: "国际业务部",
    domestic: "国内业务部",
    fax: "传真",
  },
  home: {
    heroTag: "银州品牌 · 始于1992年",
    heroTitle: "中国最大的亚氯酸钠生产厂家和出口商",
    heroDesc:
      "孚日集团旗下子公司。固体亚氯酸钠年产量2万吨，液体亚氯酸钠年产量6万吨，产品出口全球40多个国家和地区。",
    aboutTitle: "企业简介",
    aboutP1:
      "山东高密高源化工有限公司是孚日集团旗下的大型上市公司子公司，成立于1992年，占地面积6万平方米，固定资产8000万元，员工150人。",
    aboutP2:
      "作为全国最大的亚氯酸钠生产厂家和出口商，固体亚氯酸钠年产量2万吨，液体亚氯酸钠年产量6万吨。作为全国亚氯酸钠国家标准起草单位，公司已通过ISO9001国际质量体系认证。",
    productsTitle: "产品展示",
    equipmentTitle: "领先的科技 先进的设备",
    equipmentP1:
      "我公司投资八千多万元引进加拿大亚氯酸钠生产系统，2015年12月二期工程建成投产，固体亚氯酸钠年产量达20000余吨，液体亚氯酸钠年产量为60000余吨。",
    equipmentP2: "该生产线为世界一流、国内最先进的生产系统。",
    marketingTitle: "立足全国 放眼全球",
    marketingDesc:
      "银州牌亚氯酸钠畅销国内外，出口美国、巴西、英国、澳大利亚、埃塞俄比亚、日本等六大洲四十多个国家，年出口量达总产量的70%，位居同行业首位。",
    honorsTitle: "荣誉资质",
    ctaTitle: "热烈欢迎海内外朋友莅临洽谈合作",
    ctaDesc: "共创美好未来，期待与您携手合作。",
    altFactory: "高源化工厂区",
    altFacility: "生产设施",
    altEquipment: "生产设备",
    altLine: "生产线",
  },
  stats: [
    { value: "1992", label: "成立年份" },
    { value: "60,000", label: "占地面积（㎡）" },
    { value: "80,000", label: "液体年产量（吨）" },
    { value: "40+", label: "出口国家" },
  ],
  countries: ["美国", "巴西", "英国", "澳大利亚", "埃塞俄比亚", "日本", "40+国家"],
  certificates: [
    { title: "营业执照" },
    { title: "全国工业产品生产许可证" },
    { title: "中国出口商品品牌证明书" },
    { title: "高新技术企业证书" },
    { title: "荣誉资质墙" },
  ],
  products: {
    pageSubtitle: "符合国家标准的优质工业化学品",
    list: [
      {
        slug: "sodium-chlorite",
        name: "亚氯酸钠",
        formula: "NaClO₂",
        standard: "HG3250-2010",
        summary: "固体、液体两种规格。国家标准起草单位，出口40余国。",
      },
      {
        slug: "sodium-chlorate",
        name: "氯酸钠",
        formula: "NaClO₃",
        standard: "GB/T1618-2008",
        summary: "高纯度工业级产品，广泛应用于多种工业领域。",
      },
    ],
    chlorite: {
      subtitle: "工业亚氯酸钠（NaClO₂）— HG3250-2010",
      infoTitle: "产品信息",
      chemicalName: "化学名称",
      chemicalValue: "工业亚氯酸钠（NaClO₂）",
      molecularWeight: "分子量",
      appearance: "外观",
      appearanceValue:
        "产品分为固体和液体两种。固体产品为白色或微带黄绿色结晶粉末或颗粒；液体产品为浅黄色透明溶液。",
      standard: "标准",
      standardValue: "符合国家化工行业标准 HG3250-2010 标准。高源化工为该国家标准起草单位。",
      ctaTitle: "银州品牌 — 出口40余国",
      ctaDesc: "年出口量达总产量70%，位居同行业首位。",
      altDrums: "亚氯酸钠包装桶",
      altLiquid: "液体亚氯酸钠储存",
      altEquipment: "生产设备",
    },
    chlorate: {
      subtitle: "工业氯酸钠（NaClO₃）— GB/T1618-2008",
      infoTitle: "产品信息",
      chemicalName: "化学名称",
      chemicalValue: "工业氯酸钠（NaClO₃）",
      molecularWeight: "分子量",
      appearance: "外观",
      appearanceValue: "白色或略带黄色晶体，符合国家化工行业标准 GB/T1618-2008。",
      properties: "产品性质",
      propertiesValue:
        "通常是白色或者微黄色等轴晶体。味咸凉，易溶于水，微溶于乙醇、乙二胺、甘油和液氨，易吸潮，有较强的氧化力。加热至300℃以上易分解放出氧气。与磷、硫及有机物混合，只需摩擦或撞击即可发生燃烧和爆炸。有毒！",
      specsTitle: "技术指标",
      indicatorCol: "指标名称",
      contentCol: "含量",
      specs: [
        { name: "氯酸钠（以干基计）% ≥", value: "99.3" },
        { name: "水分 % ≤", value: "0.60" },
        { name: "水不溶物 % ≤", value: "0.01" },
        { name: "氯化物 % ≤", value: "0.15" },
        { name: "硫酸盐 % ≤", value: "0.01" },
        { name: "铬酸盐 % ≤", value: "0.01" },
        { name: "铁（Fe）% ≤", value: "0.005" },
      ],
      applications: "产品用途",
      applicationsValue:
        "主要用于制造二氧化氯、亚氯酸钠、高氯酸盐，其次用于除草剂、氧化剂、造纸、鞣革、炸药、印刷油墨制造、火柴、焰火、医药、冶金矿石处理及海水中提溴等。",
      packaging: "包装储运",
      packagingValue:
        "用内衬塑料袋的铁桶或涂塑纺织袋包装，每桶净重50公斤，或根据用户要求加工生产。产品属于一级无机氧化剂，应储存在阴凉、通风、干燥的专门库房内，注意防潮。不得与糖类、油类、木炭等有机物，硫酸、赤磷、还原剂、硝酸盐、酸类和一切易燃品共储混运。",
      safety: "毒性和防护措施",
      safetyValue:
        "氯酸钠粉尘能刺激皮肤、粘膜和眼睛，如不慎溅入眼睛或皮肤上，应立即用大量水冲洗干净。误食时要立即饮用食盐水或温肥皂水，使其吐出后送医院治疗，致死量10克。",
    },
  },
  about: {
    bannerSubtitle: "领跑行业、引领潮流、领先世界",
    profileTitle: "企业简介",
    profileP1:
      "山东高密高源化工有限公司是孚日集团旗下的大型上市公司子公司，成立于1992年，占地面积6万平方米，固定资产8000万元，员工150人。2014年12月，新厂建成投产，引进国际领先的亚氯酸钠自动生产线、先进技术和一流设备，为提升产品质量奠定了坚实基础。",
    profileP2:
      "作为全国最大的亚氯酸钠生产厂家和出口商，固体亚氯酸钠年产量2万吨，液体亚氯酸钠年产量6万吨。公司位于经济发达的山东半岛，东距美丽的海滨城市青岛不足1小时车程，西距世界风筝之都潍坊交通便利。",
    profileP3:
      "作为全国亚氯酸钠国家标准起草单位，公司已通过ISO9001国际质量体系认证，建立了完善的质量检测和质量保证体系。银州牌亚氯酸钠畅销国内外，出口美国、巴西、英国、澳大利亚、埃塞俄比亚、日本等40多个国家，年出口量达总产量的70%，位居同行业首位。",
    profileP4:
      "凭借稳定可靠的质量、完善的网络和周到的服务，我们的产品受到全球客户的高度评价和支持。公司始终以科技为先导，优化产品质量，以满足客户需求为首要目标，不断提升企业竞争力和创新能力。",
    historyTitle: "发展历程",
    cultureTitle: "企业文化",
    equipmentTitle: "生产设备",
    equipmentSubtitle: "领先的科技 先进的设备",
    equipmentDesc:
      "我公司投资八千多万元引进加拿大亚氯酸钠生产系统，2015年12月二期工程建成投产，固体亚氯酸钠年产量达20000余吨，液体亚氯酸钠年产量为60000余吨。该生产线为世界一流、国内最先进的生产系统。",
    outlookTitle: "前景展望",
    outlookDesc:
      "新工艺生产的亚氯酸钠可以广泛应用于纺织漂白、消毒剂生产、水产养殖加工、水处理、食品、电子和石化等行业。作为全国最大的亚氯酸钠生产厂家，我们始终秉承「领跑行业、引领潮流、领先世界」的企业宗旨，依靠多年的生产经验积累和不断的技术创新，使企业综合素质得以持续、稳定的提升，在各界朋友的大力支持和帮助下，我们将不遗余力的攀越亚氯酸盐生产领域一个又一个新的高峰。",
    marketingTitle: "营销网络",
    marketingSubtitle: "立足全国 放眼全球",
    marketingDesc:
      "银州牌亚氯酸钠畅销国内外，出口美国、巴西、英国、澳大利亚、埃塞俄比亚、日本等六大洲四十多个国家，年出口量达总产量的70%，位居同行业首位。",
    honorsTitle: "荣誉资质",
    altFactory: "工厂",
    altHonors: "荣誉墙",
    gallery: [
      { alt: "先进泵设备" },
      { alt: "生产线内部" },
      { alt: "液体储存IBC桶" },
      { alt: "仓库包装桶" },
      { alt: "工厂外观" },
    ],
  },
  history: [
    { year: "1996", text: "开始生产亚氯酸钠，是国内第一代生产厂家。" },
    { year: "2003", text: "开始出口国际市场，是本行业国内最早开展出口业务的企业之一。" },
    { year: "2007", text: "生产和出口量，居同行业首位。" },
    { year: "2008", text: "加入孚日集团。" },
    { year: "2010", text: "参与起草和修改 HG3250-2010 标准。" },
    { year: "2015", text: "退城进园，新厂建成；引进加拿大先进生产线，并试产成功。" },
  ],
  culture: [
    { title: "企业宗旨", content: "领跑行业、引领潮流、领先世界" },
    { title: "企业使命", content: "为客户谋价值、为员工谋利益、为社会谋发展" },
    { title: "企业精神", content: "忠诚、和谐、敬业" },
    { title: "主体价值观", content: "诚实做人、诚恳待人、诚信办事" },
  ],
  news: {
    subtitle: "最新公司动态与行业资讯",
    footer: "如需了解更多信息，请",
    contactLink: "联系我们",
    loading: "加载中...",
    empty: "暂无新闻",
    notFound: "未找到该新闻",
    items: [
      {
        date: "2024-03-15",
        title: "高源化工持续领跑亚氯酸钠出口",
        excerpt: "银州牌亚氯酸钠继续保持行业领先地位，产品出口全球40多个国家和地区。",
      },
      {
        date: "2023-11-20",
        title: "新生产线实现满负荷运转",
        excerpt: "引进的加拿大亚氯酸钠自动生产线实现满负荷运转，固体年产量2万吨，液体年产量6万吨。",
      },
      {
        date: "2023-06-10",
        title: "ISO9001质量体系再认证通过",
        excerpt: "高源化工顺利通过ISO9001国际质量体系再认证，再次确认对产品质量的坚定承诺。",
      },
      {
        date: "2022-10-18",
        title: "全国工业产品生产许可证续期",
        excerpt: "全国工业产品生产许可证（危险化学品无机产品）成功续期，有效期至2027年10月。",
      },
    ],
  },
  contact: {
    subtitle: "热烈欢迎海内外朋友莅临洽谈合作",
    address: "地址",
    phone: "电话",
    internationalDept: "国际业务部",
    domesticDept: "国内业务部",
    serviceDept: "客户服务部",
    formTitle: "发送询盘",
    formDesc: "请填写以下表单，我们将尽快与您联系。",
    name: "姓名",
    email: "邮箱",
    company: "公司",
    productInterest: "感兴趣的产品",
    message: "留言",
    productOptions: {
      chlorite: "亚氯酸钠",
      chlorate: "氯酸钠",
      other: "其他",
    },
  },
};

export const translations = { en, zh } as const;
export type Translations = typeof en;

export const certificateImages = [
  "/images/business-license.png",
  "/images/production-license.png",
  "/images/export-brand-cert.png",
  "/images/high-tech-enterprise.png",
  "/images/honors-wall.png",
];

export const productImages: Record<string, string> = {
  "sodium-chlorite": "/images/warehouse-drums.png",
  "sodium-chlorate": "/images/liquid-storage.png",
};

export const galleryImages = [
  "/images/equipment-pumps.png",
  "/images/production-line.png",
  "/images/liquid-storage.png",
  "/images/warehouse-drums.png",
  "/images/factory-building.png",
];
