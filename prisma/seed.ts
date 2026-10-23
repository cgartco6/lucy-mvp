import { PrismaClient, IntentType, TicketStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // --- Catalogs ---
  const catalogA = await prisma.catalog.upsert({
    where: { name: "Default Catalog" },
    update: {},
    create: {
      name: "Default Catalog",
      description: "Placeholder catalog for Lucy MVP. Add your products here."
    }
  });

  const catalogB = await prisma.catalog.upsert({
    where: { name: "Catalog-2 (Placeholder)" },
    update: {},
    create: {
      name: "Catalog-2 (Placeholder)",
      description: "Second catalog to demonstrate multi-catalog support."
    }
  });

  // --- Products ---
  const products = [
    {
      catalogId: catalogA.id,
      sku: "SKU-HEAL-001",
      name: "Product Alpha (Placeholder)",
      description: "A placeholder product description for sales recommendations.",
      price: 99.0,
      currency: "USD",
      category: "Health",
      imageUrl: "https://example.com/product-alpha.png",
      tags: "alpha,placeholder"
    },
    {
      catalogId: catalogA.id,
      sku: "SKU-PLAN-101",
      name: "Plan Starter (Placeholder)",
      description: "Starter plan with basic features.",
      price: 29.0,
      currency: "USD",
      category: "Plans",
      imageUrl: "https://example.com/plan-starter.png",
      tags: "plan,starter"
    },
    {
      catalogId: catalogA.id,
      sku: "SKU-PLAN-201",
      name: "Plan Pro (Placeholder)",
      description: "Pro plan for growing teams.",
      price: 79.0,
      currency: "USD",
      category: "Plans",
      imageUrl: "https://example.com/plan-pro.png",
      tags: "plan,pro"
    },
    {
      catalogId: catalogB.id,
      sku: "SKU-AUTO-777",
      name: "Automation Suite (Placeholder)",
      description: "Placeholder automation suite product.",
      price: 199.0,
      currency: "USD",
      category: "Automation",
      imageUrl: "https://example.com/automation.png",
      tags: "automation,-suite"
    }
  ];

  for (const p of products) {
    await prisma.product.upsert({
      where: { sku: p.sku },
      update: {},
      create: p
    });
  }

  // --- Help Center Articles ---
  const articles = [
    {
      topic: "Orders",
      title: "How to track your order",
      content:
        "PLACEHOLDER: Explain how customers can track their order. Mention carrier links and typical delivery time.",
      url: "https://example.com/help/track-order"
    },
    {
      topic: "Returns",
      title: "Return policy overview",
      content:
        "PLACEHOLDER: Describe return eligibility, return window, condition requirements, and how to start a return.",
      url: "https://example.com/help/returns"
    },
    {
      topic: "Billing",
      title: "Update payment method",
      content:
        "PLACEHOLDER: Explain how customers update billing details.",
      url: "https://example.com/help/payment"
    },
    {
      topic: "Account",
      title: "Reset your password",
      content:
        "PLACEHOLDER: Provide steps to reset password and what to do if they can’t access email.",
      url: "https://example.com/help/reset-password"
    },
    {
      topic: "Technical",
      title: "Troubleshooting login issues",
      content:
        "PLACEHOLDER: Provide troubleshooting steps for login problems (browser cache, correct email, etc.).",
      url: "https://example.com/help/login-issues"
    }
  ];

  for (const a of articles) {
    await prisma.helpArticle.upsert({
      where: { title: a.title },
      update: {},
      create: a
    });
  }

  // --- Policies ---
  const policies = [
    {
      key: "SHIPPING_POLICY",
      title: "Shipping Policy (Placeholder)",
      content:
        "PLACEHOLDER: Shipping times, processing times, regions served, and shipping costs.\n\nExample: Orders ship in 1–2 business days..."
    },
    {
      key: "RETURN_POLICY",
      title: "Returns Policy (Placeholder)",
      content:
        "PLACEHOLDER: Return window, return condition rules, refund method and timelines."
    },
    {
      key: "REFUND_POLICY",
      title: "Refund Policy (Placeholder)",
      content:
        "PLACEHOLDER: When refunds are issued, partial refunds, store credit rules, and processing delays."
    },
    {
      key: "WARRANTY_POLICY",
      title: "Warranty Policy (Placeholder)",
      content:
        "PLACEHOLDER: Warranty length, what is covered, exclusions, and claim procedure."
    },
    {
      key: "PRIVACY_POLICY",
      title: "Privacy Policy (Placeholder)",
      content:
        "PLACEHOLDER: What data you collect, how it’s used, how long you store it, and customer rights."
    },
    {
      key: "TERMS_OF_SERVICE",
      title: "Terms of Service (Placeholder)",
      content:
        "PLACEHOLDER: Terms, acceptable use, limitations, and account responsibility."
    },
    {
      key: "DATA_DELETION_POLICY",
      title: "Data Deletion Policy (Placeholder)",
      content:
        "PLACEHOLDER: Steps to request data deletion, verification, and timelines."
    }
  ];

  for (const pol of policies) {
    await prisma.policy.upsert({
      where: { key: pol.key },
      update: {},
      create: pol
    });
  }

  // --- FAQ (20 examples placeholders) ---
  const faqs: Array<{ intent: IntentType; question: string; answer: string; tags?: string }> = [
    { intent: IntentType.SUPPORT, question: "Where is my order? (Placeholder)", answer: "PLACEHOLDER: Explain how to check shipping status and what to do if it’s delayed.", tags: "orders,tracking" },
    { intent: IntentType.SUPPORT, question: "What is your return window? (Placeholder)", answer: "PLACEHOLDER: Return window details and condition requirements.", tags: "returns" },
    { intent: IntentType.SUPPORT, question: "How do I start a return? (Placeholder)", answer: "PLACEHOLDER: Provide steps to initiate a return.", tags: "returns,process" },
    { intent: IntentType.SUPPORT, question: "When will I get my refund? (Placeholder)", answer: "PLACEHOLDER: Refund timeline and processing steps.", tags: "refunds" },
    { intent: IntentType.SUPPORT, question: "Do you ship internationally? (Placeholder)", answer: "PLACEHOLDER: Regions served and restrictions.", tags: "shipping" },
    { intent: IntentType.SUPPORT, question: "How much is shipping? (Placeholder)", answer: "PLACEHOLDER: Shipping cost rules and free-shipping thresholds.", tags: "shipping,cost" },
    { intent: IntentType.SUPPORT, question: "My package arrived damaged—what now? (Placeholder)", answer: "PLACEHOLDER: Steps to report damage and submit proof.", tags: "damaged,claims" },
    { intent: IntentType.SUPPORT, question: "Can I change my shipping address? (Placeholder)", answer: "PLACEHOLDER: Address change policy and timing.", tags: "orders,address" },
    { intent: IntentType.SUPPORT, question: "How do I reset my password? (Placeholder)", answer: "PLACEHOLDER: Password reset steps.", tags: "account,password" },
    { intent: IntentType.SUPPORT, question: "I can’t log in—help. (Placeholder)", answer: "PLACEHOLDER: Troubleshooting checklist.", tags: "technical,login" },

    { intent: IntentType.SALES, question: "Which plan is best for me? (Placeholder)", answer: "PLACEHOLDER: Ask a few questions then recommend Starter/Pro.", tags: "plans,recommendation" },
    { intent: IntentType.SALES, question: "What’s included in the Pro plan? (Placeholder)", answer: "PLACEHOLDER: Feature list and who it’s for.", tags: "plans,pro" },
    { intent: IntentType.SALES, question: "Do you offer discounts? (Placeholder)", answer: "PLACEHOLDER: Discount eligibility and promo policy.", tags: "pricing,discounts" },
    { intent: IntentType.SALES, question: "Can I upgrade later? (Placeholder)", answer: "PLACEHOLDER: Upgrade/downgrade policy and billing.", tags: "plans,upgrade" },
    { intent: IntentType.SALES, question: "Do you offer bulk pricing? (Placeholder)", answer: "PLACEHOLDER: Bulk pricing rules and lead capture for quotes.", tags: "bulk,quote" },
    { intent: IntentType.SALES, question: "What’s the difference between Starter and Pro? (Placeholder)", answer: "PLACEHOLDER: Comparison bullets.", tags: "comparison,starter,pro" },
    { intent: IntentType.SALES, question: "Do you have a demo? (Placeholder)", answer: "PLACEHOLDER: Scheduling / demo request instructions.", tags: "demo,lead" },
    { intent: IntentType.SALES, question: "How do I get a quote? (Placeholder)", answer: "PLACEHOLDER: Ask details then create a lead + quote workflow.", tags: "quote,lead" },
    { intent: IntentType.SALES, question: "Can you recommend products for my use case? (Placeholder)", answer: "PLACEHOLDER: Ask needs/timeline/budget then recommend.", tags: "recommendation" },
    { intent: IntentType.SALES, question: "What is your refund policy for purchases? (Placeholder)", answer: "PLACEHOLDER: Link to refund policy and clarify conditions.", tags: "refunds,pricing" }
  ];

  for (let i = 0; i < faqs.length; i++) {
    const f = faqs[i];
    await prisma.faq.upsert({
      where: { question: f.question },
      update: {},
      create: {
        intent: f.intent,
        question: f.question,
        answer: f.answer,
        tags: f.tags
      }
    });
  }

  console.log("Seed complete ✅");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
