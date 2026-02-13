const { z } = require("zod")

const registerSchema = z.object({
    name: z.string()
        .trim()
        .min(1, "Name is required")
        .max(50, "Name must not exceed 50 characters")
        .regex(/^[A-Za-z\s]+$/, "Name must contain only letters and spaces"),
    email: z.email("Invalid email format"),
    password: z.string()
        .min(6, "Password must be at least 6 characters")
        .max(12, "Password must not exceed 12 characters"),
    role: z.enum(["patient", "doctor"]),

    address: z.string().trim().optional(),
    license: z.string().trim().optional(),
    qualification: z.string().trim().optional(),
    specialization: z.string().trim().optional()
})
    .superRefine((data, ctx) => {
        if (data.role === "doctor") {
            if (!data.address) {
                ctx.addIssue({
                    path: ["address"],
                    message: "Address is required for doctors"
                })
            }

            if (!data.license) {
                ctx.addIssue({
                    path: ["license"],
                    message: "License is required for doctors"
                })
            }

            if (!data.qualification) {
                ctx.addIssue({
                    path: ["qualification"],
                    message: "Qualification is required for doctors"
                })
            }

            if (!data.specialization) {
                ctx.addIssue({
                    path: ["specialization"],
                    message: "Specialization is required for doctors"
                })
            }
        }
    })

module.exports = { registerSchema }
