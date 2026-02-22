import { Repository } from "typeorm";
import { AppDataSource } from "../data-source.js";
import { Subscription } from "../entities/Subscription.js";

export class SubscriptionRepository {
    private repo: Repository<Subscription> = AppDataSource.getRepository(Subscription);

    async createSubscription(data: Partial<Subscription>): Promise<Subscription> {
        const newEntry = this.repo.create(data);
        return await this.repo.save(newEntry);
    }

    async findAll(): Promise<Subscription[]> {
        return await this.repo.find({
            order: { createdAt: "DESC" }
        });
    }


    // --- READ (Find One) ---
    async findById(id: number): Promise<Subscription | null> {
        return await this.repo.findOneBy({ id });
    }

    // --- UPDATE ---
    // We use Partial so we can update JUST the price or JUST the name
    async update(id: number, data: Partial<Subscription>) {
        return await this.repo.update(id, data);
    }

    // --- DELETE (Soft Delete) ---
    // Instead of erasing, we just mark it inactive
    async softDelete(id: number) {
        return await this.repo.update(id, { isActive: false });
    }

    // --- COMPLEX ANALYTICS ---
    // This is a custom 'need' for your dashboard
    async getTotalMonthlyCost(): Promise<number> {
        const result = await this.repo
            .createQueryBuilder("sub")
            .select("SUM(sub.cost)", "total")
            .where("sub.isActive = :active", { active: true })
            .getRawOne();

        return parseFloat(result.total) || 0;
    }
}

