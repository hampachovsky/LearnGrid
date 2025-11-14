import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { mapRpcError } from 'src/utils/map-rpc-error';

@Injectable()
export class SubmissionsService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: { host: 'tasks-service', port: 3003 },
    });
  }

  createSubmission(dto, userId: number) {
    return firstValueFrom(
      this.client
        .send({ cmd: 'create_submission' }, { dto, userId })
        .pipe(mapRpcError('create submission failed')),
    );
  }

  updateSubmission(submissionId: number, dto, userId: number) {
    return firstValueFrom(
      this.client
        .send({ cmd: 'update_submission' }, { submissionId, dto, userId })
        .pipe(mapRpcError('update submission failed')),
    );
  }

  deleteSubmission(submissionId: number, userId: number) {
    return firstValueFrom(
      this.client
        .send({ cmd: 'delete_submission' }, { submissionId, userId })
        .pipe(mapRpcError('delete submission failed')),
    );
  }

  gradeSubmission(submissionId: number, grade: number, userId: number) {
    return firstValueFrom(
      this.client
        .send({ cmd: 'grade_submission' }, { submissionId, grade, userId })
        .pipe(mapRpcError('grade submission failed')),
    );
  }

  getSubmissionsByTask(taskId: number) {
    return firstValueFrom(
      this.client
        .send({ cmd: 'get_submissions_by_task' }, taskId)
        .pipe(mapRpcError('get submissions by task failed')),
    );
  }

  getSubmissionsByClass(classId: number, userId: number) {
    return firstValueFrom(
      this.client
        .send({ cmd: 'get_submissions_by_class' }, { classId, userId })
        .pipe(mapRpcError('get submissions by class failed')),
    );
  }
}
