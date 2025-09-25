import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    // Hapus semua user lama (opsional, hati-hati kalau sudah production)
    await prisma.user.deleteMany();

    // Hash password
    const hashedPassword = await bcrypt.hash("admin123", 10);

    // Tambahkan user baru
    const users = await prisma.user.createMany({
        data: [
            {
                name: "Admin",
                email: "admin@gmail.com",
                password: hashedPassword,
            },
        ],
    });

    console.log("Users seeded:", users);

    await prisma.product.createMany({
        data: [
            {
                name: "Espresso",
                price: 25000,
                image: "https://www.siamhillscoffee.com/wp-content/uploads/What-is-an-Espresso-%E2%80%93-A-Complete-Guide-%E2%80%93-1.jpg",
                description: "Kopi espresso klasik dengan cita rasa kuat.",
                category: "coffee",
            },
            {
                name: "Cappuccino",
                price: 30000,
                image: "https://cdn0.tudoreceitas.com/pt/posts/7/7/0/cappuccino_funcional_3077_orig.jpg",
                description: "Kopi cappuccino dengan foam susu lembut.",
                category: "coffee",
            },
            {
                name: "Caramel Latte",
                price: 32000,
                image: "https://www.nescafe.com/cb/sites/default/files/2023-04/RecipeHero_CaramelLatte_1066x1066.jpg",
                description: "Latte dengan sirup karamel spesial.",
                category: "coffee",
            },
            {
                name: "Matcha Latte",
                price: 35000,
                image: "https://img.freepik.com/premium-photo/matcha-latte-isolated-white-background_1082220-6561.jpg?w=2000",
                description: "Minuman matcha Jepang dengan susu segar.",
                category: "non_coffee",
            },
            {
                name: "Vanilla Frappe",
                price: 36000,
                image: "https://coloradojava.com/wp-content/uploads/2021/07/Vanilla-Frappe.jpg",
                description: "Frappe dingin dengan rasa vanilla manis.",
                category: "non_coffee",
            },
        ],
    });

    console.log("Products seeded successfully!");
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
