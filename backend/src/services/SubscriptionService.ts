import { SubscriptionRepository } from "../repositories/SubscriptionRepository.js";
import { Subscription } from "../entities/Subscription.js";

export class SubscriptionService {
    // 1. Dependency Injection: Bring in our database specialist
    private subscriptionRepo = new SubscriptionRepository();

    /**
     * Logic: Create a new subscription
     * Rule: Don't allow a duplicate provider name
     */
    async createSubscription(data: Partial<Subscription>): Promise<Subscription> {
        // Business Rule: Check if name already exists
        const existing = await this.subscriptionRepo.findAll();
        const isDuplicate = existing.some(sub => sub.providerName === data.providerName);

        if (isDuplicate) {
            // This error will be caught by your company's outside validator/global error handler
            throw new Error(`You already have a subscription for ${data.providerName}`);
        }

        return await this.subscriptionRepo.createSubscription(data);
    }

    /**
     * Logic: Get only active subscriptions
     */
    async getActiveSubscriptions(): Promise<Subscription[]> {
        const all = await this.subscriptionRepo.findAll();
        return all.filter(sub => sub.isActive === true);
    }

    /**
     * Logic: Professional 2-step Soft Delete
     * Rule: Search first, then deactivate
     */
    async deactivateSubscription(id: number): Promise<boolean> {
        // Step 1: Search (Asynchronous)
        const sub = await this.subscriptionRepo.findById(id);

        if (!sub) {
            throw new Error("Subscription not found. Cannot delete.");
        }

        // Step 2: Inactive update (Asynchronous)
        const result = await this.subscriptionRepo.softDelete(id);
        
        return (result.affected??0) > 0;
    }
}