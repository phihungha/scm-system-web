import { User } from './user';

export interface CreateUpdateTime {
  createTime: Date;
  updateTime?: Date;
}

export interface SoftDeletable {
  isActive: boolean;
}

export interface SoftDeletableParams {
  isActive: boolean;
}

export interface StandardLifecycle {
  createTime: Date;
  createUser: User;
  createUserId: string;
  endTime?: Date;
  endUser?: User;
  endUserId?: string;
  isEnded: boolean;
  problem?: string;
  updateTime?: Date;
}

export type ApprovalStatus = 'Approved' | 'Rejected';

export interface ApprovalInfo {
  approvalStatus: ApprovalStatus;
  isApprovalAllowed: boolean;
}

export interface ProblemParams {
  id: number;
  problem: string;
}

export type SimpleItemSearchCriteria = 'Id' | 'Name';

export interface SimpleItemQueryParams {
  searchTerm?: string;
  searchCriteria?: SimpleItemSearchCriteria;
  all?: boolean;
}
