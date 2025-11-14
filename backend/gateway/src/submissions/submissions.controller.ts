import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SubmissionsService } from './submissions.service';

@Controller('submissions')
@UseGuards(JwtAuthGuard)
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Post()
  createSubmission(@Body() dto, @Req() req) {
    return this.submissionsService.createSubmission(dto, req.user.userId);
  }

  @Put(':submissionId')
  updateSubmission(
    @Param('submissionId') submissionId: number,
    @Body() dto,
    @Req() req,
  ) {
    return this.submissionsService.updateSubmission(
      submissionId,
      dto,
      req.user.userId,
    );
  }

  @Delete(':submissionId')
  deleteSubmission(@Param('submissionId') submissionId: number, @Req() req) {
    return this.submissionsService.deleteSubmission(
      submissionId,
      req.user.userId,
    );
  }

  @Put(':submissionId/grade')
  gradeSubmission(
    @Param('submissionId') submissionId: number,
    @Body('grade') grade: number,
    @Req() req,
  ) {
    return this.submissionsService.gradeSubmission(
      submissionId,
      grade,
      req.user.userId,
    );
  }

  @Get('/task/:taskId')
  getSubmissionsByTask(@Param('taskId') taskId: number) {
    return this.submissionsService.getSubmissionsByTask(taskId);
  }

  @Get('/class/:classId')
  getSubmissionsByClass(@Param('classId') classId: number, @Req() req) {
    return this.submissionsService.getSubmissionsByClass(
      classId,
      req.user.userId,
    );
  }
}
