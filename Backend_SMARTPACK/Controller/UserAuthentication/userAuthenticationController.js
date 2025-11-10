const User = require("../../Model/userAuthenticationModel");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const transporter = require("../../Config/conformationEmail");

exports.registerUser = [
  check("firstname")
    .trim()
    .isLength({ min: 2 })
    .withMessage("First name must be at least 2 character long")
    .matches(/^[a-zA-Z]+$/)
    .withMessage("First name can only contain letters"),

  check("lastname")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Last name must be at least 2 character long")
    .matches(/^[a-zA-Z]+$/)
    .withMessage("Last name can only contain letters"),

  check("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),

  check("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 character long")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[!@#$%^&*?<>:{}|<>]/)
    .withMessage("Password must contain at least one special letter"),

  check("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value != req.body.password) {
        throw new Error("Password do not match");
      }
      return true;
    }),

  async (req, res) => {
    try {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(400).json({ success: false, error: error.array() });
      }

      const { firstname, lastname, email, password, confirmPassword } =
        req.body;

      const cleanEmail = email.trim().toLowerCase();

      const existingUser = await User.findOne({ email: cleanEmail });

      if (existingUser) {
        res
          .status(400)
          .json({ success: false, message: "Email is already registered" });
      }

      bcrypt.hash(password, 12).then(async (hashpassword) => {
        const newUser = new User({
          firstname,
          lastname,
          email,
          password: hashpassword,
          confirmPassword: hashpassword,
        });

        newUser.save();

        const mailOption = {
          from: `SmartPack ${process.env.EMAIL_USER}`,
          to: email,
          subject: `Welcome to out smartpack!!`,
          html: `<h3>Hello ${firstname} ${lastname} ,</h3><p>Thank you for registering with us.</p>`,
        };

        console.log("SMTP_PASS: ", process.env.SMTP_PASS);
        console.log("process.env.SMTP_USER: ", process.env.SMTP_USER);

        await transporter.sendMail(mailOption);

        const token = jwt.sign(
          { userid: newUser._id },
          process.env.SECRET_KEY,
          {
            expiresIn: "7d",
          }
        );

        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          samesite: process.env.NODE_ENV === "production" ? "none" : "strict",
          maxAge: 7 * 24 * 60 * 60 * 10000,
        });

        res
          .status(200)
          .json({ success: true, message: "User Successfully Registered" });
      });
    } catch (error) {
      console.error("Error during user registration:", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error. Please try again later.",
      });
    }
  },
];

exports.sendOtp = async (req, res) => {
  try {
    const userid = req.userid;

    const user = await User.findById(userid);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }

    const generateOtp = String(Math.floor(100000 + Math.random() * 900000));

    const expireOtp = Date.now() + 24 * 60 * 60 * 1000;

    user.userotp = generateOtp;

    user.OtpExpireAt = expireOtp;

    const mailOption = {
      from: `smartpack ${process.env.EMAIL_USER}`,
      to: user.email,
      subject: "Your OTP Verification Code",
      html: ` <div style="font-family: Arial, sans-serif; padding: 15px;">
        <h2>🔐 Email Verification</h2>
        <p>Hello,</p>
        <p>Your One-Time Password (OTP) for email verification is:</p>
        <h1 style="color: #2e86de; letter-spacing: 3px;">${generateOtp}</h1>
        <p>Thanks,<br/>SmartPack Team</p>`,
    };

    await transporter.sendMail(mailOption);

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Successfully send otp, for email verification",
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send OTP. Please try again later.",
    });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const userid = req.userid;
    const { otp } = req.body;
    const user = await User.findById(userid);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Fount" });
    }

    if (user.userotp === "" || user.userotp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid Otp" });
    }

    if (user.OtpExpireAt < Date.now() + 2 * 60 * 1000) {
      return res.status(400).json({ success: false, message: "Otp Expried" });
    }

    (user.isOptVerified = true),
      (user.userotp = ""),
      (user.OtpExpireAt = ""),
      user.save();
    return res
      .status(200)
      .json({ success: true, message: "Otp Successfully Verified" });
  } catch (error) {
    console.error("Error in OTP Verification:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error. Please try again later.",
    });
  }
};

exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Registered" });
    }

    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Password" });
    }

    const token = jwt.sign(
      { userid: user._id, email: user.email, isLoggined: true },
      process.env.SECRET_KEY,
      { expiresIn: "7d" }
    );

    res.cookie("token", token);

    await res
      .status(200)
      .json({ success: true, message: "User Login Successfully" }, token);
  } catch (error) {
    console.error("Error in user login:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error. Please try again later.",
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "Invalid Email" });
    }

    const generateOtp = String(Math.floor(100000 + Math.random() * 900000));

    const expireOtp = Date.now() + 24 * 60 * 60 * 1000;

    const mailOption = {
      from: `SmartPack Support ${process.env.EMAIL_USER}`,
      to: user.email,
      subject: "Password Reset Request – SmartPack",
      html: `
      <div style="font-family: Arial, sans-serif; background-color:#f9fafb; padding: 25px;">
        <div style="max-width: 500px; margin: auto; background: #ffffff; border-radius: 10px; padding: 30px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <h2 style="color:#2e86de; text-align:center;">Password Reset Request</h2>
          <p style="font-size:15px;">Hello ${user.firstname || "User"},</p>
          <p style="font-size:15px; line-height:1.5;">
            We received a request to reset your SmartPack account password. Use the OTP below to verify your identity and proceed with resetting your password:
          </p>
          <div style="text-align:center; margin: 25px 0;">
            <h1 style="background:#2e86de; color:#ffffff; display:inline-block; padding:10px 25px; border-radius:8px; letter-spacing:3px;">
              ${generateOtp}
            </h1>
          </div>
          <p style="font-size:14px; color:#333;">
            ⚠️ This OTP is valid for <b>5 minutes</b>. Do not share it with anyone for your account’s security.
          </p>
        </div>
      </div>
    `,
    };

    await transporter.sendMail(mailOption);

    user.userotp = generateOtp;
    user.OtpExpireAt = expireOtp;

    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Reset Password Otp Successfully Send" });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while sending reset password OTP",
    });
  }
};

exports.verifyResetOtp = async (req, res) => {
  try {
    const userid = req.userid;
    const { otp } = req.body;

    const user = await User.findById(userid);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }

    if (user.userotp === "" || user.userotp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid Otp" });
    }

    if (user.OtpExpireAt < Date.now() + 2 * 60 * 1000) {
      return res.status(400).json({ success: false, message: "Otp Expired" });
    }

    user.userotp = "";
    user.OtpExpireAt = "";

    return res
      .status(200)
      .json({ success: true, message: "Otp Verified Successfully" });
  } catch (error) {
    console.error("Error in verifyResetOtp:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error while verifying OTP" });
  }
};

exports.newPassword = [
  check("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 character long")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[!@#$%^&*?<>:{}|<>]/)
    .withMessage("Password must contain at least one special letter"),

  check("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value != req.body.password) {
        throw new Error("Password do not match");
      }
      return true;
    }),

  async (req, res) => {
    try {
      const error = validationResult(req);

      if (!error.isEmpty()) {
        return res.status(400).json({ success: false, error: error.array() });
      }

      const userid = req.userid;
      const { password, confirmPassword } = req.body;

      const user = await User.findById(userid);

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      const newPassword = await bcrypt.hash(password, 12);
      const newConfirmPassword = await bcrypt.hash(confirmPassword, 12);

      user.password = newPassword;
      user.confirmPassword = newConfirmPassword;

      const mailOption = {
        from: `SmartPack Support ${process.env.EMAIL_USER}`,
        to: user.email,
        subject: "Your SmartPack Password Was Changed Successfully",
        html: `
      <div style="font-family: Arial, sans-serif; background-color:#f9fafb; padding: 25px;">
        <div style="max-width: 500px; margin: auto; background: #ffffff; border-radius: 10px; padding: 30px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <h2 style="color:#2e86de; text-align:center;">Password Changed Successfully</h2>
          <p style="font-size:15px;">Hello ${user.firstname || "User"},</p>
          <p style="font-size:15px; line-height:1.6;">
            This is a confirmation that the password for your <b>SmartPack</b> account has been changed successfully.
          </p>
          <p style="font-size:14px; color:#333;">
            If you made this change, no further action is required.
          </p>
        </div>
      </div>
    `,
      };

      await transporter.sendMail(mailOption);

      user.userotp = "";
      user.OtpExpireAt = "";

      await user.save();

      return res
        .status(200)
        .json({ success: true, message: "Successfully Password Change" });
    } catch (error) {
      console.error("Error in newPassword:", error);
      return res.status(500).json({
        success: false,
        message: "Server error while changing password",
      });
    }
  },
];

exports.userLogOut = async (req, res) => {
  try {
    res.clearCookie("token");
    res
      .status(200)
      .json({ success: true, message: "User Successfully Logout" });
  } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while logging out",
    });
  }
};
