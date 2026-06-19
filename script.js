const projectData = {
  cycle: {
    kicker: "Consumer · Operation · 2023—2025",
    title: "自行车门店与骑行社群",
    description: "从发现轻量化自行车与维护服务需求，到经营门店、组织骑行活动并建立日常服务流程。这段经历让我直接理解用户、产品可靠性、社区和线下交付。",
    image: "assets/images/cycling-store.jpg",
    alt: "童培新经营的自行车门店",
    tags: ["门店运营", "用户洞察", "骑行社群", "服务流程"]
  },
  retail: {
    kicker: "Brand · Retail · 2021—2023",
    title: "球鞋与运动品牌",
    description: "从大学期间的运动鞋内容与销售开始，参与 Puma、Adidas、Under Armour 等品牌的渠道经营。它训练了我对选品、库存、价格和用户偏好的商业直觉。",
    image: "assets/images/grc-store.jpg",
    alt: "运动消费与骑行场景",
    tags: ["品牌经销", "消费品", "渠道", "内容运营"]
  },
  memory: {
    kicker: "AI · Hardware · Prototype",
    title: "AI 记忆项链",
    description: "一个来自个人遗忘痛点的可穿戴原型：持续记录、手机端记忆时间线、AI 检索与日记生成，并通过 3D 打印完成外壳快速迭代。",
    image: "assets/images/memory-hardware.jpg",
    alt: "AI 记忆项链硬件原型",
    tags: ["Embedded", "AI", "App Flow", "3D Print"]
  },
  poetry: {
    kicker: "Vision AI · Software",
    title: "诗歌相机",
    description: "按下快门，AI 读取画面与当下的情绪，再把普通瞬间写成一首诗。这是一次关于生成式 AI 如何更有温度、更接近真实生活的产品实验。",
    image: "assets/images/poetry-camera.jpg",
    alt: "诗歌相机产品界面",
    tags: ["Product Design", "Vision AI", "Web", "Interaction"]
  },
  nda: {
    kicker: "Hardware · In Development",
    title: "NDA 双项目",
    description: "两个正在推进的硬件方向：一款面向真实工作流的新型外设，以及一款围绕桌面制造体验的 3D 打印产品。当前公开信息仅限方向。",
    image: "assets/images/application-desk.jpg",
    alt: "硬件开发工作台",
    tags: ["外设", "HCI", "3D Printing", "Product Definition"]
  },
  lab: {
    kicker: "Software · Agent · Ongoing",
    title: "软件实验室",
    description: "持续构建 AI Agent 竞技场 Mettle、语音交互工具、记忆时间线与桌面多任务工作流。软件不是硬件的配套，而是产品长期演进的一半。",
    image: "assets/images/memory-app.jpg",
    alt: "软件产品界面原型",
    tags: ["AI Agent", "Voice UI", "Workflow", "Web"],
    link: "https://mettle-novica-ai.vercel.app/arena"
  }
};

const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
if (reducedMotion) {
  document.querySelectorAll("[data-reveal]").forEach(el => el.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  document.querySelectorAll("[data-reveal]").forEach(el => revealObserver.observe(el));
}

const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".project-card");
filters.forEach(button => button.addEventListener("click", () => {
  const filter = button.dataset.filter;
  filters.forEach(item => {
    const active = item === button;
    item.classList.toggle("is-active", active);
    item.setAttribute("aria-pressed", String(active));
  });
  cards.forEach(card => {
    const categories = card.dataset.category.split(" ");
    card.classList.toggle("is-hidden", filter !== "all" && !categories.includes(filter));
  });
}));

const dialog = document.querySelector(".project-dialog");
const dialogImage = dialog.querySelector(".dialog-media img");
const dialogLink = dialog.querySelector(".dialog-link");

cards.forEach(card => card.addEventListener("click", () => {
  const data = projectData[card.dataset.detail];
  dialog.querySelector(".dialog-kicker").textContent = data.kicker;
  dialog.querySelector(".dialog-copy h2").textContent = data.title;
  dialog.querySelector(".dialog-description").textContent = data.description;
  dialogImage.src = data.image;
  dialogImage.alt = data.alt;
  dialog.querySelector(".dialog-tags").replaceChildren(...data.tags.map(tag => {
    const li = document.createElement("li");
    li.textContent = tag;
    return li;
  }));
  dialogLink.hidden = !data.link;
  if (data.link) dialogLink.href = data.link;
  dialog.showModal();
}));

dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});
