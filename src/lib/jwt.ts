import jwt from "jsonwebtoken";

const verifyToken = async (token: string, secret: string) => {
  try {
    const verifyToken = jwt.verify(token, secret);
    return {
      success: true,
      data: verifyToken,
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: error instanceof Error ? error.message : String(error),
    };
  }
};

export const jwtUtils = {
  verifyToken,
};
