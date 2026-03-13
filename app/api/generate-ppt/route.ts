import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const PptxGenJS = require("pptxgenjs");
    
    const pptx = new PptxGenJS();
    
    const slides = [
      {
        title: "AI 现状概述",
        content: "人工智能技术正在快速发展，广泛应用于各个领域，从医疗健康到金融服务，从教育到制造业，AI 正在改变我们的生活方式和工作方式。"
      },
      {
        title: "AI 技术发展",
        content: "深度学习、自然语言处理、计算机视觉等核心技术不断突破。大语言模型的出现标志着 AI 进入了新的时代，能够理解和生成人类语言的能力大幅提升。"
      },
      {
        title: "AI 未来展望",
        content: "未来 AI 将更加智能化、个性化。多模态 AI、通用人工智能（AGI）是重要发展方向。同时，AI 的伦理和安全问题也需要我们持续关注和解决。"
      }
    ];
    
    slides.forEach((slide) => {
      const pptSlide = pptx.addSlide();
      
      pptSlide.addText(slide.title, {
        x: 1,
        y: 1,
        w: 8,
        h: 1,
        fontSize: 36,
        bold: true,
        color: "363636",
        align: "center"
      });
      
      pptSlide.addText(slide.content, {
        x: 1,
        y: 2.5,
        w: 8,
        h: 3,
        fontSize: 18,
        color: "666666",
        align: "left",
        valign: "top"
      });
    });
    
    const buffer = await pptx.write({ outputType: "nodebuffer" });
    
    return new NextResponse(Buffer.from(buffer), {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "Content-Disposition": 'attachment; filename="AI现状.pptx"',
      },
    });
  } catch (error) {
    console.error("生成 PPT 失败:", error);
    return NextResponse.json({ error: "生成 PPT 失败" }, { status: 500 });
  }
}
