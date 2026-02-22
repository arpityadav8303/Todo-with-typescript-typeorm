import { Controller, Get, Post, Delete, Body, Param, NotFoundError } from 'routing-controllers';
import { SubscriptionService } from '../services/SubscriptionService.js';
import { Subscription } from '../entities/Subscription.js';

// --- MAIN ROUTE AT THE TOP ---
// All routes in this class will start with /api/subscriptions
@Controller('/api/subscriptions')
export class SubscriptionController {
    // Composition: Bringing in our "Brain" (Service)
    private subscriptionService = new SubscriptionService();

    /**
     * GET() - Fetch all active subscriptions
     * Path: GET /api/subscriptions
     */
    @Get('/')
    async getAll() {
        // Calls the Service to get filtered data
        return await this.subscriptionService.getActiveSubscriptions();
    }

    /**
     * POST() - Create a new subscription
     * Path: POST /api/subscriptions
     */
    @Post('/')
    async create(@Body() data: Partial<Subscription>) {
        // The service handles duplicate checks and logic
        return await this.subscriptionService.createSubscription(data);
    }

    /**
     * DELETE() - Soft delete/Deactivate a subscription
     * Path: DELETE /api/subscriptions/:id
     */
    @Delete('/:id')
    async remove(@Param('id') id: number) {
        const success = await this.subscriptionService.deactivateSubscription(id);
        
        if (!success) {
            // Throwing a standard error that your global middleware will catch
            throw new NotFoundError(`Subscription with ID ${id} not found.`);
        }

        return { message: "Deactivated successfully" };
    }
}