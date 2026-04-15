import jwt from "jsonwebtoken";

const genToken = async (user) => {
    try {
        // Accept either a full user object or a plain ObjectId
        const userId = user?._id ?? user;
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "10y" });
        return token;
    } catch (error) {
        throw new Error(`Token generation error: ${error.message}`);
    }
};

export default genToken;