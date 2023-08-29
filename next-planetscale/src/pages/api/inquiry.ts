import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

interface Data {
  message: String;
  success: Boolean;
}

export default async function inquiryHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method == "POST") return await createInquiry(req, res);
  else
    return res
      .status(405)
      .json({ message: "Method not allowed", success: false });
}

const createInquiry = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const body = req.body;
  try {
    const newInquiry = await prisma.inquiry.create({
      data: {
        name: body.name,
        email: body.email,
        subject: body.subject,
        message: body.message,
      },
    });
    return res.status(200).json({ message: `${newInquiry}`, success: true });
  } catch (error: any) {
    console.log("createInquiry Error");
    res.status(500).json({ message: "Error creating request", success: false });
  }
};
