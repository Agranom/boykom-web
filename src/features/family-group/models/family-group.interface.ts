import { IUser } from '../../user/models/user.interface';

export interface IGroupMember  {
    id: string;
    isOwner: boolean;
    isAccepted: boolean;
    user?: IUser;
}

export interface IFamilyGroup {
    id: string;
    members: IGroupMember[];
}
