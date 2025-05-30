import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Post('submit-rating')
  @UseGuards(JwtAuthGuard)
  async submitRating(@Body() body, @Request() req) {
    const { storeId, value } = body;
    const userId = req.user.userId;

    return this.ratingsService.submitRating({ storeId, userId, value });
  }
}
