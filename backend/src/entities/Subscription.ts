import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";

@Entity("subscriptions")
export class Subscription {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 100 })
    providerName!: string; // e.g., 'Netflix'

    @Column({ type: "text", nullable: true })
    description!: string; // e.g., 'Family Plan shared with siblings'

    // 'decimal' is better for money than 'number' to avoid rounding errors
    @Column("decimal", { precision: 10, scale: 2 })
    cost!: number;

    @Column({ default: "INR" })
    currency!: string;

    @Column({ default: "Entertainment" })
    category!: string; // e.g., 'Work', 'Utility', 'Food'

    @Column({ type: "date" })
    renewalDate!: string;

    @Column({ default: "monthly" })
    billingCycle!: string; // 'monthly' or 'yearly'

    @Column({ default: true })
    isActive!: boolean;

    // --- Audit Columns (Standard in professional apps) ---

    @CreateDateColumn()
    createdAt!: Date; // Automatically set when record is created

    @UpdateDateColumn()
    updatedAt!: Date; // Automatically updated whenever you save changes
}