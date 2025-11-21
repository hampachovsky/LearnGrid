import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SubmissionsService } from './submissions.service';

@Controller()
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @MessagePattern({ cmd: 'create_submission' })
  create(@Payload() { dto, userId }) {
    return this.submissionsService.createSubmission(dto, userId);
  }

  @MessagePattern({ cmd: 'update_submission' })
  update(@Payload() { submissionId, dto, userId }) {
    return this.submissionsService.updateSubmission(submissionId, dto, userId);
  }

  @MessagePattern({ cmd: 'delete_submission' })
  delete(@Payload() { submissionId, userId }) {
    return this.submissionsService.deleteSubmission(submissionId, userId);
  }

  @MessagePattern({ cmd: 'grade_submission' })
  grade(@Payload() { submissionId, grade, userId }) {
    return this.submissionsService.gradeSubmission(submissionId, grade, userId);
  }

  @MessagePattern({ cmd: 'get_submissions_by_task' })
  getByTask(@Payload() taskId: number) {
    return this.submissionsService.getSubmissionsByTask(taskId);
  }

  @MessagePattern({ cmd: 'get_submissions_by_class' })
  getByClass(@Payload() { classId }) {
    return this.submissionsService.getSubmissionsByClass(classId);
  }
}
